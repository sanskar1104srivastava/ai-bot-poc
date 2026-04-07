'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { type RatingData } from '@/hooks/useInterviewRating';
import { Button } from '@/components/ui/button';

interface RatingModalProps {
  data: RatingData;
  onClose: () => void;
}

const BREAKDOWN_LABELS: Record<string, string> = {
  technical_knowledge: 'Technical Knowledge',
  problem_solving: 'Problem Solving',
  code_quality: 'Code Quality',
  communication: 'Communication',
  growth_mindset: 'Growth Mindset',
};

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100;
  const color =
    score >= 8 ? 'bg-green-500' : score >= 5 ? 'bg-yellow-400' : 'bg-red-500';
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10">
      <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function RatingModal({ data, onClose }: RatingModalProps) {
  const ringColor =
    data.rating >= 8
      ? 'text-green-400 border-green-500/40'
      : data.rating >= 5
        ? 'text-yellow-400 border-yellow-500/40'
        : 'text-red-400 border-red-500/40';

  const modal = (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }} className="flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 px-6 pt-8 pb-4 text-center">
          <div className={`flex size-24 items-center justify-center rounded-full border-4 ${ringColor}`}>
            <span className="text-4xl font-bold">{data.rating}</span>
            <span className="text-lg font-medium">/10</span>
          </div>
          <h2 className="text-xl font-bold text-white">Interview Complete</h2>
          <p className="text-sm text-white/60 leading-relaxed">{data.summary}</p>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {/* Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Score Breakdown</h3>
            {Object.entries(data.breakdown).map(([key, score]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70">{BREAKDOWN_LABELS[key] ?? key}</span>
                  <span className="font-semibold text-white">{score}/10</span>
                </div>
                <ScoreBar score={score} />
              </div>
            ))}
          </div>

          {/* Strengths */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Strengths</h3>
            <ul className="space-y-1">
              {data.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-0.5 text-green-400">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">Areas to Improve</h3>
            <ul className="space-y-1">
              {data.improvements.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-0.5 text-yellow-400">→</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <Button onClick={onClose} className="w-full rounded-full font-mono text-xs font-bold tracking-wider uppercase">
            Done
          </Button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modal, document.body) : null;
}
