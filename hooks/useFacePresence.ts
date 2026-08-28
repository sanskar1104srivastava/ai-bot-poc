import * as React from 'react';
import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';

// ponytail: fixed thresholds, expose as options if a future caller needs tuning
const PRESENT_AFTER_MS = 1500; // sustained face before we trust it (avoid walk-by triggers)
const ABSENT_AFTER_MS = 5_000; // sustained empty frame before we call the person "gone"
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
  /**
   * The DOMException name when it failed — "NotAllowedError", "NotFoundError",
   * "NotReadableError". A bare boolean could not tell a *rejected* request from
   * one still hanging on an unanswered prompt, which cost a lot of guessing.
   */
  cameraErrorName: string | null;
  /** The same webcam stream the detector reads, so the UI can show it without a second prompt. */
  stream: MediaStream | null;
  /**
   * Re-request the camera from a user gesture.
   *
   * Chrome uses "quiet" permission UI: with no gesture on the page it may never
   * render the prompt at all and just leaves getUserMedia pending forever — no
   * resolve, no reject, no error. A click is what makes the prompt appear.
   */
  retry: () => void;
}

// MediaPipe's WASM backend logs a one-time harmless init line ("Created
// TensorFlow Lite XNNPACK delegate for CPU") through console.error, which
// Next.js's dev overlay treats as a real error and blocks the whole page
// with. Filter just that known-benign line, nothing else.
//
// Installed once and never restored, deliberately: Emscripten captures
// console.error when the WASM module initialises, so a filter that wraps only
// detectForVideo() is already too late - the captured reference skips it.
let mediapipeLogFilterInstalled = false;
function installMediapipeLogFilter() {
  if (mediapipeLogFilterInstalled) return;
  mediapipeLogFilterInstalled = true;
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (/XNNPACK delegate|Created TensorFlow Lite/i.test(String(args[0] ?? ''))) return;
    originalError(...args);
  };
}

export function useFacePresence(): FacePresence {
  const [presence, setPresence] = React.useState(false);
  const [cameraError, setCameraError] = React.useState(false);
  const [cameraErrorName, setCameraErrorName] = React.useState<string | null>(null);
  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const [attempt, setAttempt] = React.useState(0);

  // One camera request for the whole app, shared across React's StrictMode
  // double-mount. Without this the first mount's cleanup stops the tracks while
  // the second mount's getUserMedia is still in flight; Chrome can back both
  // with the same source, so stopping the first ends the second and the feed
  // dies right after permission is granted.
  const pending = React.useRef<Promise<MediaStream> | null>(null);

  const retry = React.useCallback(() => {
    pending.current = null;
    setCameraError(false);
    setCameraErrorName(null);
    setAttempt((n) => n + 1);
  }, []);

  React.useEffect(() => {
    const video = document.createElement('video');
    video.playsInline = true;
    video.muted = true;

    let mediaStream: MediaStream | null = null;
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
        const result = detector!.detectForVideo(video, now);
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
        pending.current ??= navigator.mediaDevices.getUserMedia({ video: true });
        mediaStream = await pending.current;
        // Deliberately not stopping tracks when cancelled: the stream is shared
        // with the remount that replaces us, and stopping it would kill theirs.
        if (cancelled) return;

        video.srcObject = mediaStream;
        await video.play();
        setStream(mediaStream);

        installMediapipeLogFilter();
        const vision = await FilesetResolver.forVisionTasks(WASM_BASE_URL);
        detector = await FaceDetector.createFromOptions(vision, {
          baseOptions: { modelAssetPath: MODEL_URL },
          runningMode: 'VIDEO',
        });
        if (cancelled) return;

        rafId = requestAnimationFrame(loop);
      } catch (err) {
        pending.current = null;
        if (!cancelled) {
          setCameraError(true);
          setCameraErrorName(err instanceof DOMException ? err.name : String(err));
        }
      }
    })();

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      detector?.close();
      // The camera track is deliberately left running. This hook is mounted by
      // PresenceGate for the whole life of the page, so the only cleanups that
      // actually fire are StrictMode's throwaway ones — and stopping the track
      // there kills the stream the real mount is about to use. The browser
      // releases the device on unload.
    };
  }, [attempt]);

  return { presence, cameraError, cameraErrorName, stream, retry };
}
