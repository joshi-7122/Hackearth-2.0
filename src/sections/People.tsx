import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { people, roleTabs } from '@/data/people';
import { ProfileCard } from '@/components/ProfileCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import type { PersonRole } from '@/types';

export function People() {
  const [role, setRole] = useState<PersonRole>(roleTabs[0]!.role);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = people.filter((p) => p.role === role);
  const activeIndex = roleTabs.findIndex((t) => t.role === role);

  const [indicator, setIndicator] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const el = tabRefs.current[activeIndex];
    if (el) {
      setIndicator({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    if ('fonts' in document) {
      document.fonts.ready.then(updateIndicator);
    }
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const onSelect = (newRole: PersonRole, idx: number) => {
    setRole(newRole);
    tabRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (activeIndex + d + roleTabs.length) % roleTabs.length;
    onSelect(roleTabs[next]!.role, next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="people" aria-labelledby="people-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="people-title"
            index="09"
            eyebrow="Faculty, organizing team, judges, mentors & speakers"
            lines={['The people', <span className="text-brand">in your corner.</span>]}
          />

          <div className="w-full overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] lg:w-auto [&::-webkit-scrollbar]:hidden">
            <div
              role="tablist"
              aria-label="People by role"
              onKeyDown={onKeyDown}
              className="relative inline-flex items-center rounded-full border border-line-strong bg-card p-1 shadow-xs"
            >
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 rounded-full bg-brand transition-all duration-300 ease-(--ease-out-expo)"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.width > 0 ? 1 : 0,
                }}
              />
              {roleTabs.map((t, i) => {
                const selected = t.role === role;
                return (
                  <button
                    key={t.role}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`role-tab-${t.role}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="people-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => onSelect(t.role, i)}
                    className={cn(
                      'relative z-10 flex h-9 sm:h-10 items-center justify-center rounded-full px-3.5 sm:px-4 text-xs sm:text-sm font-medium transition-colors duration-300 text-center whitespace-nowrap cursor-pointer select-none',
                      selected ? 'text-on-brand font-semibold' : 'text-ink-muted hover:text-ink',
                    )}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {role === 'organizer' ? (
          <div
            id="people-panel"
            role="tabpanel"
            aria-labelledby={`role-tab-${role}`}
            className="group relative mt-10 sm:mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] motion-reduce:[mask-image:none]"
          >
            <div
              className="flex w-max animate-[marquee_var(--marquee-dur)_linear_infinite] py-3 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none"
              style={{ ['--marquee-dur' as string]: `${Math.max(25, list.length * 4.5)}s` }}
            >
              {/* Copy 1 */}
              <div className="flex shrink-0 gap-6 pr-6 motion-reduce:container-x motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0">
                {list.map((p, i) => (
                  <div key={p.name + p.role + i} className="w-64 xs:w-72 shrink-0">
                    <ProfileCard person={p} />
                  </div>
                ))}
              </div>
              {/* Copy 2 - duplicate for smooth continuous loop */}
              <div aria-hidden="true" className="flex shrink-0 gap-6 pr-6 motion-reduce:hidden">
                {list.map((p, i) => (
                  <div key={p.name + p.role + '-dup-' + i} className="w-64 xs:w-72 shrink-0">
                    <ProfileCard person={p} />
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 font-mono text-xs text-ink-subtle">
              <span>Hover or focus cards to pause rotation</span>
            </p>
          </div>
        ) : role === 'faculty' ? (
          <div
            id="people-panel"
            role="tabpanel"
            aria-labelledby={`role-tab-${role}`}
            className="mt-10 sm:mt-14 mx-auto grid max-w-5xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((p, i) => (
              <Reveal key={p.name + p.role} i={i}>
                <ProfileCard person={p} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div
            id="people-panel"
            role="tabpanel"
            aria-labelledby={`role-tab-${role}`}
            className="mt-10 sm:mt-14 grid grid-cols-1 gap-x-5 gap-y-10 xs:grid-cols-2 lg:grid-cols-4"
          >
            {list.map((p, i) => (
              <Reveal key={p.name + p.role} i={i}>
                <ProfileCard person={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
