import { useRef } from 'react';
import { hackathonInfo } from '@/data/hackathon';
import { Figure3D } from '@/components/Figure3D';
import { DotGlobe } from '@/components/DotGlobe';
import { BinaryRain } from '@/components/BinaryRain';
import { Button } from '@/components/ui/Button';
import { Dots, Leaf } from '@/components/ui/Decor';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Txt } from '@/components/ui/Txt';
import { cn } from '@/lib/cn';
import { resolveHref } from '@/lib/placeholder';

export function Hero({ ready }: { ready: boolean }) {
  const info = hackathonInfo;
  const registerHref = resolveHref(info.registration.url) ?? '#register';
  const copyRef = useRef<HTMLDivElement>(null);

  const facts: { icon: IconName; label: string; value: string; note?: string }[] = [
    { icon: 'calendar', label: 'Offline final', value: info.date, note: `${info.durationLabel} · ${info.startTime}` },
    { icon: 'pin', label: 'Arena', value: info.venueShort, note: 'Greater Noida' },
    { icon: 'users', label: 'Teams', value: info.teamSize, note: 'At least one female member' },
    { icon: 'trophy', label: 'Prize pool', value: `${info.prizePoolQualifier} ${info.prizePool}`, note: 'Goodies for the Top 20' },
  ];

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className={cn('relative isolate pt-(--nav-h)', ready && 'is-in hero-ready')}
    >
      {/* Binary rain — fades out around the copy column via `avoid` */}
      <BinaryRain avoid={copyRef} className="absolute inset-0 -z-10 size-full" />

      {/* Backdrop (washes, arcs, dots) lives in HeroBackdrop so it flows into the organizers band. */}
      {/* Digital dot-matrix Earth, half off the right edge (desktop) */}
      <DotGlobe className="absolute top-[calc(var(--nav-h)+0.5rem)] right-[clamp(-22rem,-19vw,-14rem)] -z-10 hidden size-[min(46rem,82vh)] xl:block" />

      {/* Layout layer ignores the pointer so the globe underneath can be dragged; the copy re-enables it. */}
      <div className="container-x pointer-events-none grid items-center gap-10 pt-10 pb-12 md:pt-14 lg:grid-cols-12 lg:gap-6 lg:pt-12 lg:pb-14">
        {/* Copy */}
        <div ref={copyRef} className="pointer-events-auto min-w-0 lg:col-span-7">

          <h1 id="hero-title">
            <span className="sr-only">
              {info.prefix} {info.name} {info.edition} {info.year} — {info.tagline}
            </span>
            {/* Official IEEE Women in Engineering logo in place of the "WIE" text */}
            <span aria-hidden="true" className="line-mask mb-1 md:mb-2">
              <span>
                <img
                  src="/logos/wie-wordmark.webp"
                  alt=""
                  width={629}
                  height={487}
                  className="h-[clamp(5.5rem,10vw,8.75rem)] w-auto dark:hidden"
                  fetchPriority="high"
                />
                <img
                  src="/logos/wie-wordmark-dark.webp"
                  alt=""
                  width={629}
                  height={487}
                  className="hidden h-[clamp(5.5rem,10vw,8.75rem)] w-auto dark:block"
                />
              </span>
            </span>
            <span aria-hidden="true" className="line-mask" style={{ ['--i' as string]: 1 }}>
              <span className="text-display relative inline-block pr-[0.55em] text-[clamp(2.5rem,12vw,4.5rem)] leading-[0.95] lg:text-[clamp(3.3rem,8vw,7.75rem)]">
                {info.name}
                <Leaf className="absolute top-[-0.05em] right-0 w-[0.62em]" />
              </span>
            </span>
            <span aria-hidden="true" className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2" style={{ ['--i' as string]: 2 }}>
              <span className="line-mask" style={{ ['--i' as string]: 2 }}>
                <span className="text-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-none">{info.edition}</span>
              </span>
              <span
                data-reveal=""
                style={{ ['--i' as string]: 3 }}
                className="relative inline-grid place-items-center px-6 py-1.5"
              >
                <img src="/brand/brush.webp" alt="" className="absolute inset-0 size-full object-fill" />
                <span className="text-display relative text-[clamp(1.9rem,3.6vw,3.3rem)] leading-none !text-[#fcf7eb]">
                  {info.year}
                </span>
              </span>
            </span>
          </h1>

          <p
            data-reveal=""
            style={{ ['--i' as string]: 4 }}
            aria-hidden="true"
            className="mt-7 font-serif text-[clamp(1.35rem,2.4vw,1.85rem)] font-semibold tracking-[-0.01em] text-indigo"
          >
            Build.{' '}
            <span className="glitch text-ink-muted" data-text="Break.">
              Break.
            </span>{' '}
            <span className="text-brand">Rebuild.</span>
          </p>

          <p
            data-reveal=""
            style={{ ['--i' as string]: 5 }}
            className="mt-3 max-w-[36rem] text-[1.05rem] leading-relaxed text-ink-muted md:text-lg"
          >
            {info.description}
          </p>

          <div
            data-reveal=""
            style={{ ['--i' as string]: 6 }}
            className="mt-8 flex flex-col gap-3 xs:flex-row"
          >
            <Button href={registerHref} external={registerHref.startsWith('http')} size="lg" className="w-full xs:w-auto">
              Register now
            </Button>
            <Button href="#about" variant="secondary" size="lg" className="w-full xs:w-auto">
              Explore hackathon
            </Button>
          </div>
          <p
            data-reveal=""
            style={{ ['--i' as string]: 7 }}
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink-muted"
          >
            <Icon name="clock" size={15} className="text-brand" />
            <span>
              Register on{' '}
              <a
                href={registerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-deep underline-offset-4 hover:underline"
              >
                {info.registration.platform}
              </a>{' '}
              by {info.registration.deadline}
            </span>
          </p>
        </div>

        {/* Visual: globe + coder illustration (from the deck) */}
        {/* 3D illustration (tilt, float, glow, rising code) */}
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5]">
            {/* Smaller screens: globe sits behind the illustration */}
            <DotGlobe className="absolute inset-x-[6%] top-[2%] aspect-square xl:hidden" />
            <div aria-hidden="true" className="absolute inset-[10%] hidden rounded-full bg-[radial-gradient(circle,rgb(246_201_208/0.7),transparent_70%)] xl:block" />
            <Figure3D
              alt="Illustration of a young woman coding on a laptop, sitting on books labelled Build, Innovate, Lead"
              className="absolute bottom-0 left-1/2 aspect-[625/803] h-[92%] -translate-x-1/2 lg:left-[44%]"
            />
            <Dots className="absolute right-[6%] bottom-[6%] h-12 w-20 opacity-70" />
          </div>
        </div>
      </div>

      {/* Spec bar */}
      <div className="container-x">
        <dl
          data-reveal=""
          style={{ ['--i' as string]: 7 }}
          className="grid grid-cols-2 overflow-hidden rounded-(--radius-card) border border-line bg-card/85 shadow-(--shadow-card) backdrop-blur-md lg:grid-cols-4"
        >
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={cn(
                'flex items-start gap-3 p-4 md:p-5',
                i % 2 === 1 && 'border-l border-line',
                i >= 2 && 'border-t border-line lg:border-t-0',
                i === 2 && 'lg:border-l',
              )}
            >
              <Icon name={f.icon} size={18} className="mt-0.5 shrink-0 text-brand" />
              <div className="min-w-0 text-left">
                <dt className="eyebrow text-[0.62rem]">{f.label}</dt>
                <dd className="mt-1 text-[0.95rem] font-semibold text-indigo md:text-base">
                  <Txt>{f.value}</Txt>
                  {f.note && <span className="mt-0.5 block text-xs font-normal text-ink-muted">{f.note}</span>}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <div aria-hidden="true" className="h-12 md:h-16" />
    </section>
  );
}
