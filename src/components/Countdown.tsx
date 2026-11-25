import { hackathonInfo } from '@/data/hackathon';
import { BinaryField } from './BinaryField';

type Phase = 'before' | 'live' | 'over';

/** Countdown to the offline final — paused until the date is announced. */
export function Countdown() {
  // Countdown is paused until the final date is announced.
  const state = {
    phase: 'before' as Phase,
    parts: ['Days', 'Hours', 'Minutes', 'Seconds'].map((l) => ({ v: '--', l })),
  };

  const heading = 'Hacking begins soon';

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
            The date of the offline final will be announced soon. It runs for 28 hours.
          </p>
          <ol aria-hidden="true" className="mt-5 grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-3">
            {state.parts.map((p) => (
              <li key={p.l} className="rounded-xl xs:rounded-2xl border border-line bg-paper/80 px-1 py-2.5 xs:py-3 text-center backdrop-blur-sm">
                <span className="block overflow-hidden font-display text-[clamp(1.4rem,4.2vw,2.75rem)] leading-none text-indigo tabular-nums">
                  <span key={p.v} className="block animate-[tick-in_420ms_var(--ease-out-expo)] motion-reduce:animate-none">
                    {p.v}
                  </span>
                </span>
                <span className="mt-1.5 xs:mt-2 block font-mono text-[0.55rem] xs:text-[0.58rem] tracking-[0.1em] xs:tracking-[0.14em] text-ink-muted uppercase">{p.l}</span>
              </li>
            ))}
          </ol>
        </>
      )}

      <p className="mt-5 text-sm text-ink-muted">
        <span className="font-semibold text-indigo">Soon</span> · 28-hour offline final at{' '}
        {hackathonInfo.venueShort}
      </p>
    </div>
  );
}
