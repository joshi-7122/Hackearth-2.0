import { difficultyLabel } from '@/data/challenges';
import { hackathonInfo } from '@/data/hackathon';
import { accentBg, accentRgb, accentText } from '@/lib/accent';
import { cn } from '@/lib/cn';
import { resolveHref } from '@/lib/placeholder';
import type { Challenge } from '@/types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

export function DifficultyMeter({ challenge }: { challenge: Challenge }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn(
              'h-3 w-1.5 rounded-[2px]',
              n <= challenge.difficulty ? accentBg[challenge.accent] : 'bg-indigo/10',
            )}
          />
        ))}
      </span>
      <span className="font-mono text-[0.68rem] tracking-[0.12em] text-ink-muted uppercase">
        {difficultyLabel[challenge.difficulty]}
      </span>
    </span>
  );
}

/** Track detail — the large panel on desktop, the accordion body on mobile. */
export function ChallengeDetail({
  challenge,
  index,
  total,
  compact = false,
}: {
  challenge: Challenge;
  index: number;
  total: number;
  compact?: boolean;
}) {
  const registerHref = resolveHref(hackathonInfo.registration.url) ?? '#register';
  return (
    <div className={cn('relative flex h-full flex-col', !compact && 'p-7 md:p-10')}>
      {!compact && (
        <div className="flex items-start justify-between gap-6">
          <span
            className={cn(
              'grid size-14 place-items-center rounded-2xl border border-line-strong bg-paper/80',
              accentText[challenge.accent],
            )}
          >
            <Icon name={challenge.icon} size={26} strokeWidth={1.4} />
          </span>
          <span className="font-mono text-xs tracking-[0.16em] text-ink-subtle">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      )}

      {!compact && (
        <h3 className="text-display mt-10 text-[clamp(2rem,3.4vw,3.25rem)] text-ink">{challenge.title}</h3>
      )}
      {!compact && (
        <div className="mt-4">
          <DifficultyMeter challenge={challenge} />
        </div>
      )}

      <p className={cn('eyebrow', compact ? 'mt-0' : 'mt-8')}>Example challenge</p>
      <p
        className={cn(
          'mt-3 leading-relaxed text-ink',
          compact ? 'text-[0.98rem]' : 'text-[clamp(1.15rem,1.6vw,1.4rem)] leading-relaxed font-medium text-indigo',
        )}
      >
        {challenge.problem}
      </p>

      <p className={cn('eyebrow', compact ? 'mt-5' : 'mt-8')}>Suggested stack</p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Suggested technologies">
        {challenge.technologies.map((t) => (
          <li key={t}>
            <Badge>{t}</Badge>
          </li>
        ))}
      </ul>

      <div className={cn(compact ? 'mt-6' : 'mt-auto pt-10')}>
        <Button
          href={registerHref}
          external={registerHref.startsWith('http')}
          variant={compact ? 'secondary' : 'primary'}
          ariaLabel={`Register to build in ${challenge.title}`}
        >
          Register to build
        </Button>
      </div>

      {!compact && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 -z-10 size-80 rounded-full blur-[90px]"
          style={{ background: `rgb(${accentRgb[challenge.accent]} / 0.14)` }}
        />
      )}
    </div>
  );
}
