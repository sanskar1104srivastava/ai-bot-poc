'use client';

import * as React from 'react';
import { useSessionContext } from '@livekit/components-react';
import { useFacePresence } from '@/hooks/useFacePresence';

/**
 * Watches the webcam for a face and auto starts/ends the Sahai session —
 * no click needed. Renders nothing; mount once near the root.
 */
export function PresenceGate() {
  const { presence } = useFacePresence();
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

  return null;
}
