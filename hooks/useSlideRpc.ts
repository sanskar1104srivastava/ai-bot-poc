'use client';

import { useEffect, useState } from 'react';
import { type Room, RpcError, type RpcInvocationData } from 'livekit-client';
import { SLIDES, type SlideId, isValidSlideId } from '@/lib/slides';

interface SlideState {
  slideId: SlideId;
  /** False until the agent has flagged a slide, so the panel can stay quiet. */
  agentPicked: boolean;
}

/**
 * The agent drives the kiosk screen: it calls its `show_slide` tool, which RPCs
 * `showSlide` here. The screen changes ONLY on that flag — no timer, no
 * rotation. A slide appearing while the agent talks about something else reads
 * as broken, so an un-flagged deck shows nothing rather than something wrong.
 */
export function useSlideRpc(room: Room | undefined, isConnected: boolean): SlideState {
  const [slideId, setSlideId] = useState<SlideId>(SLIDES[0].id);
  const [agentPicked, setAgentPicked] = useState(false);

  useEffect(() => {
    if (!room || !isConnected) {
      return;
    }

    room.registerRpcMethod('showSlide', async (data: RpcInvocationData) => {
      try {
        const { slideId } = JSON.parse(data.payload) as { slideId: string };
        if (!isValidSlideId(slideId)) {
          throw new RpcError(1500, 'Unknown slide', JSON.stringify({ slideId }));
        }
        setSlideId(slideId);
        setAgentPicked(true);
        return JSON.stringify({ success: true, slideId });
      } catch (error) {
        if (error instanceof RpcError) throw error;
        throw new RpcError(1500, 'Failed to show slide');
      }
    });

    return () => {
      room.unregisterRpcMethod('showSlide');
    };
  }, [room, isConnected]);

  // A fresh session gets a fresh deck.
  useEffect(() => {
    if (!isConnected) {
      setSlideId(SLIDES[0].id);
      setAgentPicked(false);
    }
  }, [isConnected]);

  return { slideId, agentPicked };
}
