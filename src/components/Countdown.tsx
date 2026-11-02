import { useEffect, useState } from 'react';
import { hackathonInfo } from '@/data/hackathon';
import { BinaryField } from './BinaryField';

type Phase = 'before' | 'live' | 'over';

function remaining(now: number) {
  const start = new Date(hackathonInfo.startDate).getTime();
  const end = new Date(hackathonInfo.endDate).getTime();
  const phase: Phase = now < start ? 'before' : now < end ? 'live' : 'over';
  const ms = Math.max(0, (phase === 'before' ? start : end) - now);
  const s = Math.floor(ms / 1000);
  return {
    phase,
    parts: [
      { v: Math.floor(s / 86400), l: 'Days' },
      { v: Math.floor((s % 86400) / 3600), l: 'Hours' },
      { v: Math.floor((s % 3600) / 60), l: 'Minutes' },
      { v: s % 60, l: 'Seconds' },
    ],
  };
}

/** Live countdown to the offline final (29 Nov, 12:00 PM IST). */
export function Countdown() {
  const [state, setState] = useState(() => remaining(Date.now()));
  useEffect(() => {
    const id = window.setInterval(() => setState(remaining(Date.now())), 1000);
    return () => window.clearInterval(id);
  }, []);

  const heading =
    state.phase === 'before' ? 'Hacking begins in' : state.phase === 'live' ? 'Live now · ends in' : 'That’s a wrap';

  return (
    <div className="relative isolate overflow-hidden rounded-(--radius-panel) border border-line bg-card p-4 xs:p-6 shadow-(--shadow-card) md:p-7">
      <BinaryField
        className="absolute inset-y-0 right-0 -z-10 w-2/3 [mask-image:linear-gradient(to_left,#000,transparent)]"
        fontSize={12}
        maxAlpha={0.4}
      />
      <p className="eyebrow flex items-center gap-2 text-brand-deep">
        <span className="size-1.5 animate-pulse-dot rounded-full bg-brand" aria-hidden="true" />
        {heading}
      </p>

      {state.phase === 'over' ? (
        <p className="mt-4 font-display text-3xl text-indigo">Thank you, builders.</p>
      ) : (
        <>
          <p className="sr-only">
            The offline final starts on 29 November 2026 at 12:00 PM IST and runs for 24 hours.
          </p>
          <ol aria-hidden="true" className="mt-5 grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3">
            {state.parts.map((p) => (
              <li key={p.l} className="rounded-xl xs:rounded-2xl border border-line bg-paper/80 px-1 py-2.5 xs:py-3 text-center backdrop-blur-sm">
                <span className="block overflow-hidden font-display text-[clamp(1.4rem,4.2vw,2.75rem)] leading-none text-indigo tabular-nums">
                  <span key={p.v} className="block animate-[tick-in_420ms_var(--ease-out-expo)] motion-reduce:animate-none">
                    {String(p.v).padStart(2, '0')}
                  </span>
                </span>
                <span className="mt-1.5 xs:mt-2 block font-mono text-[0.55rem] xs:text-[0.58rem] tracking-[0.1em] xs:tracking-[0.14em] text-ink-muted uppercase">{p.l}</span>
              </li>
            ))}
          </ol>
        </>
      )}

      <p className="mt-5 text-sm text-ink-muted">
        <span className="font-semibold text-indigo">29 Nov 2026, 12:00 PM IST</span> · 24-hour offline final at{' '}
        {hackathonInfo.venueShort}
      </p>
    </div>
  );
}
