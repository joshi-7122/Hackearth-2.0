import { hackathonInfo } from '@/data/hackathon';
import { logistics } from '@/data/logistics';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const ROUTE = 'M40 110C190 10 410 10 560 110';

/** GBU ⇄ Galgotias shuttle: a dashed arc with a comet running back and forth. */
function RouteLine() {
  const { stay, venue } = logistics;
  return (
    <div className="relative">
      <p className="sr-only">
        Pick-up and drop shuttle between {stay.place} and {venue.place}.
      </p>
      <svg viewBox="0 0 600 140" className="block w-full overflow-visible" aria-hidden="true">
        <path d={ROUTE} fill="none" stroke="var(--color-line-strong)" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
        <path
          d={ROUTE}
          pathLength={100}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="12 188"
          className="animate-[shuttle_3.8s_var(--ease-in-out-quart)_infinite_alternate] [filter:drop-shadow(0_0_6px_rgb(var(--spot)/0.55))] motion-reduce:hidden"
        />
        {[40, 560].map((x, i) => (
          <g key={x}>
            <circle
              cx={x}
              cy={110}
              r={11}
              fill="none"
              stroke={i === 0 ? 'var(--color-leaf)' : 'var(--color-brand)'}
              strokeWidth="1.5"
              className="origin-center animate-[pin-ping_2.4s_ease-out_infinite] motion-reduce:animate-none"
              style={{ animationDelay: `${i * 1.2}s` }}
            />
            <circle cx={x} cy={110} r={11} fill="var(--color-card)" stroke={i === 0 ? 'var(--color-leaf)' : 'var(--color-brand)'} strokeWidth="2" />
            <circle cx={x} cy={110} r={4.5} fill={i === 0 ? 'var(--color-leaf)' : 'var(--color-brand)'} />
          </g>
        ))}
      </svg>

      {/* Sits on the arc's crest; the card fill masks the dashes behind it */}
      <span className="absolute top-[25%] left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-line-strong bg-card px-3 py-1 font-mono text-[0.6rem] tracking-[0.14em] whitespace-nowrap text-ink-muted uppercase xs:text-[0.66rem]">
        <Icon name="bus" size={13} className="text-brand" />
        Pick-up &amp; drop
      </span>

      <div className="mt-3 flex items-start justify-between gap-4">
        <p className="max-w-[46%]">
          <span className="block font-mono text-[0.62rem] tracking-[0.14em] text-leaf uppercase">You stay</span>
          <span className="mt-1 block font-serif font-semibold leading-snug text-indigo">{stay.place}</span>
        </p>
        <p className="max-w-[46%] text-right">
          <span className="block font-mono text-[0.62rem] tracking-[0.14em] text-brand-deep uppercase">You build</span>
          <span className="mt-1 block font-serif font-semibold leading-snug text-indigo">{venue.place}</span>
        </p>
      </div>
    </div>
  );
}

/** Stay, travel and fee details for teams heading to the offline final. */
export function Travel() {
  const { stay, venue, fee } = logistics;
  return (
    <section id="travel" aria-labelledby="travel-title" className="section-y relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-40 -z-10 h-[32rem] w-[40rem] max-w-full -translate-y-1/2 rounded-full bg-leaf/[0.05] blur-[140px]"
      />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="travel-title"
            index="07"
            eyebrow="Travel, stay & fees"
            lines={['Getting here,', <span className="text-brand">sorted.</span>]}
          />
          <p className="max-w-sm text-ink-muted lg:pb-3">
            Made the shortlist? Here’s where you’ll stay, how you’ll reach the venue, and the one fee to
            pay before the offline final on {hackathonInfo.dateShort}.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="rounded-(--radius-panel) border border-line bg-card p-5 xs:p-6 shadow-(--shadow-card) md:p-8">
            <RouteLine />

            <div className="mt-8 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 sm:gap-6">
              <div>
                <h3 className="flex items-center gap-3 font-display text-2xl text-indigo">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-leaf/10 text-leaf">
                    <Icon name="bed" size={18} />
                  </span>
                  Stay at {stay.placeShort}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-muted">
                  {stay.eligibility} will be given accommodation at {stay.place}.
                </p>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 rounded-xl border border-line bg-paper/60 px-3.5 py-2.5 text-sm text-ink-muted">
                  <span className="font-serif text-base font-semibold text-brand-deep">
                    {stay.costQualifier} {stay.cost}
                  </span>
                  stay charges, paid by the team
                </p>
              </div>

              <div>
                <h3 className="flex items-center gap-3 font-display text-2xl text-indigo">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Icon name="bus" size={18} />
                  </span>
                  Shuttle to the venue
                </h3>
                <p className="mt-4 leading-relaxed text-ink-muted">
                  Transport is arranged by {venue.place}: pick-up from {stay.placeShort} to the venue and drop
                  back, so there’s no commute for you to plan.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Fee "ticket" — plum stock with a perforated tear line */}
          <Reveal i={1} className="flex">
            <article className="theme-plum relative isolate flex w-full flex-col overflow-hidden rounded-(--radius-panel) shadow-(--shadow-card)">

              <div className="p-5 xs:p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow flex items-center gap-2 whitespace-nowrap text-ink-muted">
                    <Icon name="ticket" size={16} className="text-brand-deep" />
                    Participation fee
                  </p>
                  <span className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.12em] whitespace-nowrap text-brand-deep uppercase">
                    Shortlisted only
                  </span>
                </div>
                <p className="mt-6 flex items-baseline gap-3">
                  <span className="text-display text-[clamp(3.5rem,9vw,5.5rem)] leading-none">{fee.amount}</span>
                  <span className="font-serif text-lg text-ink-muted">{fee.per}</span>
                </p>
              </div>

              {/* Tear line: notches are cut in the page colour */}
              <div aria-hidden="true" className="relative h-0 border-t border-dashed border-line-strong">
                <span className="absolute -top-3 -left-3 size-6 rounded-full" style={{ background: 'var(--page-bg)' }} />
                <span className="absolute -top-3 -right-3 size-6 rounded-full" style={{ background: 'var(--page-bg)' }} />
              </div>

              <div className="flex flex-1 flex-col p-5 xs:p-6 md:p-8">
                <ol className="space-y-3.5">
                  {fee.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 leading-relaxed text-ink-muted">
                      <span className="mt-0.5 w-6 shrink-0 font-mono text-xs text-brand-deep">{String(i + 1).padStart(2, '0')}</span>
                      {s}
                    </li>
                  ))}
                </ol>
                <div className="mt-auto pt-8">
                  <a
                    href={hackathonInfo.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#0a7d43] px-5 py-3.5 font-semibold text-white shadow-[0_10px_24px_-12px_rgb(0_122_63/0.7)] transition-colors hover:bg-[#086a39]"
                  >
                    <Icon name="whatsapp" size={18} />
                    Get the form on WhatsApp
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
