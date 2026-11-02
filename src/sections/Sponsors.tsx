import { hackathonInfo } from '@/data/hackathon';
import { SponsorGrid } from '@/components/SponsorGrid';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { resolveEmail } from '@/lib/placeholder';

export function Sponsors() {
  const mail = resolveEmail(hackathonInfo.contactEmail);
  return (
    <section id="sponsors" aria-labelledby="sponsors-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="sponsors-title"
            index="10"
            eyebrow="Community partners"
            lines={['Built with', <span className="text-brand">our community.</span>]}
          />
          <div className="lg:pb-3">
            <Button
              href={mail ? `${mail}?subject=WIE%20HackEarth%202026%20partnership` : '#contact'}
              icon="arrowUpRight"
            >
              Partner with us
            </Button>
          </div>
        </div>

        <div className="mt-14">
          <SponsorGrid />
        </div>
      </div>
    </section>
  );
}
