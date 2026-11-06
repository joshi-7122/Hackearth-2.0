import { hackathonInfo } from '@/data/hackathon';
import { eligibility, importantNotes, rules } from '@/data/rules';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Official eligibility, rules and important information. */
export function Rules() {
  return (
    <section id="rules" aria-labelledby="rules-title" className="section-y relative border-t border-line bg-paper-2">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="rules-title"
            index="06"
            eyebrow="Eligibility & rules"
            lines={['Play fair.', <span className="text-brand">Build boldly.</span>]}
          />
          <Reveal className="flex w-full lg:max-w-md items-start gap-3 rounded-(--radius-card) border border-brand/30 bg-brand/[0.06] p-3.5 xs:p-4 lg:mb-2">
            <Icon name="users" size={20} className="mt-0.5 shrink-0 text-brand" />
            <p className="text-ink">
              <strong className="font-semibold text-indigo">Every team must have at least one female member.</strong>{' '}
              Teams have 2–4 members.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-(--radius-panel) border border-line bg-card p-5 xs:p-6 shadow-(--shadow-card) md:p-8">
            <h3 className="flex items-center gap-3 font-display text-2xl text-indigo">
              <span className="grid size-10 place-items-center rounded-full bg-leaf/10 text-leaf">
                <Icon name="check" size={18} strokeWidth={2.2} />
              </span>
              Who can participate
            </h3>
            <ul className="mt-6 space-y-3.5">
              {eligibility.map((e) => (
                <li key={e} className="flex gap-3 leading-relaxed text-ink-muted">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-leaf" />
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal i={1} className="rounded-(--radius-panel) border border-line bg-card p-5 xs:p-6 shadow-(--shadow-card) md:p-8">
            <h3 className="flex items-center gap-3 font-display text-2xl text-indigo">
              <span className="grid size-10 place-items-center rounded-full bg-brand/10 text-brand">
                <Icon name="shield" size={18} />
              </span>
              Rules
            </h3>
            <ol className="mt-6 space-y-3.5">
              {rules.map((r, i) => (
                <li key={r} className="flex gap-3 leading-relaxed text-ink-muted">
                  <span className="mt-0.5 w-6 shrink-0 font-mono text-xs text-brand-deep">{String(i + 1).padStart(2, '0')}</span>
                  {r}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="mt-5 grid gap-6 rounded-(--radius-panel) border border-line bg-card p-5 xs:p-6 shadow-(--shadow-card) md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="eyebrow text-brand-deep">Important</p>
            <ul className="mt-4 space-y-2.5">
              {importantNotes.map((n) => (
                <li key={n} className="flex gap-3 leading-relaxed text-ink-muted">
                  <Icon name="spark" size={16} className="mt-1 shrink-0 text-brand" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:flex-col lg:flex-row">
            <a
              href={hackathonInfo.pptTemplateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-5 xs:px-6 py-3.5 font-semibold text-brand-deep shadow-xs transition-colors hover:bg-brand hover:text-on-brand"
            >
              <Icon name="download" size={17} />
              Download PPT Template
              <Icon name="arrowUpRight" size={14} />
            </a>
            <a
              href={hackathonInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#0a7d43] px-5 xs:px-6 py-3.5 font-semibold text-white shadow-[0_10px_24px_-12px_rgb(0_122_63/0.7)] transition-colors hover:bg-[#086a39]"
            >
              <Icon name="whatsapp" size={18} />
              Join the WhatsApp group
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.7rem] tracking-wide uppercase">Mandatory</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
