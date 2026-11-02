import { sponsors } from '@/data/sponsors';
import { isPlaceholder, resolveHref } from '@/lib/placeholder';
import type { Sponsor } from '@/types';
import { Reveal } from './ui/Reveal';
import { Txt } from './ui/Txt';

/** Neutral stand-in logo so the layout looks finished before real logos arrive. */
function PlaceholderMark({ name }: { name: string }) {
  return (
    <span className="flex flex-col items-center gap-3 text-ink-subtle transition-colors duration-500 group-hover:text-brand">
      <svg width={30} height={30} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span className="text-xs">
        <Txt>{name}</Txt>
      </span>
    </span>
  );
}

function PartnerTile({ sponsor }: { sponsor: Sponsor }) {
  const href = resolveHref(sponsor.url);
  const content = sponsor.logo ? (
    <img
      src={sponsor.logo}
      alt={isPlaceholder(sponsor.name) ? 'Community partner logo' : sponsor.name}
      loading="lazy"
      decoding="async"
      className="max-h-14 max-w-[75%] object-contain transition duration-500 group-hover:scale-105"
    />
  ) : (
    <PlaceholderMark name={sponsor.name} />
  );
  const cls =
    'group grid h-36 place-items-center rounded-(--radius-card) border border-line bg-card px-4 shadow-(--shadow-card) transition-[border-color,transform] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-brand/40';
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${sponsor.name} (opens in new tab)`}>
      {content}
    </a>
  ) : (
    <div className={cls}>{content}</div>
  );
}

/** Community partners grid. */
export function SponsorGrid() {
  const community = sponsors.filter((s) => s.tier === 'community');
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
      {community.map((s, i) => (
        <Reveal as="li" key={s.name + i} i={i}>
          <PartnerTile sponsor={s} />
        </Reveal>
      ))}
    </ul>
  );
}
