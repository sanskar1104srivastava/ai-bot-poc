'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { VISUALS } from '@/components/app/slide-visuals';
import { cn } from '@/lib/shadcn/utils';
import { SLIDES, type Slide, type SlideId } from '@/lib/slides';

/** Slide-deck palette, from docs/Interactive Animation Slides. */
const C = {
  bg: '#f0f6fc',
  navy: '#0f2b4a',
  text: '#1a2a3a',
  muted: '#5a7a96',
  border: 'rgba(26,74,120,0.1)',
  white: '#ffffff',
};

const SERIF = 'var(--font-roboto-slab), ui-serif, Georgia, serif';
const SANS = 'var(--font-outfit), ui-sans-serif, system-ui, sans-serif';

/** Squircle — softer than a circle, less boxy than a card. */
const SQUIRCLE = '38% 62% 63% 37% / 41% 44% 56% 59%';

/** Faint ruled grid behind each slide, as in the design. */
function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 7 }, (_, i) => (
        <div
          key={`v${i}`}
          className="absolute top-0 bottom-0"
          style={{ left: `${(i + 1) * 14.28}%`, borderLeft: `1px solid ${C.border}` }}
        />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={`h${i}`}
          className="absolute right-0 left-0"
          style={{ top: `${(i + 1) * 25}%`, borderTop: `1px solid ${C.border}` }}
        />
      ))}
    </div>
  );
}

// The entrance is CSS (sd-* classes in globals.css), not motion variants: the
// design staggers a dozen elements by animation-delay, and re-implementing that
// as variants would be more code doing the same job. AnimatePresence still owns
// the slide-to-slide crossfade, keyed on slide.id.
function SlideBody({ slide }: { slide: Slide }) {
  const Visual = VISUALS[slide.id];
  const a = slide.accent;
  const l = slide.accent2;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: C.bg }}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 80% at 82% 50%, ${l} 0%, transparent 72%)`,
        }}
      />
      <GridLines />

      <div className="relative grid h-full grid-cols-1 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col justify-center px-8 py-8 lg:px-12">
          <div className="sd-init sd-fade-up mb-4 flex items-center gap-2">
            <div className="h-0.5 w-7 flex-none rounded-full" style={{ background: a }} />
            <span
              style={{
                fontFamily: SANS,
                fontSize: '0.67rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: a,
              }}
            >
              {slide.label}
            </span>
          </div>

          <h2
            className="sd-init sd-fade-up sd-delay-100 mb-3 text-balance"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.45rem,2.5vw,2.3rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: C.navy,
            }}
          >
            {slide.title}
          </h2>

          <div className="sd-init sd-fade-up sd-delay-200 mb-4">
            <div className="h-1 w-14 rounded-full" style={{ background: a, opacity: 0.4 }} />
          </div>

          <p
            className="sd-init sd-fade-up sd-delay-300 mb-5 leading-relaxed"
            style={{ fontFamily: SANS, fontSize: '0.95rem', color: C.muted, maxWidth: '36ch' }}
          >
            {slide.pitch}
          </p>

          <ul className="mb-6 space-y-2">
            {slide.bullets.map((b, i) => (
              <li
                key={b}
                className="sd-init sd-fade-up flex items-start gap-2"
                style={{ animationDelay: `${0.38 + i * 0.09}s` }}
              >
                <div className="mt-1.5 size-1.5 flex-none rounded-full" style={{ background: a }} />
                <span style={{ fontFamily: SANS, fontSize: '0.83rem', color: C.text }}>{b}</span>
              </li>
            ))}
          </ul>

          <div
            className="sd-init sd-fade-up sd-delay-700 border-l-2 pl-3"
            style={{ borderColor: a, maxWidth: '40ch' }}
          >
            <p
              style={{
                fontFamily: SANS,
                fontSize: '0.76rem',
                fontStyle: 'italic',
                color: C.muted,
                lineHeight: 1.55,
              }}
            >
              &ldquo;{slide.expoLine}&rdquo;
            </p>
          </div>
        </div>

        <div className="hidden items-center justify-center pr-8 lg:flex">
          <div
            className="sd-init sd-scale-in sd-delay-300 relative flex items-center justify-center"
            style={{
              width: 'min(300px, 88%)',
              aspectRatio: '1',
              background: C.white,
              borderRadius: '24px',
              border: `1px solid ${C.border}`,
              boxShadow: '0 20px 56px rgba(26,74,120,0.09),0 4px 14px rgba(26,74,120,0.05)',
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${l}88 0%, transparent 65%)`,
              }}
            />
            <div className="sd-float relative" style={{ width: '73%', height: '73%' }}>
              <Visual a={a} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContentPanel({
  slideId,
  active,
  className,
}: {
  slideId: SlideId;
  /** The agent has flagged a slide. Until then the panel shows nothing. */
  active: boolean;
  className?: string;
}) {
  const index = SLIDES.findIndex((s) => s.id === slideId);
  const slide = SLIDES[index];
  const reduced = useReducedMotion();

  return (
    <div className={cn('bg-card flex flex-col overflow-hidden rounded-2xl border', className)}>
      <div className="flex flex-none items-center justify-between gap-3 border-b px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className={cn('size-2 rounded-full', active && 'animate-pulse')}
            style={{ background: active ? slide.accent : 'var(--muted-foreground)' }}
          />
          <span className="text-xs font-semibold tracking-wide">Live Content</span>
          {active && (
            <>
              <div className="bg-border h-3 w-px" />
              <span className="text-muted-foreground text-xs whitespace-nowrap">{slide.label}</span>
            </>
          )}
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto p-6">
        {/* mode="wait" so the outgoing slide clears before the next stagger starts —
            overlapping them reads as a glitch rather than a transition. */}
        <AnimatePresence mode="wait">
          {!active ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="relative flex h-full items-center justify-center"
            >
              {/* Brand wash, so the resting state still looks designed. */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <div
                  className="absolute top-1/4 left-1/4 size-64 opacity-[0.12] blur-3xl"
                  style={{ background: '#3a8fd1', borderRadius: SQUIRCLE }}
                />
              </div>

              {/* Despite the filename, sahai-logo-dark.png is the DARK-INK mark —
                  the one that reads on this ivory panel. sahai-logo-light.png is
                  near-white and would be invisible here. */}
              <motion.div
                animate={reduced ? undefined : { scale: [1, 1.03, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <Image
                  src="/sahai-logo-dark.png"
                  alt="Sahai"
                  width={1313}
                  height={446}
                  priority
                  className="h-auto w-[210px] max-w-[60%]"
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <SlideBody slide={slide} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
