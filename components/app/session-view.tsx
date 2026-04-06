'use client';

import React from 'react';
import type { AppConfig } from '@/app-config';
import { AvatarPanel } from '@/components/app/avatar-panel';

interface SessionViewProps {
  appConfig: AppConfig;
}

export const SessionView = ({
  appConfig,
  ...props
}: React.ComponentProps<'section'> & SessionViewProps) => {
  void appConfig;

  return (
    <section
      className="bg-background relative flex h-[calc(100dvh-var(--app-top-strip-height)-env(safe-area-inset-top))] w-full flex-col overflow-hidden"
      style={{ zIndex: 'var(--app-z-session)' }}
      {...props}
    >
      <AvatarPanel className="flex-1" />
    </section>
  );
};
