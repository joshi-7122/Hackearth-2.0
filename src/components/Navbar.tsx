import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { hackathonInfo, navItems } from '@/data/hackathon';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { cn } from '@/lib/cn';
import { resolveHref } from '@/lib/placeholder';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

/** 0 → 1 page scroll progress, rAF-throttled. */
function usePageProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return p;
}

export function Navbar() {
  const info = hackathonInfo;
  const scrolled = useScrolled(24);
  const progress = usePageProgress();
  const ids = useMemo(() => [...navItems.map((n) => n.id), 'register'], []);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const registerHref = resolveHref(info.registration.url) ?? '#register';
  const external = registerHref.startsWith('http');

  // Sliding highlight: follows the hovered link, rests on the active one.
  const target = hovered ?? active;
  const measure = useCallback(() => {
    const el = target ? linkRefs.current[target] : null;
    const list = listRef.current;
    if (!el || !list) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setPill({ left: a.left - b.left, width: a.width, visible: true });
  }, [target]);
  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Lock scroll + Esc to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 64rem)');
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-[84rem] px-3 sm:px-5 lg:px-6">
      {/* One bar: brand on the left, navigation on the right */}
      <div
        className={cn(
          'relative flex h-[4.5rem] items-center justify-between gap-3 rounded-full border pr-2 pl-2 transition-[background-color,box-shadow,border-color] duration-500 ease-(--ease-out-expo) sm:pl-2.5 xl:h-20',
          scrolled || open
            ? 'border-line-strong bg-card/85 shadow-[0_18px_40px_-22px_rgb(48_21_87/0.45)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-line bg-card/60 shadow-[0_10px_30px_-24px_rgb(48_21_87/0.35)] backdrop-blur-md',
        )}
      >
        <a
          href="#top"
          aria-label={`${info.prefix} ${info.name} ${info.edition} — back to top`}
          className="group flex shrink-0 items-center gap-2 xs:gap-2.5"
        >
          <img
            src="/brand/event-logo.webp"
            srcSet="/brand/event-logo.webp 1x, /brand/event-logo@2x.webp 2x"
            alt=""
            width={64}
            height={64}
            className="size-9.5 shrink-0 rounded-full xs:size-11 sm:size-14 lg:size-14 xl:size-[4.25rem] shadow-[0_8px_22px_-6px_rgb(48_21_87/0.55)] ring-1 ring-white/50 transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-105 group-hover:rotate-[8deg]"
          />
          <span className="font-display text-[0.92rem] leading-none whitespace-nowrap text-indigo xs:text-[1.12rem] sm:text-[1.45rem] lg:text-[1.3rem] xl:text-[1.75rem]">
            <span className="text-brand">{info.prefix}</span> {info.name}
            <span className="ml-1 text-brand">{info.edition}</span>
          </span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-4">
          {/* Desktop links with sliding highlight */}
          <ul ref={listRef} onMouseLeave={() => setHovered(null)} className="relative hidden items-center lg:flex">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 rounded-full bg-brand/10 ring-1 ring-brand/15 transition-[left,width,opacity] duration-500 ease-(--ease-out-expo)"
              style={{ left: pill.left, width: pill.width, opacity: pill.visible ? 1 : 0 }}
            />
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    ref={(el) => {
                      linkRefs.current[item.id] = el;
                    }}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    onMouseEnter={() => setHovered(item.id)}
                    onFocus={() => setHovered(item.id)}
                    onBlur={() => setHovered(null)}
                    className={cn(
                      'relative block rounded-full px-2.5 py-2 text-[0.9rem] whitespace-nowrap transition-colors duration-300 xl:px-4 xl:text-[0.95rem]',
                      isActive || hovered === item.id ? 'text-brand-deep' : 'text-ink-muted',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Register with a periodic shine sweep */}
            <span className="relative hidden sm:inline-flex">
              <Button href={registerHref} external={external} size="md">
                Register
              </Button>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full motion-reduce:hidden">
                <span className="absolute inset-y-0 left-0 w-1/3 animate-[shine_4.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/45 to-transparent" />
              </span>
            </span>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cn(
                'grid size-9.5 xs:size-10 sm:size-11 shrink-0 place-items-center rounded-full border transition-colors lg:hidden',
                open ? 'border-brand bg-brand text-on-brand' : 'border-line-strong bg-paper/70 text-indigo hover:border-brand/50',
              )}
            >
              <Icon name={open ? 'close' : 'menu'} size={18} strokeWidth={1.8} />
            </button>
          </div>

        </nav>
        {/* Scroll progress hairline */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 bottom-0 h-[2px] overflow-hidden rounded-full">
          <span
            className="block h-full origin-left rounded-full bg-gradient-to-r from-brand via-violet to-leaf"
            style={{ transform: `scaleX(${progress})` }}
          />
        </span>
      </div>
      </div>

      <div className="mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8">
        {/* Mobile menu */}
        <div
          id="mobile-menu"
          hidden={!open}
          className="mt-2.5 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-[1.75rem] border border-line-strong bg-card/95 p-4 sm:p-5 shadow-[0_30px_60px_-30px_rgb(48_21_87/0.5)] backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li
                key={item.id}
                className="border-b border-line last:border-0"
                style={{ animation: `menu-in 500ms ${i * 45}ms var(--ease-out-expo) both` }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 font-display text-[1.4rem] xs:text-[1.6rem] sm:text-[1.75rem] text-indigo"
                >
                  {item.label}
                  <Icon name="arrowUpRight" size={18} className="text-brand" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Button href={registerHref} external={external} size="lg" fullWidth onClick={() => setOpen(false)}>
              Register now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
