import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { schedule } from '@/data/schedule';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { Icon } from './ui/Icon';
import { Txt } from './ui/Txt';

/**
 * Scroll-driven journey map for the timeline.
 *
 * A winding road with one pin per checkpoint. As the visitor scrolls the
 * checkpoint cards, a traveller marker moves along the road (eased), the road
 * fills in behind it and pins light up on arrival. The chips and pins are a
 * nav: clicking one glides the page to that checkpoint.
 *
 * Desktop: vertical road in a sticky panel beside the cards.
 * Mobile: horizontal road in a sticky strip under the navbar.
 */

const ROADS = {
  vertical: {
    viewBox: '0 0 400 720',
    d: 'M 200 50 C 350 120, 350 210, 205 262 S 50 400, 200 462 S 355 600, 200 670',
  },
  horizontal: {
    viewBox: '0 0 820 150',
    d: 'M 40 96 C 130 22, 220 22, 290 74 S 450 136, 535 76 S 690 18, 780 64',
  },
} as const;

type Orientation = keyof typeof ROADS;
interface Pt {
  x: number;
  y: number;
  /** Label side: away from where the road heads next. */
  right?: boolean;
}

/** Fractional checkpoint index (0 … n-1) from where the cards sit in the viewport. */
function progressFromCards(cards: (HTMLElement | null)[]): number {
  const anchor = window.innerHeight * 0.5;
  const centers = cards.map((c) => {
    if (!c) return 0;
    const r = c.getBoundingClientRect();
    return r.top + r.height / 2;
  });
  if (anchor <= centers[0]!) return 0;
  for (let i = 0; i < centers.length - 1; i++) {
    const a = centers[i]!;
    const b = centers[i + 1]!;
    if (anchor >= a && anchor <= b) return i + (anchor - a) / (b - a);
  }
  return centers.length - 1;
}

function Road({
  orientation,
  progress,
  active,
  onPick,
}: {
  orientation: Orientation;
  progress: number; // 0 … n-1
  active: number;
  onPick: (i: number) => void;
}) {
  const road = ROADS[orientation];
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [pins, setPins] = useState<Pt[]>([]);
  const [marker, setMarker] = useState<Pt>({ x: 0, y: 0 });
  const n = schedule.length;

  useLayoutEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const L = p.getTotalLength();
    setLen(L);
    setPins(
      schedule.map((_, i) => {
        const at = (i / (n - 1)) * L;
        const pt = p.getPointAtLength(at);
        // Look a little along the road; put the label on the opposite side.
        const ahead = p.getPointAtLength(Math.min(L, at + 40));
        const behind = p.getPointAtLength(Math.max(0, at - 40));
        const dir = i < n - 1 ? ahead.x - pt.x : behind.x - pt.x;
        return { x: pt.x, y: pt.y, right: dir < 0 };
      }),
    );
  }, [n]);

  useLayoutEffect(() => {
    const p = pathRef.current;
    if (!p || !len) return;
    const pt = p.getPointAtLength((progress / (n - 1)) * len);
    setMarker({ x: pt.x, y: pt.y });
  }, [progress, len, n]);

  const vertical = orientation === 'vertical';
  const filled = len ? (progress / (n - 1)) * len : 0;

  return (
    <svg viewBox={road.viewBox} className="size-full overflow-visible" role="group" aria-label="Journey map">
      <defs>
        <linearGradient id={`road-${orientation}`} x1="0" y1="0" x2={vertical ? '0' : '1'} y2={vertical ? '1' : '0'}>
          <stop offset="0%" stopColor="var(--color-brand)" />
          <stop offset="60%" stopColor="var(--color-violet)" />
          <stop offset="100%" stopColor="var(--color-leaf)" />
        </linearGradient>
        <radialGradient id={`glow-${orientation}`}>
          <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Road bed + dashed centre line */}
      <path d={road.d} fill="none" stroke="var(--color-line-strong)" strokeWidth={vertical ? 22 : 16} strokeLinecap="round" />
      <path
        ref={pathRef}
        d={road.d}
        fill="none"
        stroke="var(--color-ink-subtle)"
        strokeWidth="2"
        strokeDasharray="6 9"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Travelled section */}
      <path
        d={road.d}
        fill="none"
        stroke={`url(#road-${orientation})`}
        strokeWidth={vertical ? 6 : 5}
        strokeLinecap="round"
        strokeDasharray={`${len} ${len}`}
        strokeDashoffset={len - filled}
      />

      {/* Checkpoint pins (also a nav) */}
      {pins.map((p, i) => {
        const reached = progress >= i - 0.02;
        const isActive = i === active;
        const item = schedule[i]!;
        const labelRight = !!p.right;
        return (
          <g
            key={item.phase}
            transform={`translate(${p.x} ${p.y})`}
            className="cursor-pointer outline-none"
            role="button"
            tabIndex={0}
            aria-label={`Go to checkpoint ${i + 1}: ${item.phase}`}
            aria-current={isActive ? 'step' : undefined}
            onClick={() => onPick(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPick(i);
              }
            }}
          >
            {isActive && (
              <circle r={vertical ? 30 : 24} fill="none" stroke="var(--color-brand)" strokeWidth="2" opacity="0.5" className="origin-center animate-[pin-ping_1.8s_ease-out_infinite] motion-reduce:animate-none" />
            )}
            <circle
              r={vertical ? 19 : 15}
              fill={reached ? 'var(--color-brand)' : 'var(--color-card)'}
              stroke={reached ? 'var(--color-brand)' : 'var(--color-line-strong)'}
              strokeWidth="2.5"
              className="transition-[fill,stroke] duration-500"
            />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="var(--font-mono)"
              fontSize={vertical ? 14 : 12}
              fontWeight="600"
              fill={reached ? 'var(--color-on-brand)' : 'var(--color-ink-muted)'}
            >
              {String(i + 1).padStart(2, '0')}
            </text>
            {vertical && (
              <g transform={`translate(${labelRight ? 32 : -32} 0)`}>
                <text
                  textAnchor={labelRight ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontFamily="var(--font-display)"
                  fontSize="22"
                  fill={isActive ? 'var(--color-indigo)' : 'var(--color-ink-muted)'}
                >
                  {item.short ?? item.phase}
                </text>
                <text
                  y="22"
                  textAnchor={labelRight ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  letterSpacing="1.2"
                  fill="var(--color-ink-subtle)"
                >
                  {item.date.toUpperCase()}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Traveller marker */}
      {len > 0 && (
        <g transform={`translate(${marker.x} ${marker.y})`} aria-hidden="true">
          <circle r={vertical ? 42 : 30} fill={`url(#glow-${orientation})`} />
          <circle r={vertical ? 10 : 8} fill="var(--color-card)" stroke="var(--color-brand)" strokeWidth="3" />
          <circle r={vertical ? 4 : 3} fill="var(--color-brand)" />
        </g>
      )}
    </svg>
  );
}

export function JourneyMap() {
  const n = schedule.length;
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState(0); // eased, drives the map
  const target = useRef(0);
  const current = useRef(0);
  const raf = useRef(0);
  const active = Math.min(n - 1, Math.max(0, Math.round(progress)));

  // Scroll → target progress; rAF eases the marker toward it.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const tick = () => {
      const diff = target.current - current.current;
      if (Math.abs(diff) < 0.001 || reduced) {
        current.current = target.current;
        setProgress(current.current);
        raf.current = 0;
        return;
      }
      current.current += diff * 0.14;
      setProgress(current.current);
      raf.current = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target.current = progressFromCards(cardRefs.current);
      if (!raf.current) raf.current = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const y = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  const chips = (
    <nav aria-label="Timeline checkpoints" className="flex flex-wrap gap-2">
      {schedule.map((s, i) => (
        <button
          key={s.phase}
          type="button"
          onClick={() => goTo(i)}
          aria-current={i === active ? 'step' : undefined}
          className={cn(
            'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors duration-300',
            i === active
              ? 'border-brand bg-brand text-on-brand'
              : progress >= i
                ? 'border-brand/40 bg-brand/10 text-brand-deep hover:bg-brand/15'
                : 'border-line-strong text-ink-muted hover:border-brand/40 hover:text-ink',
          )}
        >
          <span className="font-mono text-[0.7rem]">{String(i + 1).padStart(2, '0')}</span>
          {s.short ?? s.phase}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
      {/* Mobile / tablet: sticky horizontal map strip */}
      <div className="sticky top-[calc(var(--nav-h)+0.25rem)] z-20 -mx-4 mb-8 border-y border-line bg-paper/90 px-4 pt-3 pb-2 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden">
        <div className="h-20 sm:h-24">
          <Road orientation="horizontal" progress={progress} active={active} onPick={goTo} />
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="font-semibold text-indigo">
            {String(active + 1).padStart(2, '0')} · {schedule[active]!.short ?? schedule[active]!.phase}
          </span>
          <span className="font-mono text-ink-muted">{schedule[active]!.date}</span>
        </div>
      </div>

      {/* Desktop: sticky vertical map panel */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--nav-h)+1.5rem)] flex h-[calc(100svh-var(--nav-h)-3rem)] min-h-[34rem] flex-col rounded-(--radius-panel) border border-line bg-card/70 p-6 shadow-(--shadow-card) backdrop-blur-sm">
          {chips}
          <div className="relative mt-4 min-h-0 flex-1">
            {/* Map terrain: dotted grid + soft contour rings */}
            <div aria-hidden="true" className="bg-dots absolute inset-0 rounded-2xl opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" />
            <div aria-hidden="true" className="absolute top-[18%] left-[8%] size-40 rounded-full border border-dashed border-line-strong opacity-60" />
            <div aria-hidden="true" className="absolute right-[6%] bottom-[14%] size-52 rounded-full border border-dashed border-line-strong opacity-50" />
            <div className="absolute inset-0 px-2 py-4">
              <Road orientation="vertical" progress={progress} active={active} onPick={goTo} />
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-ink-subtle">
            <Icon name="compass" size={14} className="text-brand" />
            Scroll to travel · click a checkpoint to jump
          </p>
        </div>
      </div>

      {/* Checkpoint cards */}
      <ol className="lg:col-span-7">
        {schedule.map((item, i) => {
          const isActive = i === active;
          return (
            <li
              key={item.phase}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="flex min-h-[55vh] items-center py-6 lg:min-h-[78vh]"
            >
              <article
                aria-current={isActive ? 'step' : undefined}
                className={cn(
                  'w-full rounded-(--radius-panel) border p-6 transition-[opacity,transform,border-color,box-shadow] duration-500 ease-(--ease-out-expo) md:p-8',
                  isActive
                    ? 'border-brand/50 bg-card opacity-100 shadow-[0_30px_60px_-30px_rgb(199_58_123/0.45)]'
                    : 'border-line bg-card/60 opacity-55 lg:scale-[0.97]',
                )}
              >
                <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs tracking-[0.12em] text-ink-subtle uppercase">
                  <span className="grid size-7 place-items-center rounded-full bg-brand text-[0.7rem] text-on-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.round && (
                    <span className="rounded-full border border-brand/40 px-2 py-0.5 text-[0.65rem] text-brand-deep">{item.round}</span>
                  )}
                  <span className="text-brand-deep">
                    <Txt>{item.date}</Txt>
                  </span>
                  {item.time && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>
                        <Txt>{item.time}</Txt>
                      </span>
                    </>
                  )}
                </p>
                <h3 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-indigo">{item.phase}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">{item.description}</p>
                {item.points && (
                  <ul className="mt-4 space-y-2 text-[0.97rem] text-ink-muted">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5">
                        <Icon name="check" size={16} strokeWidth={2.2} className="mt-1 shrink-0 text-brand" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {i < n - 1 && (
                  <button
                    type="button"
                    onClick={() => goTo(i + 1)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-deep hover:underline"
                  >
                    Next checkpoint: {schedule[i + 1]!.short ?? schedule[i + 1]!.phase}
                    <Icon name="arrowRight" size={15} />
                  </button>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
