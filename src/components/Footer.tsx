import { hackathonInfo, navItems, organizers, socialLinks } from '@/data/hackathon';
import { resolveEmail, resolveHref } from '@/lib/placeholder';
import { SocialLinks } from './SocialLinks';
import { Icon } from './ui/Icon';
import { LogoMark } from './ui/Logo';
import { Txt } from './ui/Txt';

const legal = [
  { label: 'Privacy', url: '[PRIVACY POLICY URL]' },
  { label: 'Terms', url: '[TERMS URL]' },
  { label: 'Code of conduct', url: '[CODE OF CONDUCT URL]' },
];

function FooterLink({ label, url }: { label: string; url: string }) {
  const href = url.startsWith('#') ? url : resolveHref(url);
  if (!href) {
    return (
      <span className="text-ink-subtle" title={`${label}: ${url}`}>
        {label}
      </span>
    );
  }
  return (
    <a href={href} className="text-ink-muted transition-colors hover:text-ink">
      {label}
    </a>
  );
}

export function Footer() {
  const info = hackathonInfo;
  const mail = resolveEmail(info.contactEmail);
  const tel = `tel:${info.contactPhone.number.replace(/\s/g, '')}`;
  const year = new Date().getFullYear();
  const organizingBodies = organizers.filter((o) => o.role !== 'Affiliation');

  return (
    <footer id="contact" className="theme-plum relative overflow-hidden border-t border-line pt-20">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="inline-flex items-center gap-3">
              <LogoMark size={36} />
              <span className="font-display text-2xl text-ink">
                <span className="text-blush">{info.prefix}</span> {info.name} {info.edition}
              </span>
            </span>
            <p className="mt-5 font-display text-2xl text-ink">
              Build. Break. <span className="text-blush">Rebuild.</span>
            </p>
            <p className="mt-3 max-w-sm leading-relaxed text-ink-muted">{info.theme}</p>
            <SocialLinks links={socialLinks} className="mt-6" />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-[0.8fr_1.1fr_1.5fr] md:col-span-7">
            <div>
              <h2 className="eyebrow">Event</h2>
              <ul className="mt-5 space-y-3">
                {navItems.map((n) => (
                  <li key={n.id}>
                    <FooterLink label={n.label} url={`#${n.id}`} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow">Organized by</h2>
              <ul className="mt-5 space-y-3 text-ink-muted">
                {organizingBodies.map((o) => (
                  <li key={o.name} className="leading-snug">
                    {o.name}
                    <span className="block text-sm text-ink-subtle">{o.role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow">Contact</h2>
              <ul className="mt-5 space-y-4 text-ink-muted">
                <li className="flex gap-2.5">
                  <Icon name="mail" size={16} className="mt-1 shrink-0 text-blush" />
                  {mail ? (
                    <a href={mail} className="text-sm break-words transition-colors hover:text-ink [overflow-wrap:anywhere]">
                      {info.contactEmail}
                    </a>
                  ) : (
                    <Txt>{info.contactEmail}</Txt>
                  )}
                </li>
                <li className="flex gap-2.5">
                  <Icon name="phone" size={16} className="mt-1 shrink-0 text-blush" />
                  <span>
                    <a href={tel} className="transition-colors hover:text-ink">
                      {info.contactPhone.number}
                    </a>
                    <span className="block text-sm text-ink-subtle">
                      {info.contactPhone.name} · {info.contactPhone.role}
                    </span>
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <Icon name="pin" size={16} className="mt-1 shrink-0 text-blush" />
                  <address className="text-sm leading-relaxed not-italic">{info.address}</address>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-line py-6 text-sm text-ink-subtle sm:flex-row sm:items-center">
          <p>
            © {year} {info.prefix} {info.name} {info.edition} · IEEE Galgotias University Student Branch
          </p>
          <ul className="flex gap-5">
            {legal.map((l) => (
              <li key={l.label}>
                <FooterLink {...l} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.18em] text-center font-display text-[clamp(4rem,18vw,18rem)] leading-[0.85] text-transparent select-none [-webkit-text-stroke:1.2px_rgb(246_201_208/0.18)]"
      >
        HackEarth
      </p>
    </footer>
  );
}
