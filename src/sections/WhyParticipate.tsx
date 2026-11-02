import { reasons } from '@/data/hackathon';
import { countWord } from '@/lib/format';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Editorial index: oversized words that fill with brand and reveal their
 * detail on hover/focus. Detail is always visible on touch screens.
 */
export function WhyParticipate() {
  return (
    <section id="why" aria-labelledby="why-title" className="section-y relative border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <SectionHeading
              id="why-title"
              size="md"
              index="02"
              eyebrow="Why participate"
              lines={[`${countWord(reasons.length)} reasons`, <span className="text-brand">to show up.</span>]}
              description="Everyone leaves with more than they arrived with. Here’s what that looks like."
            />
          </div>
        </div>

        <ol className="lg:col-span-8">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.word} i={i} className="border-b border-line first:border-t">
              <div className="group grid grid-cols-[2rem_1fr] xs:grid-cols-[2.5rem_1fr] items-center gap-x-3 xs:gap-x-4 gap-y-3 xs:gap-y-4 py-6 xs:py-7 md:gap-x-6 md:py-8 xl:grid-cols-[3rem_minmax(0,1fr)_17rem] xl:gap-x-8">
                <span className="font-mono text-xs tracking-widest text-ink-subtle transition-colors duration-500 group-hover:text-brand">
                  0{i + 1}
                </span>

                <h3 className="relative min-w-0 text-display text-[clamp(2.1rem,7.5vw,4.75rem)] leading-[0.9] uppercase">
                  <span className="text-outline block transition-opacity duration-500 group-hover:opacity-0 max-md:opacity-0">
                    {r.word}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 block text-brand transition-[clip-path] duration-700 ease-(--ease-out-expo) [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)] max-md:text-ink max-md:[clip-path:inset(0_0_0_0)]"
                  >
                    {r.word}
                  </span>
                </h3>

                <div className="col-span-2 xs:col-span-1 xs:col-start-2 flex items-start gap-3 xs:gap-4 xl:col-start-3 md:translate-x-2 md:transition-transform md:duration-500 md:ease-(--ease-out-expo) md:group-hover:translate-x-0">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-brand transition-colors duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-on-brand">
                    <Icon name={r.icon} size={18} />
                  </span>
                  <div>
                    <p className="font-medium text-ink">{r.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{r.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
