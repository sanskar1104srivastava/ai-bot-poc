'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowsLeftRightIcon,
  BedIcon,
  BuildingsIcon,
  CalendarCheckIcon,
  ChartLineUpIcon,
  ClockCounterClockwiseIcon,
  CurrencyInrIcon,
  FilesIcon,
  FirstAidKitIcon,
  FlaskIcon,
  HeartbeatIcon,
  IdentificationBadgeIcon,
  IdentificationCardIcon,
  MagnifyingGlassIcon,
  NotePencilIcon,
  PackageIcon,
  PathIcon,
  PillIcon,
  ReceiptIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SignOutIcon,
  SirenIcon,
  SparkleIcon,
  SquaresFourIcon,
  TestTubeIcon,
  UsersThreeIcon,
  VideoCameraIcon,
} from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/shadcn/utils';
import { type IconName, SLIDES, type Slide, type SlideId } from '@/lib/slides';

const ICONS: Record<IconName, React.ComponentType<{ size?: number; className?: string }>> = {
  RocketLaunch: RocketLaunchIcon,
  SquaresFour: SquaresFourIcon,
  MagnifyingGlass: MagnifyingGlassIcon,
  ClockCounterClockwise: ClockCounterClockwiseIcon,
  Files: FilesIcon,
  IdentificationCard: IdentificationCardIcon,
  IdentificationBadge: IdentificationBadgeIcon,
  ShieldCheck: ShieldCheckIcon,
  ArrowsLeftRight: ArrowsLeftRightIcon,
  UsersThree: UsersThreeIcon,
  NotePencil: NotePencilIcon,
  Siren: SirenIcon,
  Bed: BedIcon,
  Heartbeat: HeartbeatIcon,
  FirstAidKit: FirstAidKitIcon,
  SignOut: SignOutIcon,
  Pill: PillIcon,
  Package: PackageIcon,
  TestTube: TestTubeIcon,
  Flask: FlaskIcon,
  Path: PathIcon,
  Sparkle: SparkleIcon,
  CalendarCheck: CalendarCheckIcon,
  VideoCamera: VideoCameraIcon,
  Receipt: ReceiptIcon,
  CurrencyInr: CurrencyInrIcon,
  ChartLineUp: ChartLineUpIcon,
  Buildings: BuildingsIcon,
};

/** Squircle — softer than a circle, less boxy than a card. */
const SQUIRCLE = '38% 62% 63% 37% / 41% 44% 56% 59%';

function useListVariants() {
  const reduced = useReducedMotion();

  return {
    container: {
      hidden: {},
      visible: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: 0.12 } },
    },
    item: {
      hidden: { opacity: 0, y: reduced ? 0 : 14, scale: reduced ? 1 : 0.96 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
      },
    },
  };
}

/** Soft colour wash behind the slide, so each topic feels distinct. */
function AccentWash({ slide }: { slide: Slide }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -top-24 -right-16 size-72 opacity-25 blur-3xl"
        style={{ background: slide.accent, borderRadius: SQUIRCLE }}
      />
      <div
        className="absolute -bottom-28 -left-20 size-72 opacity-20 blur-3xl"
        style={{ background: slide.accent2, borderRadius: SQUIRCLE }}
      />
    </div>
  );
}

function SlideBody({ slide }: { slide: Slide }) {
  const { container, item } = useListVariants();
  const HeroIcon = ICONS[slide.icon];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <AccentWash slide={slide} />

      <div className="relative flex min-h-0 flex-1 flex-col">
        {/* Hero: eyebrow, gradient headline, and the pitch line. */}
        <motion.div className="mb-5 flex items-start gap-4" variants={item}>
          <div
            className="grid size-14 flex-none place-items-center text-white shadow-lg"
            style={{
              background: `linear-gradient(140deg, ${slide.accent}, ${slide.accent2})`,
              borderRadius: SQUIRCLE,
              boxShadow: `0 10px 26px -10px ${slide.accent}`,
            }}
          >
            <HeroIcon size={26} />
          </div>

          <div className="min-w-0">
            <span
              className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase"
              style={{ color: slide.accent }}
            >
              {slide.label}
            </span>
            <h2
              className="mt-1 text-[27px] leading-[1.12] font-extrabold text-balance"
              style={{
                backgroundImage: `linear-gradient(100deg, ${slide.accent}, ${slide.accent2})`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {slide.title}
            </h2>
          </div>
        </motion.div>

        <motion.p className="mb-5 text-[15px] leading-relaxed font-medium" variants={item}>
          {slide.pitch}
        </motion.p>

        <motion.div className="flex flex-col gap-2.5" variants={container}>
          {slide.bullets.map((bullet) => (
            <motion.div
              key={bullet}
              className="flex items-start gap-3 rounded-2xl border border-white/60 bg-white/70 p-3.5 shadow-sm backdrop-blur-sm"
              variants={item}
            >
              <span
                className="mt-1.5 size-2 flex-none rounded-full"
                style={{ background: slide.accent }}
                aria-hidden
              />
              <p className="text-sm leading-snug font-medium">{bullet}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/** The right-hand workspace: whichever slide the agent is currently talking to. */
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
  const { container } = useListVariants();
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
              variants={container}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <SlideBody slide={slide} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
