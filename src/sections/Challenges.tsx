import { useRef, useState, type KeyboardEvent } from 'react';
import { challenges } from '@/data/challenges';
import { ChallengeDetail, DifficultyMeter } from '@/components/ChallengeCard';
import { Disclosure } from '@/components/ui/Disclosure';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { accentText } from '@/lib/accent';
import { cn } from '@/lib/cn';
import { countWord } from '@/lib/format';

export function Challenges() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = challenges[active]!;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = challenges.length - 1;
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? (i === last ? 0 : i + 1)
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? (i === 0 ? last : i - 1)
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="challenges" aria-labelledby="challenges-title" className="section-y relative border-t border-line">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="challenges-title"
            index="03"
            eyebrow="Challenges"
            lines={[`${countWord(challenges.length)} focus areas.`, <span className="text-brand">Real impact.</span>]}
          />
          <p className="max-w-sm text-ink-muted lg:pb-3">
            The official focus areas of WIE HackEarth 2.0. Each comes with an example challenge to spark ideas — hover or tab through to explore.
          </p>
        </div>

        {/* Desktop: index + live panel */}
        <Reveal className="mt-16 hidden gap-6 lg:grid lg:grid-cols-12">
          <div role="tablist" aria-label="Challenge tracks" aria-orientation="vertical" className="col-span-5 flex flex-col">
            {challenges.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`tab-${c.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="challenge-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    'group relative flex items-center gap-5 border-b border-line px-5 py-5 text-left transition-colors duration-300 first:border-t',
                    isActive ? 'bg-indigo/[0.035]' : 'hover:bg-indigo/[0.02]',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-0 left-0 h-full w-0.5 origin-top bg-brand transition-transform duration-500 ease-(--ease-out-expo)',
                      isActive ? 'scale-y-100' : 'scale-y-0',
                    )}
                  />
                  <span className="w-6 font-mono text-xs text-ink-subtle">{String(i + 1).padStart(2, '0')}</span>
                  <Icon
                    name={c.icon}
                    size={20}
                    className={cn('shrink-0 transition-colors duration-300', isActive ? accentText[c.accent] : 'text-ink-subtle')}
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        'block font-serif text-xl font-semibold transition-colors duration-300',
                        isActive ? 'text-ink' : 'text-ink-muted group-hover:text-ink',
                      )}
                    >
                      {c.title}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-ink-subtle">{c.short}</span>
                  </span>
                  <Icon
                    name="arrowRight"
                    size={16}
                    className={cn(
                      'shrink-0 transition-all duration-500 ease-(--ease-out-expo)',
                      isActive ? 'translate-x-0 text-brand opacity-100' : '-translate-x-2 opacity-0',
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="col-span-7">
            <div
              id="challenge-panel"
              role="tabpanel"
              aria-labelledby={`tab-${current.id}`}
              className="bg-grid relative isolate h-full min-h-[34rem] overflow-hidden rounded-(--radius-panel) border border-line bg-card shadow-(--shadow-card)"
            >
              <div key={current.id} className="h-full animate-[panel-in_600ms_var(--ease-out-expo)_both]">
                <ChallengeDetail challenge={current} index={active} total={challenges.length} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mobile / tablet: accordion */}
        <div className="mt-12 lg:hidden">
          <div className="border-t border-line">
            {challenges.map((c, i) => (
              <Disclosure
                key={c.id}
                id={`track-${c.id}`}
                open={openMobile === i}
                onToggle={() => setOpenMobile(openMobile === i ? null : i)}
                header={
                  <span className="flex items-center gap-4">
                    <Icon name={c.icon} size={20} className={cn('shrink-0', accentText[c.accent])} />
                    <span className="min-w-0">
                      <span className="block font-serif text-lg font-semibold text-indigo sm:text-xl">
                        {c.title}
                      </span>
                      <span className="mt-1 block">
                        <DifficultyMeter challenge={c} />
                      </span>
                    </span>
                  </span>
                }
              >
                <div className="pl-4 xs:pl-6 sm:pl-9">
                  <ChallengeDetail challenge={c} index={i} total={challenges.length} compact />
                </div>
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
