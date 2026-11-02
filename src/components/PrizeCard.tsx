import { hackathonInfo } from '@/data/hackathon';
import { cn } from '@/lib/cn';
import { useSpotlight } from '@/hooks/usePointerEffects';
import type { Prize } from '@/types';
import { Icon } from './ui/Icon';
import { Txt } from './ui/Txt';

const rankLabel = { 1: '1st place', 2: '2nd place', 3: '3rd place' } as const;

/** Podium card. Rank 1 is taller, lit, and carries the particle shimmer. */
export function PrizeCard({ prize }: { prize: Prize }) {
  const first = prize.rank === 1;
  const onMove = useSpotlight<HTMLElement>();

  return (
    <article
      onPointerMove={onMove}
      className={cn(
        'spotlight group relative flex flex-col overflow-hidden rounded-(--radius-panel) border p-5 xs:p-7 md:p-8',
        first
          ? 'border-brand/40 bg-gradient-to-b from-brand/[0.09] via-card to-card shadow-[0_0_0_1px_rgb(199_58_123/0.15),0_40px_120px_-40px_rgb(199_58_123/0.45)] lg:min-h-[26rem]'
          : 'border-line bg-card lg:min-h-[21rem]',
      )}
    >
      {first && <Particles />}

      <span
        aria-hidden="true"
        className={cn(
          'text-display pointer-events-none absolute -right-3 -bottom-10 text-[12rem] leading-none select-none md:text-[14rem]',
          first ? 'text-brand/[0.09]' : 'text-indigo/[0.06]',
        )}
      >
        {prize.rank}
      </span>

      <div className="flex items-center justify-between">
        <span className={cn('eyebrow', first && 'text-brand')}>{rankLabel[prize.rank]}</span>
        <span
          className={cn(
            'grid size-11 place-items-center rounded-full border',
            first ? 'border-brand/50 bg-brand text-on-brand' : 'border-line-strong text-ink-muted',
          )}
        >
          <Icon name="trophy" size={20} />
        </span>
      </div>

      <h3 className="mt-auto pt-10 xs:pt-16 font-serif text-base xs:text-lg font-semibold text-ink-muted">{prize.title}</h3>
      <p
        className={cn(
          'text-display mt-2 text-ink [&_.ph]:align-middle [&_.ph]:text-[0.5em]',
          prize.amount.startsWith('₹')
            ? cn('whitespace-nowrap', first ? 'text-[clamp(2.6rem,5vw,4.25rem)]' : 'text-[clamp(2.2rem,4vw,3.25rem)]')
            : first
              ? 'text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.05]'
              : 'text-[clamp(1.5rem,4.5vw,2.25rem)] leading-[1.05]',
        )}
      >
        <Txt>{prize.amount}</Txt>
      </p>
      {prize.perks?.length ? (
        <ul className="mt-6 space-y-2 border-t border-line pt-5">
          {prize.perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2.5 text-sm text-ink-muted">
              <Icon name="check" size={14} strokeWidth={2.2} className={first ? 'text-brand' : 'text-ink-subtle'} />
              <Txt>{perk}</Txt>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 border-t border-line pt-5 text-sm text-ink-muted">
          From the prize pool of {hackathonInfo.prizePoolQualifier.toLowerCase()} {hackathonInfo.prizePool}
        </p>
      )}
    </article>
  );
}

/** A handful of slow-rising sparks. Pure CSS; disabled under reduced motion. */
function Particles() {
  const sparks = [
    { l: '12%', d: '0s', t: '7s' },
    { l: '28%', d: '2.4s', t: '9s' },
    { l: '46%', d: '1.1s', t: '8s' },
    { l: '63%', d: '3.6s', t: '10s' },
    { l: '78%', d: '0.6s', t: '7.5s' },
    { l: '90%', d: '2.9s', t: '9.5s' },
  ];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 motion-reduce:hidden">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute bottom-0 size-1 rounded-full bg-brand shadow-[0_0_8px_rgb(199_58_123/0.9)]"
          style={{ left: s.l, animation: `rise ${s.t} linear ${s.d} infinite` }}
        />
      ))}
    </div>
  );
}
