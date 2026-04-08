'use client';

import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';

interface RatingModalProps {
  onClose: () => void;
}

export function RatingModal({ onClose }: RatingModalProps) {
  const modal = (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }} className="flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex flex-col items-center gap-4 px-8 py-10 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-blue-500/20 border-2 border-blue-500/40">
            <svg className="size-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Interview Complete!</h2>
          <p className="text-base text-white/70 leading-relaxed">
            Thank you for completing the interview. Your detailed results and feedback will be sent to your email shortly.
          </p>
          <Button onClick={onClose} className="w-full mt-2 rounded-full font-mono text-xs font-bold tracking-wider uppercase">
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modal, document.body) : null;
}
