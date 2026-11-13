import { sponsors } from '@/data/sponsors';
import { resolveHref } from '@/lib/placeholder';
import type { Sponsor } from '@/types';

function PartnerTile({ sponsor }: { sponsor: Sponsor }) {
  const href = resolveHref(sponsor.url);
  const cls =
    'group block h-40 w-60 shrink-0 overflow-hidden rounded-(--radius-card) border border-line shadow-(--shadow-card) transition-[border-color,transform] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-brand/50 md:h-48 md:w-72';
  const img = (
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
    />
  );
  const style = { background: sponsor.bg ?? 'var(--color-card)' };
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      style={style}
      aria-label={`${sponsor.name} (opens in new tab)`}
    >
      {img}
    </a>
  ) : (
    <div className={cls} style={style} title={sponsor.name}>
      {img}
    </div>
  );
}

/**
 * Community partners as an infinite horizontal logo band. The set is repeated
 * so one copy is wider than the viewport, then the track is doubled and shifted
 * by -50% for a seamless loop. Pauses on hover/focus; static grid for reduced motion.
 */
export function SponsorGrid() {
  const community = sponsors.filter((s) => s.tier === 'community' && s.logo);
  const copy = [...community, ...community];
  const seconds = copy.length * 4;

  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]">
      <div
        className="flex w-max animate-[marquee_var(--marquee-dur)_linear_infinite] py-3 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
        style={{ ['--marquee-dur' as string]: `${seconds}s` }}
      >
        {/* Copy 1 — the one assistive tech reads */}
        <ul className="flex shrink-0 gap-5 pr-5 motion-reduce:container-x motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0">
          {copy.map((s, i) => (
            <li
              key={s.name + i}
              aria-hidden={i >= community.length || undefined}
              className={i >= community.length ? 'motion-reduce:hidden' : undefined}
            >
              <PartnerTile sponsor={s} />
            </li>
          ))}
        </ul>
        {/* Copy 2 — visual duplicate for the seamless loop */}
        <ul aria-hidden="true" className="flex shrink-0 gap-5 pr-5 motion-reduce:hidden">
          {copy.map((s, i) => (
            <li key={'dup' + s.name + i}>
              <PartnerTile sponsor={s} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
