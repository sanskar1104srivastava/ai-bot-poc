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
      className="bg-background relative flex h-full w-full flex-col overflow-hidden"
      style={{ zIndex: 'var(--app-z-session)' }}
      {...props}
    >
      <AvatarPanel className="flex-1" />
    </section>
  );
};
