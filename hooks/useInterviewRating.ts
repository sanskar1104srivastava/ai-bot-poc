'use client';

import { useEffect, useRef } from 'react';
import { useMaybeRoomContext } from '@livekit/components-react';

export interface RatingData {
  rating: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  breakdown: {
    technical_knowledge: number;
    problem_solving: number;
    code_quality: number;
    communication: number;
    growth_mindset: number;
  };
}

const RATING_TIMEOUT_MS = 25_000;

export function useInterviewRating(onRating: (data: RatingData) => void) {
  const room = useMaybeRoomContext();
  const onRatingRef = useRef(onRating);
  onRatingRef.current = onRating;

  // stable list of resolvers — never recreated
  const pendingRef = useRef<Array<() => void>>([]);

  // stable waitForRating function — created once
  const waitForRating = useRef<() => Promise<void>>(() =>
    new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        resolve();
      }, RATING_TIMEOUT_MS);
      pendingRef.current.push(() => {
        clearTimeout(timer);
        resolve();
      });
    })
  ).current;

  useEffect(() => {
    if (!room) return;

    try {
      room.unregisterRpcMethod('interview_rating');
    } catch {
      // not registered yet
    }

    room.registerRpcMethod('interview_rating', async (data) => {
      try {
        const parsed = JSON.parse(data.payload) as RatingData;
        // flush all pending waitForRating promises first
        const resolvers = pendingRef.current.splice(0);
        resolvers.forEach((r) => r());
        // then notify UI
        onRatingRef.current(parsed);
      } catch {
        // ignore malformed payload
      }
      return JSON.stringify({ success: true });
    });

    // intentionally no cleanup unregister — keep handler alive through room shutdown
  }, [room]);

  return { waitForRating };
}
