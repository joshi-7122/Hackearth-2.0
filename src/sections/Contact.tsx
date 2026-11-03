import { contactGroups, telHref } from '@/data/contacts';
import { hackathonInfo } from '@/data/hackathon';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Txt } from '@/components/ui/Txt';
import { resolveEmail } from '@/lib/placeholder';

/** Organizing-team contacts, one panel per IEEE branch / society. */
export function Contact() {
  const mail = resolveEmail(hackathonInfo.contactEmail);
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative border-t border-line bg-paper-2">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="contact-title"
            index="13"
            eyebrow="Contact us"
            lines={['Talk to', <span className="text-brand">the team.</span>]}
          />
          <Reveal className="max-w-sm lg:pb-3">
            <p className="text-ink-muted">
              Questions about registration, the PPT round or the offline final? Call the organizers directly, or write
              to us.
            </p>
            <p className="mt-4 flex items-center gap-2.5 text-sm">
              <Icon name="mail" size={16} className="shrink-0 text-brand" />
              {mail ? (
                <a href={mail} className="font-semibold text-indigo underline-offset-4 [overflow-wrap:anywhere] hover:text-brand-deep hover:underline">
                  {hackathonInfo.contactEmail}
                </a>
              ) : (
                <Txt>{hackathonInfo.contactEmail}</Txt>
              )}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {contactGroups.map((g, gi) => (
            <Reveal
              as="article"
              key={g.name}
              i={gi}
              className="flex flex-col rounded-(--radius-panel) border border-line bg-card p-5 xs:p-6 shadow-(--shadow-card) md:p-7"
            >
              <header className="flex items-center gap-4">
                {/* Logo artwork is dark — keep its tile light in dark mode */}
                <span className="theme-light grid h-14 w-20 shrink-0 place-items-center rounded-xl border border-line bg-card px-2">
                  <img
                    src={g.logo}
                    alt=""
                    style={{ height: g.logoHeight }}
                    className="w-auto max-w-full object-contain mix-blend-multiply"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl leading-tight text-indigo xs:text-2xl">
                    {g.short}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-ink-muted">
                    {g.name} · {g.role}
                  </p>
                </div>
              </header>

              <ul className="mt-6 divide-y divide-line border-t border-line">
                {g.people.map((p) => (
                  <li key={p.name} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 py-4">
                    <div className="min-w-0">
                      <p className="font-serif font-semibold text-indigo">{p.name}</p>
                      <p className="text-sm text-ink-muted">{p.role}</p>
                    </div>
                    <a
                      href={telHref(p.phone)}
                      aria-label={`Call ${p.name}, ${p.role}, on ${p.phone}`}
                      className="group/tel inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-line-strong px-3.5 text-sm font-semibold whitespace-nowrap text-indigo tabular-nums transition-colors duration-300 hover:border-brand/50 hover:bg-brand/[0.06] hover:text-brand-deep"
                    >
                      <Icon
                        name="phone"
                        size={14}
                        strokeWidth={2}
                        className="text-brand transition-transform duration-500 ease-(--ease-out-expo) group-hover/tel:-rotate-12"
                      />
                      {p.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
