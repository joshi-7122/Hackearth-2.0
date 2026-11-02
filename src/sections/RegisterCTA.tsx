import { hackathonInfo } from '@/data/hackathon';
import { BinaryField } from '@/components/BinaryField';
import { Button } from '@/components/ui/Button';
import { Leaf, Swoosh } from '@/components/ui/Decor';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Txt } from '@/components/ui/Txt';
import { useReveal } from '@/hooks/useReveal';
import { resolveHref } from '@/lib/placeholder';
import { useRegistrationStatus } from '@/lib/registration';

export function RegisterCTA() {
  const info = hackathonInfo;
  const { registration } = info;
  const href = resolveHref(registration.url);
  const reg = useRegistrationStatus();
  const headRef = useReveal<HTMLHeadingElement>();

  return (
    <section id="register" aria-labelledby="register-title" className="theme-maroon glitch-host relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_240_247/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_240_247/0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_75%)]"
      />
      {/* Edge vignette (deep maroon) instead of a blurred glow behind the words */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_80%_at_50%_45%,transparent_55%,rgb(30_3_16/0.55)_100%)]" />
      <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 z-0 opacity-70 motion-reduce:opacity-40" />
      {/* Fade in from the page background so the section doesn't start with a hard edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-56 md:h-72"
        style={{ background: 'linear-gradient(to bottom, var(--page-bg) 0%, color-mix(in srgb, var(--page-bg) 70%, transparent) 35%, transparent 100%)' }}
      />
      <BinaryField
        className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_35%,#000_75%)]"
        color="255, 128, 182"
        maxAlpha={0.42}
        density={0.45}
      />
      <Swoosh className="absolute -top-10 -right-10 -z-10 w-80 opacity-80" />
      <Swoosh flip className="absolute -bottom-16 -left-10 -z-10 w-72 rotate-180 opacity-80" />

      <div className="container-x relative z-10 flex flex-col items-center pt-40 pb-28 text-center [text-rendering:geometricPrecision] md:pt-52 md:pb-36">
        <Reveal as="p" className="eyebrow inline-flex items-center gap-3 text-ink-muted">
          <Leaf className="hidden w-5 sm:block" />
          {info.strapline}
        </Reveal>

        <h2 ref={headRef} id="register-title" className="text-display mt-8 text-[clamp(2.8rem,8vw,7rem)] leading-[0.98]">
          <span className="line-mask" style={{ ['--i' as string]: 0 }}>
            <span>
              <span className="glitch-x text-white motion-reduce:!animate-none" data-text="Ready to reimagine">
                Ready to reimagine
              </span>
            </span>
          </span>
          <span className="line-mask" style={{ ['--i' as string]: 1 }}>
            <span>
              <span className="glitch-x delay text-brand motion-reduce:!animate-none" data-text="technology?">
                technology?
              </span>
            </span>
          </span>
        </h2>

        <Reveal as="p" i={2} className="mt-8 font-display text-[clamp(1.3rem,2.4vw,1.9rem)] text-white">
          Bring your team. Bring your ideas. <span className="text-brand">Build for impact.</span>
        </Reveal>
        <Reveal as="p" i={3} className="mt-4 max-w-xl text-lg font-medium text-ink-muted">
          {reg.state === 'closed'
            ? 'Registrations for WIE HackEarth 2.0 have closed. Shortlisted teams will hear from the organizers directly.'
            : `Register on ${registration.platform} and take your idea from concept to creation. Registration closes ${registration.deadline}.`}
        </Reveal>

        <Reveal i={4} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          {reg.state !== 'closed' &&
            (href ? (
              <Button href={href} external size="lg">
                Register on Unstop
              </Button>
            ) : (
              <span className="inline-flex h-13 flex-col items-center justify-center rounded-full bg-brand px-8 font-semibold text-on-brand">
                Register on Unstop
                <span className="text-[0.7rem] font-normal opacity-80">
                  <Txt>{registration.url}</Txt>
                </span>
              </span>
            ))}
          <a
            href={info.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-13 items-center gap-2.5 rounded-full border border-line-strong bg-white/5 px-7 font-semibold text-ink transition-colors hover:border-[#25d366] hover:text-[#7ff0a8]"
          >
            <Icon name="whatsapp" size={18} />
            Join the WhatsApp group
          </a>
        </Reveal>
        <Reveal as="p" i={5} className="mt-4 text-sm text-ink-subtle">
          Joining the WhatsApp group is mandatory for all participants.
        </Reveal>
      </div>
    </section>
  );
}
