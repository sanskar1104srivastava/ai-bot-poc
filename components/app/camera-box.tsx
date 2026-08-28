'use client';

import * as React from 'react';
import { CheckCircleIcon, ScanSmileyIcon, VideoCameraIcon } from '@phosphor-icons/react/dist/ssr';
import { usePresence } from '@/components/app/presence-gate';
import { cn } from '@/lib/shadcn/utils';

const CORNERS = [
  'top-2 left-2 border-t-2 border-l-2',
  'top-2 right-2 border-t-2 border-r-2',
  'bottom-2 left-2 border-b-2 border-l-2',
  'bottom-2 right-2 border-b-2 border-r-2',
];

/** The user's own webcam, with face-detection chrome over it. */
export function CameraBox({ className }: { className?: string }) {
  const { presence, cameraError, cameraErrorName, stream, retry } = usePresence();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.srcObject = stream;
  }, [stream]);

  const scanning = !stream && !cameraError;

  return (
    <div
      className={cn(
        'bg-muted relative flex h-[120px] flex-none items-center justify-center overflow-hidden rounded-xl border transition-colors duration-500',
        presence ? 'border-emerald-500/55' : 'border-primary/20',
        className
      )}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        // Mirrored so the kiosk reads like a mirror, not a video call.
        className="size-full -scale-x-100 object-cover"
      />

      {CORNERS.map((corner) => (
        <div
          key={corner}
          className={cn(
            'absolute size-3.5 transition-colors duration-500',
            presence ? 'border-emerald-500' : 'border-primary',
            corner
          )}
        />
      ))}

      {/* Face guide — fades out once we have a face. */}
      <svg
        className={cn(
          'pointer-events-none absolute transition-opacity duration-500',
          presence ? 'opacity-0' : 'opacity-45'
        )}
        width="50"
        height="62"
        viewBox="0 0 50 62"
        aria-hidden
      >
        <ellipse
          cx="25"
          cy="31"
          rx="22"
          ry="28"
          fill="none"
          className="stroke-primary"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      </svg>

      {scanning && (
        <div className="animate-scan-line via-primary absolute right-4 left-4 h-px bg-gradient-to-r from-transparent to-transparent" />
      )}

      {/* Chrome's quiet permission UI will not raise the camera prompt without a
          user gesture — getUserMedia just hangs, unanswered and unrejected. One
          click here is that gesture. It disappears the moment a stream exists,
          so the normal flow stays hands-free. */}
      {!stream && (
        <button
          type="button"
          onClick={retry}
          className="bg-background/70 hover:bg-background/85 absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-1.5 backdrop-blur-[2px] transition-colors"
        >
          <VideoCameraIcon size={20} className="text-primary" weight="fill" />
          <span className="text-primary text-[11px] font-semibold">
            {cameraError ? 'Retry camera' : 'Tap to enable camera'}
          </span>
          {cameraErrorName && (
            <span className="text-muted-foreground font-mono text-[9px]">{cameraErrorName}</span>
          )}
        </button>
      )}

      <div className="absolute inset-x-0 bottom-2 flex justify-center">
        <div
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold backdrop-blur-sm',
            presence
              ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
              : 'border-primary/20 text-primary bg-background/75'
          )}
        >
          {presence ? (
            <>
              <CheckCircleIcon size={10} weight="bold" /> Face Detected
            </>
          ) : (
            <>
              <ScanSmileyIcon size={10} weight="bold" />
              {cameraError ? 'Camera unavailable' : scanning ? 'Scanning…' : 'Detecting…'}
            </>
          )}
        </div>
      </div>

      <div className="border-primary/20 text-primary bg-background/80 absolute top-2 left-2 rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em]">
        YOU
      </div>

      {presence && (
        <div className="absolute top-2 right-2 flex items-center gap-1">
          <div className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="font-mono text-[9px] text-emerald-700 dark:text-emerald-400">LIVE</span>
        </div>
      )}
    </div>
  );
}
