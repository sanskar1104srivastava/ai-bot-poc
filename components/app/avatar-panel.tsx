'use client';

import { Track } from 'livekit-client';
import { VideoTrack, useTracks, useVoiceAssistant } from '@livekit/components-react';
import { cn } from '@/lib/shadcn/utils';

// Fixed bar heights and durations — a decorative waveform, not a real analyser.
const WAVE = [4, 9, 15, 22, 13, 19, 26, 11, 17, 24, 9, 21, 15, 19, 7, 23, 17, 11, 21, 6];
const WAVE_DURATIONS = [
  0.3, 0.42, 0.38, 0.35, 0.45, 0.32, 0.4, 0.36, 0.44, 0.38, 0.41, 0.33, 0.39, 0.43, 0.37, 0.34,
  0.46, 0.35, 0.42, 0.31,
];

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-6 items-center justify-center gap-[3px]" aria-hidden>
      {WAVE.map((height, i) => (
        <div
          key={i}
          // Sits over the video, so it reads in white rather than the accent.
          className={cn('w-[3px] rounded-full', active ? 'bg-white' : 'bg-white/40')}
          style={{
            height: active ? height : 3,
            transition: 'height 0.25s ease, background-color 0.4s',
            animation: active
              ? `wave-bar ${WAVE_DURATIONS[i]}s ease-in-out ${i * 0.04}s infinite alternate`
              : 'none',
          }}
        />
      ))}
    </div>
  );
}

interface AvatarPanelProps {
  className?: string;
}

export function AvatarPanel({ className }: AvatarPanelProps) {
  const { state } = useVoiceAssistant();

  // Every remote camera/screen track in the room, not just one participant's.
  //
  // This used to resolve the Simli worker by matching its
  // "lk.publish_on_behalf" attribute against the agent identity. That attribute
  // is set *after* the worker joins, and useRemoteParticipants does not
  // re-render on attribute changes — so when the avatar restarted mid-session
  // the panel held a stale participant and stayed blank until a manual page
  // refresh. useTracks is driven by track publish/subscribe events, so a
  // restarted avatar reappears on its own. The only remote video here is the
  // avatar, so no identity matching is needed.
  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare]);

  const trackRef =
    tracks.find((t) => !t.participant.isLocal && t.source === Track.Source.Camera) ??
    tracks.find((t) => !t.participant.isLocal && t.source === Track.Source.ScreenShare);

  const isSpeaking = state === 'speaking';
  const videoWidth = trackRef?.publication.dimensions?.width ?? 0;
  const videoHeight = trackRef?.publication.dimensions?.height ?? 0;

  return (
    <div
      className={cn(
        'bg-muted relative overflow-hidden rounded-2xl border',
        isSpeaking ? 'border-primary' : 'border-border',
        className
      )}
    >
      {/* The avatar fills the whole panel — this is the person the visitor is
          talking to, not a thumbnail. object-cover keeps them framed at
          whatever aspect ratio the panel ends up. */}
      {trackRef ? (
        <VideoTrack
          width={videoWidth}
          height={videoHeight}
          trackRef={trackRef}
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <div className="text-muted-foreground absolute inset-0 grid place-items-center font-mono text-xs">
          Avatar connecting…
        </div>
      )}

      {/* Speaking ring as an inset outline, so it never crops the video. */}
      {isSpeaking && (
        <div className="ring-primary/50 animate-ring-pulse pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset" />
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-3 pt-10 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">Sahai</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-sm">
            HIMS Assistant
          </span>
        </div>

        <Waveform active={isSpeaking} />

        <span className="font-mono text-xs text-white/85">
          {state === 'speaking'
            ? 'Speaking'
            : state === 'thinking'
              ? 'Thinking'
              : state === 'listening'
                ? 'Listening'
                : 'Connecting…'}
        </span>
      </div>
    </div>
  );
}
