'use client';

import React from 'react';
import { useSessionContext, useVoiceAssistant } from '@livekit/components-react';
import {
  CheckCircleIcon,
  ClockIcon,
  ScanSmileyIcon,
  SparkleIcon,
} from '@phosphor-icons/react/dist/ssr';
import type { AppConfig } from '@/app-config';
import { AgentControlBar } from '@/components/agents-ui/agent-control-bar';
import { AvatarPanel } from '@/components/app/avatar-panel';
import { CameraBox } from '@/components/app/camera-box';
import { ContentPanel } from '@/components/app/content-panel';
import { usePresence } from '@/components/app/presence-gate';
import { useSlideRpc } from '@/hooks/useSlideRpc';
import { cn } from '@/lib/shadcn/utils';

function formatDuration(seconds: number) {
  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const ss = (seconds % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

function useSessionSeconds(isConnected: boolean) {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    if (!isConnected) {
      setSeconds(0);
      return;
    }
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isConnected]);

  return seconds;
}

interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  const { isConnected, room } = useSessionContext();
  const { state } = useVoiceAssistant();
  const { presence } = usePresence();
  const { slideId, agentPicked } = useSlideRpc(room, isConnected);
  const seconds = useSessionSeconds(isConnected);

  return (
    <section
      className="bg-background relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden"
      style={{ zIndex: 'var(--app-z-session)' }}
      {...props}
    >
      <header className="bg-card flex flex-none items-center justify-between gap-4 border-b px-6 py-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'size-2 animate-pulse rounded-full',
              presence ? 'bg-emerald-500' : 'bg-amber-500'
            )}
          />
          <span className="font-bold tracking-tight">{appConfig.pageTitle}</span>
          <span className="text-muted-foreground hidden text-xs sm:inline">
            {appConfig.pageDescription}
          </span>
          <div className="bg-border hidden h-3 w-px sm:block" />
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold',
              presence
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400'
            )}
          >
            {presence ? (
              <>
                <CheckCircleIcon size={9} weight="bold" /> Face Active
              </>
            ) : (
              <>
                <ScanSmileyIcon size={9} weight="bold" /> Awaiting Face
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5">
          {isConnected && (
            <div className="text-primary flex items-center gap-1.5">
              <SparkleIcon size={11} weight="fill" />
              <span className="font-mono text-[11px]">
                {state === 'speaking' ? 'Speaking…' : 'Listening…'}
              </span>
            </div>
          )}
          <div className="text-muted-foreground flex items-center gap-1.5">
            <ClockIcon size={11} />
            <span className="font-mono text-xs">{formatDuration(seconds)}</span>
          </div>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col gap-4 p-4 lg:flex-row">
        <div className="flex min-h-0 flex-none flex-col gap-3 lg:w-[340px]">
          <AvatarPanel className="min-h-0 flex-1" />
          <CameraBox />
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

        <ContentPanel slideId={slideId} active={agentPicked} className="min-h-0 flex-1" />
      </main>
    </section>
  );
};
