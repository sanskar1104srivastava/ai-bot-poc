'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useSessionContext } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import type { RatingData } from '@/hooks/useInterviewRating';
import { SessionView } from '@/components/app/session-view';
import { WelcomeView } from '@/components/app/welcome-view';

const MotionWelcomeView = motion.create(WelcomeView);
const MotionSessionView = motion.create(SessionView);

const VIEW_MOTION_PROPS = {
  variants: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: { duration: 0.5, ease: 'linear' as const },
} as const;

function WaitingOverlay() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }} className="flex flex-col items-center justify-center gap-4 bg-black/80 backdrop-blur-sm">
      <div className="size-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      <p className="text-sm font-medium text-white/80">Generating your results…</p>
    </div>
  );
}

interface ViewControllerProps {
  appConfig: AppConfig;
  ratingData: RatingData | null;
  waiting: boolean;
}

export function ViewController({ appConfig, ratingData, waiting }: ViewControllerProps) {
  const { isConnected, start } = useSessionContext();

  return (
    <>
      <AnimatePresence mode="wait">
        {!isConnected && !ratingData && !waiting && (
          <MotionWelcomeView
            key="welcome"
            {...VIEW_MOTION_PROPS}
            startButtonText={appConfig.startButtonText}
            onStartCall={start}
          />
        )}
        {isConnected && (
          <MotionSessionView
            key="session-view"
            {...VIEW_MOTION_PROPS}
            appConfig={appConfig}
          />
        )}
      </AnimatePresence>

      {waiting && <WaitingOverlay />}
    </>
  );
}
