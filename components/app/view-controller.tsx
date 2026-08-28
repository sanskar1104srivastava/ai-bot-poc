'use client';

import type { AppConfig } from '@/app-config';
import { SessionView } from '@/components/app/session-view';

interface ViewControllerProps {
  appConfig: AppConfig;
}

/**
 * The kiosk is always on screen. Session state is shown inside it — the header
 * badge for the face, the avatar panel for the video — rather than behind a
 * full-screen gate, which only ever hid the kiosk the visitor came to look at.
 */
export function ViewController({ appConfig }: ViewControllerProps) {
  return <SessionView appConfig={appConfig} />;
}
