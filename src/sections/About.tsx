import { hackathonInfo } from '@/data/hackathon';
import { Countdown } from '@/components/Countdown';
import { Stats } from '@/components/Stats';
import { Dots } from '@/components/ui/Decor';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Copy adapted from the official deck ("WIE HackEarth 2.0 2026" slide). */
const pillars = [
  {
    q: 'The initiative',
    a: 'A pan-India hackathon organized by the IEEE Women in Engineering (WIE) Affinity Group under the IEEE Galgotias University Student Branch, with the IEEE Computational Intelligence Society (CIS) as co-organizer and in collaboration with Medhasphere, the Departmental Club of AI/ML.',
  },
  {
    q: 'The theme',
    a: 'Students and innovators come together to develop technology-driven solutions for real-world challenges — with meaningful social and environmental impact.',
  },
  {
    q: 'What you’ll do',
    a: 'Transform ideas into practical solutions while demonstrating innovation, technical skill, creativity, teamwork and human-centred problem-solving.',
  },
  {
    q: 'Our vision',
    a: 'An inclusive innovation ecosystem where women move beyond participation to leadership — shaping a more sustainable, intelligent and equitable future.',
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative">
      <Dots className="absolute top-24 right-[4%] hidden h-16 w-28 opacity-50 md:block" />
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              id="about-title"
              index="01"
              eyebrow="About"
              lines={['Reimagining', <span className="text-brand">technology.</span>]}
            />
            <Reveal className="mt-10">
              <Countdown />
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-12">
            <Reveal as="blockquote" className="relative border-l-2 border-brand pl-4 sm:pl-6 md:pl-8">
              <p className="eyebrow">Theme</p>
              <p className="mt-3 font-display text-[clamp(1.35rem,3.8vw,2.5rem)] leading-[1.15] text-indigo">
                “{hackathonInfo.theme}”
              </p>
            </Reveal>

            <dl className="mt-10 sm:mt-14 grid gap-x-10 gap-y-8 sm:gap-y-10 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.q} i={i} className="border-t border-line pt-5">
                  <dt className="eyebrow flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
                    {p.q}
                  </dt>
                  <dd className="mt-3 leading-relaxed text-ink-muted">{p.a}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <p className="eyebrow mb-6">At a glance</p>
          <Stats />
        </div>
      </div>
    </section>
  );
}
