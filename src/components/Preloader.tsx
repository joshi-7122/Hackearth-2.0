import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';
import { LogoMark } from './ui/Logo';

const KEY = 'he2-booted';

function alreadyBooted(): boolean {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * A sub-second "boot" sequence shown once per session. Skipped entirely for
 * reduced motion or repeat visits, so it never stands between a user and content.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [skip] = useState(() => prefersReducedMotion() || alreadyBooted());
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(skip);

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const DURATION = 850;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DURATION);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        onDone();
        try {
          sessionStorage.setItem(KEY, '1');
        } catch {
          /* storage unavailable — fine */
        }
        window.setTimeout(() => setGone(true), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [skip, onDone]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-paper transition-[clip-path] duration-700 ease-(--ease-in-out-quart)"
      style={{ clipPath: leaving ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)' }}
    >
      <LogoMark size={44} />
      <p className="mt-6 font-mono text-xs tracking-[0.14em] text-ink-muted">
        <span className="text-brand">&gt;</span> hackearth --init v2.0
      </p>
      <div className="mt-5 h-px w-48 overflow-hidden bg-line-strong">
        <div className="h-full bg-brand" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 font-mono text-[0.65rem] tabular-nums text-ink-subtle">{String(pct).padStart(3, '0')}%</p>
    </div>
  );
}
