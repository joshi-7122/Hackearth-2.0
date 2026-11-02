import { useRef, useState, type KeyboardEvent } from 'react';
import { people, roleTabs } from '@/data/people';
import { ProfileCard } from '@/components/ProfileCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import type { PersonRole } from '@/types';

export function People() {
  const [role, setRole] = useState<PersonRole>('judge');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = people.filter((p) => p.role === role);
  const activeIndex = roleTabs.findIndex((t) => t.role === role);

  const onKeyDown = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (activeIndex + d + roleTabs.length) % roleTabs.length;
    setRole(roleTabs[next]!.role);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="people" aria-labelledby="people-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHeading
            id="people-title"
            index="08"
            eyebrow="Judges, mentors & team"
            lines={['The people', <span className="text-brand">in your corner.</span>]}
          />

          <div
            role="tablist"
            aria-label="People by role"
            onKeyDown={onKeyDown}
            className="relative inline-grid w-full rounded-full border border-line-strong bg-card p-1 sm:w-auto"
            style={{
              gridTemplateColumns: `repeat(${roleTabs.length}, minmax(0, 1fr))`,
            }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 rounded-full bg-brand transition-transform duration-500 ease-(--ease-out-expo)"
              style={{
                width: `calc((100% - 0.5rem) / ${roleTabs.length})`,
                transform: `translateX(${activeIndex * 100}%)`,
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
                  onClick={() => setRole(t.role)}
                  className={cn(
                    'relative z-10 h-10 rounded-full px-3 text-xs sm:px-5 sm:text-sm font-medium transition-colors duration-300 text-center whitespace-nowrap',
                    selected ? 'text-on-brand' : 'text-ink-muted hover:text-ink',
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id="people-panel"
          role="tabpanel"
          aria-labelledby={`role-tab-${role}`}
          className="mt-14 grid grid-cols-1 gap-x-5 gap-y-12 xs:grid-cols-2 lg:grid-cols-4"
        >
          {list.map((p, i) => (
            <Reveal key={p.name + p.role} i={i}>
              <ProfileCard person={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
