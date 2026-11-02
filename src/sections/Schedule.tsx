import { JourneyMap } from '@/components/JourneyMap';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Schedule() {
  return (
    <section id="timeline" aria-labelledby="timeline-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="timeline-title"
          index="05"
          eyebrow="Timeline"
          align="center"
          lines={['Two rounds.', <span className="text-brand">One final.</span>]}
          description="Scroll to travel the route — or tap a checkpoint to jump. Round 1 runs online on Unstop; shortlisted teams meet for the offline final at Galgotias University. All times are IST."
        />
        <div className="mt-16 md:mt-24">
          <JourneyMap />
        </div>
      </div>
    </section>
  );
}
