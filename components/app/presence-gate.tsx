'use client';

import * as React from 'react';
import { useSessionContext } from '@livekit/components-react';
import { useFacePresence } from '@/hooks/useFacePresence';

interface Presence {
  presence: boolean;
  cameraError: boolean;
  cameraErrorName: string | null;
  stream: MediaStream | null;
  retry: () => void;
}

const PresenceContext = React.createContext<Presence>({
  presence: false,
  cameraError: false,
  cameraErrorName: null,
  stream: null,
  retry: () => {},
});

/** Face state, for any part of the kiosk that wants to show it. */
export function usePresence() {
  return React.useContext(PresenceContext);
}

/**
 * Watches the webcam for a face and auto starts/ends the Sahai session —
 * no click needed. Owns the only `useFacePresence` call in the app: it runs a
 * camera and a MediaPipe detector, so a second caller would mean a second of
 * each. Anything else that needs face state reads `usePresence()`.
 */
export function PresenceGate({ children }: { children: React.ReactNode }) {
  const facePresence = useFacePresence();
  const { presence } = facePresence;
  const { isConnected, start, end } = useSessionContext();
  const transitioning = React.useRef(false);

  React.useEffect(() => {
    if (transitioning.current) return;

    if (presence && !isConnected) {
      transitioning.current = true;
      start().finally(() => {
        transitioning.current = false;
      });
    } else if (!presence && isConnected) {
      transitioning.current = true;
      end().finally(() => {
        transitioning.current = false;
      });
    }
  }, [presence, isConnected, start, end]);

  return <PresenceContext.Provider value={facePresence}>{children}</PresenceContext.Provider>;
}
