'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ConnectionState, TokenSource } from 'livekit-client';
import { useSession } from '@livekit/components-react';
import { WarningIcon } from '@phosphor-icons/react/dist/ssr';
import type { AppConfig } from '@/app-config';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { RatingModal } from '@/components/app/rating-modal';
import { ViewController } from '@/components/app/view-controller';
import { Toaster } from '@/components/ui/sonner';
import { type RatingData } from '@/hooks/useInterviewRating';
import { useAgentErrors } from '@/hooks/useAgentErrors';
import { useDebugMode } from '@/hooks/useDebug';
import { getSandboxTokenSource } from '@/lib/utils';

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();
  return null;
}

interface AppProps {
  appConfig: AppConfig;
}

export function App({ appConfig }: AppProps) {
  const tokenSource = useMemo(() => {
    return typeof process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT === 'string'
      ? getSandboxTokenSource(appConfig)
      : TokenSource.endpoint('/api/connection-details');
  }, [appConfig]);

  const session = useSession(
    tokenSource,
    appConfig.agentName ? { agentName: appConfig.agentName } : undefined
  );

  const [ratingData, setRatingData] = useState<RatingData | null>(null);
  const [waiting, setWaiting] = useState(false);
  const roomNameRef = useRef<string>('');
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Capture room name when connected, start polling when disconnected
  useEffect(() => {
    const room = session.room;
    if (!room) return;

    const onConnected = () => {
      roomNameRef.current = room.name;
    };

    const onDisconnected = () => {
      if (!roomNameRef.current) return;
      setWaiting(true);
      startPolling(roomNameRef.current);
    };

    room.on('connected', onConnected);
    room.on('disconnected', onDisconnected);

    return () => {
      room.off('connected', onConnected);
      room.off('disconnected', onDisconnected);
    };
  }, [session.room]);

  const startPolling = (roomName: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    let attempts = 0;
    const MAX_ATTEMPTS = 30; // 30 × 2s = 60s max

    pollingRef.current = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`/api/interview-rating?roomName=${encodeURIComponent(roomName)}`);
        const data = await res.json();
        if (data.found) {
          clearInterval(pollingRef.current!);
          pollingRef.current = null;
          setWaiting(false);
          setRatingData(data.rating as RatingData);
        } else if (attempts >= MAX_ATTEMPTS) {
          clearInterval(pollingRef.current!);
          pollingRef.current = null;
          setWaiting(false);
        }
      } catch {
        if (attempts >= MAX_ATTEMPTS) {
          clearInterval(pollingRef.current!);
          pollingRef.current = null;
          setWaiting(false);
        }
      }
    }, 2000);
  };

  return (
    <AgentSessionProvider session={session}>
      <AppSetup />
      <main className="grid min-h-dvh grid-cols-1 place-content-center pt-[calc(var(--app-top-strip-height)+env(safe-area-inset-top))]">
        <ViewController
          appConfig={appConfig}
          ratingData={ratingData}
          waiting={waiting}
        />
      </main>
      <StartAudioButton label="Start Audio" />
      <Toaster
        icons={{ warning: <WarningIcon weight="bold" /> }}
        position="top-center"
        className="toaster group"
        style={
          {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)',
          } as React.CSSProperties
        }
      />
      {ratingData && (
        <RatingModal data={ratingData} onClose={() => { setRatingData(null); roomNameRef.current = ''; }} />
      )}
    </AgentSessionProvider>
  );
}
