import { pastEvents } from '@/data/events';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { PastEvent } from '@/types';

type Variant = 'feature' | 'row' | 'card';

const media: Record<Variant, string> = {
  feature: 'relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[22rem] lg:flex-1',
  row: 'relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-[44%] sm:shrink-0',
  card: 'relative aspect-[4/3] overflow-hidden',
};

function EventCard({ event, variant = 'card' }: { event: PastEvent; variant?: Variant }) {
  return (
    <article
      className={
        'group flex h-full overflow-hidden rounded-(--radius-card) border border-line bg-card shadow-(--shadow-card) ' +
        (variant === 'row' ? 'flex-col sm:flex-row' : 'flex-col')
      }
    >
      <div className={media[variant]}>
        <img
          src={event.image}
          alt={`Participants at ${event.title}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.04]"
        />
        {event.stat && (
          <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-sm text-indigo shadow-sm backdrop-blur">
            <strong className="font-display font-normal text-brand">{event.stat.value}</strong> {event.stat.label}
          </span>
        )}
      </div>
      <div className={variant === 'feature' ? 'p-5 xs:p-6 md:p-8' : 'flex flex-1 flex-col justify-center p-4 xs:p-5 md:p-6'}>
        <p className="eyebrow text-[0.65rem] text-brand-deep">{event.tag}</p>
        <h3
          className={
            variant === 'feature'
              ? 'mt-2 font-display text-[clamp(1.5rem,4vw,2.6rem)] text-indigo'
              : 'mt-2 font-display text-xl xs:text-2xl text-indigo'
          }
        >
          {event.title}
        </h3>
        <p className="mt-2 leading-relaxed text-ink-muted">{event.description}</p>
      </div>
    </article>
  );
}

export function Legacy() {
  const [first, ...rest] = pastEvents;
  return (
    <section id="legacy" aria-labelledby="legacy-title" className="section-y relative border-t border-line bg-paper-2">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="legacy-title"
            index="10"
            eyebrow="Past events"
            lines={['We’ve done', <span className="text-brand">this before.</span>]}
          />
          <p className="max-w-md text-ink-muted lg:pb-3">
            WIE HackEarth 2.0 is run by the team behind some of Galgotias University’s largest student tech events.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {first && (
            <Reveal className="lg:row-span-2">
              <EventCard event={first} variant="feature" />
            </Reveal>
          )}
          {rest.slice(0, 2).map((e, i) => (
            <Reveal key={e.title} i={i + 1}>
              <EventCard event={e} variant="row" />
            </Reveal>
          ))}
        </div>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((e, i) => (
            <Reveal as="li" key={e.title} i={i}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
