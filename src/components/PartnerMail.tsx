import { useEffect, useRef, useState } from 'react';
import { hackathonInfo } from '@/data/hackathon';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { isPlaceholder } from '@/lib/placeholder';

const SUBJECT = 'WIE HackEarth 2026 partnership';
const BODY = `Hi IEEE GU SB team,

We'd like to partner with WIE HackEarth 2026.

Organisation:
Contact person:
Phone:
How we'd like to partner (sponsor / community / in-kind):

Looking forward to hearing from you.`;

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API blocked (insecure context / permissions) — legacy fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

/**
 * "Partner with us": opens the visitor's mail app with a drafted email to the
 * organizers, then offers webmail and copy fallbacks in case no app is set up.
 */
export function PartnerMail() {
  const email = hackathonInfo.contactEmail;
  const usable = !isPlaceholder(email) && email.includes('@');
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  if (!usable) {
    return <Button href="#contact" icon="arrowUpRight">Partner with us</Button>;
  }

  const su = encodeURIComponent(SUBJECT);
  const body = encodeURIComponent(BODY);
  const to = encodeURIComponent(email);
  const mailto = `mailto:${email}?subject=${su}&body=${body}`;
  const webmail = [
    { label: 'Gmail', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${body}` },
    { label: 'Outlook', href: `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${su}&body=${body}` },
  ];

  return (
    <div ref={rootRef} className="relative inline-flex">
      <Button href={mailto} icon="arrowUpRight" onClick={() => setOpen(true)}>
        Partner with us
      </Button>

      {open && (
        <div
          role="dialog"
          aria-label="Email the organizers"
          className="absolute top-full left-0 z-20 mt-3 w-[min(22rem,calc(100vw-2rem))] animate-[panel-in_420ms_var(--ease-out-expo)_both] rounded-(--radius-card) border border-line-strong bg-card p-5 shadow-[0_30px_60px_-30px_rgb(48_21_87/0.5)] lg:right-0 lg:left-auto"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="flex items-center gap-2.5 font-serif font-semibold text-indigo">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                <Icon name="mail" size={16} />
              </span>
              Opening your mail app…
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid size-8 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-indigo/[0.06] hover:text-ink"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            We’ve drafted an email to <span className="font-semibold break-all text-indigo">{email}</span>. Nothing
            opened? Write from your browser instead:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {webmail.map((w) => (
              <a
                key={w.label}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-sm font-semibold text-indigo transition-colors hover:border-brand/50 hover:text-brand-deep"
              >
                {w.label}
                <Icon name="arrowUpRight" size={14} strokeWidth={2} />
              </a>
            ))}
            <button
              type="button"
              onClick={async () => setCopied(await copyText(email))}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-sm font-semibold text-indigo transition-colors hover:border-brand/50 hover:text-brand-deep"
            >
              <Icon name={copied ? 'check' : 'copy'} size={14} strokeWidth={2} className={copied ? 'text-leaf' : ''} />
              {copied ? 'Copied' : 'Copy address'}
            </button>
          </div>
          <p aria-live="polite" className="sr-only">
            {copied ? 'Email address copied' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
