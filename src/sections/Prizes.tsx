import { hackathonInfo } from '@/data/hackathon';
import { prizes, specialAwards } from '@/data/prizes';
import { PrizeCard } from '@/components/PrizeCard';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Txt } from '@/components/ui/Txt';
import { cn } from '@/lib/cn';

// Podium order on desktop: 2nd · 1st · 3rd
const podiumOrder: Record<number, string> = { 1: 'lg:order-2', 2: 'lg:order-1', 3: 'lg:order-3' };

export function Prizes() {
  return (
    <section id="prizes" aria-labelledby="prizes-title" className="section-y relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[40rem] w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-brand/[0.05] blur-[140px]"
      />
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="prizes-title"
            index="07"
            eyebrow="Prizes"
            lines={[
              <span>
                <span className="mr-3 align-middle font-serif text-[0.32em] font-semibold tracking-normal text-ink-muted uppercase">
                  {hackathonInfo.prizePoolQualifier}
                </span>
                <Txt>{hackathonInfo.prizePool}</Txt>
              </span>,
              <span className="text-brand">on the table.</span>,
            ]}
          />
          <p className="max-w-sm text-ink-muted lg:pb-3">
            Compete for a prize pool of up to ₹1 lakh at the final offline hackathon — plus exciting goodies
            for the Top 20 performers. Place-wise amounts are yet to be announced.
          </p>
        </div>

        <div className="mt-16 grid items-end gap-4 lg:grid-cols-3 lg:gap-5">
          {prizes.map((p, i) => (
            <Reveal key={p.rank} i={i} className={cn(podiumOrder[p.rank])}>
              <PrizeCard prize={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <p className="eyebrow">Perks & awards</p>
          <ul className="mt-6 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {specialAwards.map((a, i) => (
              <Reveal
                as="li"
                key={a.title}
                i={i % 3}
                className="group flex gap-3.5 xs:gap-4 border-r border-b border-line p-4 xs:p-6 transition-colors duration-500 hover:bg-indigo/[0.025] md:p-7"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-ink-muted transition-colors duration-500 group-hover:border-brand/50 group-hover:text-brand">
                  <Icon name={a.icon} size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-serif text-lg font-semibold text-indigo">{a.title}</h3>
                    {a.amount && (
                      <span className="font-serif text-sm font-semibold text-brand-deep">
                        <Txt>{a.amount}</Txt>
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{a.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
