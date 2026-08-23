import * as React from 'react';
import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';

// ponytail: fixed thresholds, expose as options if a future caller needs tuning
const PRESENT_AFTER_MS = 1500; // sustained face before we trust it (avoid walk-by triggers)
const ABSENT_AFTER_MS = 12_000; // sustained empty frame before we call the person "gone"
const DETECT_INTERVAL_MS = 300; // ~3 checks/sec is plenty for presence, not a camera app

// Per @mediapipe/tasks-vision's own README: the unversioned jsdelivr path
// always matches whatever version is installed, so it never drifts out of
// sync with the JS API the way a hand-pinned version string could.
const WASM_BASE_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite';

interface FacePresence {
  /** Debounced: a face has been continuously present/absent long enough to trust. */
  presence: boolean;
  /** Camera denied or the detector failed to load — caller should fall back to manual start. */
  cameraError: boolean;
}

// MediaPipe's WASM backend logs a one-time harmless init line ("Created
// TensorFlow Lite XNNPACK delegate for CPU") through console.error, which
// Next.js's dev overlay treats as a real error and blocks the whole page
// with. Filter just that known-benign line, nothing else.
function callSuppressingMediapipeInitLog<T>(fn: () => T): T {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (/XNNPACK delegate|Created TensorFlow Lite/i.test(String(args[0] ?? ''))) return;
    originalError(...args);
  };
  try {
    return fn();
  } finally {
    console.error = originalError;
  }
}

export function useFacePresence(): FacePresence {
  const [presence, setPresence] = React.useState(false);
  const [cameraError, setCameraError] = React.useState(false);

  React.useEffect(() => {
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;

    let stream: MediaStream | null = null;
    let detector: FaceDetector | null = null;
    let rafId: number | null = null;
    let lastDetectAt = 0;
    let candidateSince: number | null = null;
    let candidateState = false;
    let cancelled = false;

    const loop = () => {
      if (cancelled || !detector) return;
      const now = performance.now();

      if (now - lastDetectAt >= DETECT_INTERVAL_MS && video.readyState >= 2) {
        lastDetectAt = now;
        const result = callSuppressingMediapipeInitLog(() => detector!.detectForVideo(video, now));
        const faceNow = result.detections.length > 0;

        if (faceNow !== candidateState) {
          candidateState = faceNow;
          candidateSince = now;
        }
        const heldFor = now - (candidateSince ?? now);
        const threshold = faceNow ? PRESENT_AFTER_MS : ABSENT_AFTER_MS;
        if (heldFor >= threshold) {
          setPresence(faceNow);
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        video.srcObject = stream;
        await video.play();

        const vision = await FilesetResolver.forVisionTasks(WASM_BASE_URL);
        detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL },
          runningMode: 'VIDEO',
        });
        if (cancelled) return;

        rafId = requestAnimationFrame(loop);
      } catch {
        if (!cancelled) setCameraError(true);
      }
    })();

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      stream?.getTracks().forEach((t) => t.stop());
      detector?.close();
    };
  }, []);

  return { presence, cameraError };
}
