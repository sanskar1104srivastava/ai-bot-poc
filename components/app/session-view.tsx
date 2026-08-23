'use client';

import React from 'react';
import { useSessionContext } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { AvatarPanel } from '@/components/app/avatar-panel';

interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  void appConfig; // passed for type/API consistency; may be used later
  const { isConnected } = useSessionContext();

  void isConnected;

  return (
    <section
      className="bg-background relative flex h-full min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden sm:p-6"
      style={{ zIndex: 'var(--app-z-session)' }}
      {...props}
    >
      <AvatarPanel className="h-full w-full sm:aspect-square sm:h-auto sm:max-h-[85vh] sm:max-w-xl sm:rounded-lg" />
    </section>
  );
};
