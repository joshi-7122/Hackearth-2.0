import { PartnerMail } from '@/components/PartnerMail';
import { SponsorGrid } from '@/components/SponsorGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Sponsors() {
  return (
    <section id="sponsors" aria-labelledby="sponsors-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="sponsors-title"
            index="11"
            eyebrow="Community partners"
            lines={['Built with', <span className="text-brand">our community.</span>]}
          />
          <div className="lg:pb-3">
            <PartnerMail />
          </div>
        </div>

        <div className="mt-14">
          <SponsorGrid />
        </div>
      </div>
    </section>
  );
}
