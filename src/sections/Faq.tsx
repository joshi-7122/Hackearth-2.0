import { hackathonInfo } from '@/data/hackathon';
import { FAQ } from '@/components/FAQ';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Txt } from '@/components/ui/Txt';
import { resolveEmail } from '@/lib/placeholder';

export function Faq() {
  const mail = resolveEmail(hackathonInfo.contactEmail);
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y relative border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <SectionHeading
              id="faq-title"
              size="md"
              index="12"
              eyebrow="FAQ"
              lines={['Questions,', <span className="text-brand">answered.</span>]}
            />
            <Reveal className="mt-8 sm:mt-10 rounded-(--radius-card) border border-line bg-card p-4 xs:p-6">
              <p className="font-medium text-ink">Still stuck?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Email the organizing team, or follow updates in the official WhatsApp group (mandatory for participants).
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                <li className="flex items-center gap-3">
                  <Icon name="mail" size={16} className="text-brand" />
                  {mail ? (
                    <a href={mail} className="text-ink underline-offset-4 hover:underline">
                      {hackathonInfo.contactEmail}
                    </a>
                  ) : (
                    <Txt>{hackathonInfo.contactEmail}</Txt>
                  )}
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="whatsapp" size={16} className="text-leaf" />
                  <a href={hackathonInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-leaf underline-offset-4 hover:underline">
                    Join the WhatsApp group
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">
          <FAQ />
        </div>
      </div>
    </section>
  );
}
