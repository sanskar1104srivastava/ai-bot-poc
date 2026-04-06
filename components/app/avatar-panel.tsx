'use client';

import { ParticipantKind, Track } from 'livekit-client';
import {
  VideoTrack,
  useAgent,
  useChat,
  useParticipantTracks,
  useRemoteParticipants,
  useSessionContext,
  useVoiceAssistant,
} from '@livekit/components-react';
import { AgentChatTranscript } from '@/components/agents-ui/agent-chat-transcript';
import { AgentControlBar } from '@/components/agents-ui/agent-control-bar';
import { RichTextEditor } from '@/components/app/rich-text-editor';
import { cn } from '@/lib/shadcn/utils';

interface AvatarPanelProps {
  className?: string;
}

function TranscriptWindow() {
  const { chatMessages } = useChat();
  const { state: agentState } = useAgent();

  return (
    <div className="border-border bg-background flex h-full flex-col overflow-hidden rounded-xl border shadow-sm">
      <div className="border-border flex shrink-0 items-center gap-2 border-b px-3 py-2">
        <span className="size-2 animate-pulse rounded-full bg-green-500" />
        <span className="text-xs font-semibold tracking-wide">Live Transcript</span>
      </div>
      <div className="flex-1 overflow-hidden">
        {chatMessages.length === 0 ? (
          <p className="text-muted-foreground p-3 text-xs">
            Transcript will appear here once the interview starts…
          </p>
        ) : (
          <AgentChatTranscript
            agentState={agentState}
            messages={chatMessages}
            className="h-full [&>div>div]:px-3 [&>div>div]:py-2 [&>div>div]:text-xs"
          />
        )}
      </div>
    </div>
  );
}

export function AvatarPanel({ className }: AvatarPanelProps) {
  const { agent } = useVoiceAssistant();

  const remoteParticipants = useRemoteParticipants();
  const worker = remoteParticipants.find(
    (p) =>
      p.kind === ParticipantKind.AGENT && p.attributes['lk.publish_on_behalf'] === agent?.identity
  );

  const agentTracks = useParticipantTracks(
    [Track.Source.Camera, Track.Source.ScreenShare],
    agent?.identity
  );
  const workerTracks = useParticipantTracks(
    [Track.Source.Camera, Track.Source.ScreenShare],
    worker?.identity
  );

  const trackRef =
    workerTracks.find((t) => t.source === Track.Source.Camera) ??
    workerTracks.find((t) => t.source === Track.Source.ScreenShare) ??
    agentTracks.find((t) => t.source === Track.Source.Camera) ??
    agentTracks.find((t) => t.source === Track.Source.ScreenShare);

  const { isConnected } = useSessionContext();
  const videoWidth = trackRef?.publication.dimensions?.width ?? 0;
  const videoHeight = trackRef?.publication.dimensions?.height ?? 0;

  return (
    <div className={cn('flex h-full w-full gap-4 p-4 md:p-6', className)}>
      {/* Column 1 — AI video + controls */}
      <div className="flex w-full shrink-0 flex-col gap-4 md:w-[320px]">
        {/* AI video */}
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-black shadow-lg">
          {trackRef ? (
            <VideoTrack
              width={videoWidth}
              height={videoHeight}
              trackRef={trackRef}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="size-16 animate-pulse rounded-full bg-white/10" />
              <p className="text-xs text-white/40">Waiting for interviewer…</p>
            </div>
          )}
          <div className="absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            AI Interviewer
          </div>
        </div>

        {/* Control bar */}
        <AgentControlBar
          variant="livekit"
          isConnected={isConnected}
          controls={{
            microphone: true,
            leave: true,
            camera: false,
            screenShare: false,
            chat: false,
          }}
          className="w-full shrink-0"
        />
      </div>

      {/* Column 2 — Live transcript (full height, thin) */}
      <div className="hidden h-full w-[320px] shrink-0 flex-col md:flex">
        <TranscriptWindow />
      </div>

      {/* Column 3 — Notes editor (full height, fills remaining space) */}
      <div className="hidden flex-1 flex-col gap-2 md:flex">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide">Your Notes</h2>
          <span className="text-muted-foreground text-xs">
            Use this space for your answers or code
          </span>
        </div>
        <RichTextEditor className="flex-1" />
      </div>
    </div>
  );
}
