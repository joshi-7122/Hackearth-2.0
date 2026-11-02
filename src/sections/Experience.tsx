import { journey } from '@/data/schedule';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

/**
 * Participant journey as an infinite horizontal marquee — the same
 * transition as the "Organized by" band: a CSS linear animation over a
 * doubled track shifted by -50%, paused on hover/focus, fading edges.
 * Reduced motion: static, wrapped grid of the steps.
 */

const SECONDS_PER_CARD = 6;

function StepCard({ s, i }: { s: (typeof journey)[number]; i: number }) {
  const isLast = i === journey.length - 1;
  return (
    <article
      className={cn(
        'flex h-full w-[80vw] max-w-[19rem] flex-col rounded-(--radius-card) border p-5 xs:p-6 sm:w-[19rem] md:p-7',
        isLast ? 'border-brand bg-brand text-on-brand' : 'border-line bg-card shadow-(--shadow-card)',
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn('grid size-11 place-items-center rounded-full border', isLast ? 'border-on-brand/30' : 'border-line-strong text-brand')}>
          <Icon name={s.icon} size={20} />
        </span>
        <span className={cn('font-mono text-xs tracking-[0.16em]', isLast ? 'opacity-70' : 'text-ink-subtle')}>STEP</span>
      </div>
      <span aria-hidden="true" className={cn('text-display mt-6 xs:mt-8 text-[3.8rem] xs:text-[4.5rem] leading-none', isLast ? '!text-on-brand' : 'text-outline')}>
        {String(i + 1).padStart(2, '0')}
      </span>
      <h3 className={cn('mt-3 font-display text-[1.6rem] leading-tight', isLast ? '' : 'text-indigo')}>
        <span className="sr-only">Step {i + 1}: </span>
        {s.title}
      </h3>
      <p className={cn('mt-2 text-[0.95rem] leading-relaxed', isLast ? 'opacity-85' : 'text-ink-muted')}>{s.description}</p>
    </article>
  );
}

export function Experience() {
  const seconds = journey.length * SECONDS_PER_CARD;

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y relative overflow-hidden border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          index="04"
          eyebrow="The experience"
          lines={['From kickoff', <span className="text-brand">to the podium.</span>]}
        />
      </div>

      <Reveal className="mt-12 md:mt-14">
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]">
          <div
            className="flex w-max animate-[marquee_var(--marquee-dur)_linear_infinite] py-4 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
            style={{ ['--marquee-dur' as string]: `${seconds}s` }}
          >
            {/* Copy 1 — the one assistive tech reads */}
            <ol
              aria-label="Participant journey"
              className="flex shrink-0 gap-5 pr-5 motion-reduce:container-x motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0"
            >
              {journey.map((s, i) => (
                <li key={s.title} className="flex">
                  <StepCard s={s} i={i} />
                </li>
              ))}
            </ol>
            {/* Copy 2 — visual duplicate for the seamless loop */}
            <ol aria-hidden="true" className="flex shrink-0 gap-5 pr-5 motion-reduce:hidden">
              {journey.map((s, i) => (
                <li key={'dup' + s.title} className="flex">
                  <StepCard s={s} i={i} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
