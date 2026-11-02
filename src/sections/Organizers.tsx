import { organizers } from '@/data/hackathon';
import { Reveal } from '@/components/ui/Reveal';
import type { Organizer } from '@/types';

function LogoTile({ org }: { org: Organizer }) {
  return (
    <figure
      title={`${org.role}: ${org.name}`}
      className="theme-light flex h-32 w-52 shrink-0 flex-col items-center justify-center gap-3 rounded-(--radius-card) border border-line bg-card px-5 shadow-(--shadow-card) transition-[border-color,transform] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-brand/40 md:w-60"
    >
      <div className="flex h-14 items-center justify-center">
        <img
          src={org.logo}
          alt={org.name}
          style={{ height: Math.min(org.height * 1.15, 56) }}
          className="w-auto max-w-[11rem] object-contain mix-blend-multiply"
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="font-mono text-[0.62rem] tracking-[0.14em] text-ink-muted uppercase">
        {org.role}
      </figcaption>
    </figure>
  );
}

/**
 * Infinite horizontal logo band. The set is repeated so one copy is always
 * wider than the viewport, then the track is doubled and shifted by -50% for a
 * seamless loop. Pauses on hover/focus; static and wrapped for reduced motion.
 */
export function Organizers() {
  // Repeat the logos so a single copy comfortably exceeds wide screens.
  const copy = [...organizers, ...organizers];
  const seconds = copy.length * 4.5;

  return (
    <section id="organizers" aria-labelledby="organizers-title" className="relative pt-4 pb-20 md:pb-24">
      <div className="container-x">
        <Reveal as="h2" className="eyebrow flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
          <span id="organizers-title">Organized by</span>
          <span aria-hidden="true" className="h-px flex-1 bg-line-strong" />
        </Reveal>
      </div>

      <div
        className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]"
      >
        <div
          className="flex w-max animate-[marquee_var(--marquee-dur)_linear_infinite] py-2 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
          style={{ ['--marquee-dur' as string]: `${seconds}s` }}
        >
          {/* Copy 1 — the one assistive tech reads */}
          <ul className="flex shrink-0 gap-5 pr-5 motion-reduce:container-x motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0">
            {copy.map((o, i) => (
              <li key={o.name + i} aria-hidden={i >= organizers.length || undefined} className={i >= organizers.length ? 'motion-reduce:hidden' : undefined}>
                <LogoTile org={o} />
              </li>
            ))}
          </ul>
          {/* Copy 2 — visual duplicate for the seamless loop */}
          <ul aria-hidden="true" className="flex shrink-0 gap-5 pr-5 motion-reduce:hidden">
            {copy.map((o, i) => (
              <li key={'dup' + o.name + i}>
                <LogoTile org={o} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
