import { stats } from '@/data/hackathon';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import { isPlaceholder } from '@/lib/placeholder';
import { cn } from '@/lib/cn';
import type { Stat } from '@/types';
import { Txt } from './ui/Txt';

function StatValue({ stat, start }: { stat: Stat; start: boolean }) {
  const numeric = typeof stat.value === 'number';
  const n = useCountUp(numeric ? (stat.value as number) : 0, start && numeric);

  if (!numeric) {
    const text = String(stat.value);
    return (
      <span className={cn('whitespace-nowrap', isPlaceholder(text) ? 'text-[clamp(1.4rem,3vw,2.2rem)]' : 'text-[0.7em]')}>
        <Txt>{text}</Txt>
      </span>
    );
  }
  return (
    <>
      {stat.prefix}
      <span className="tabular-nums">{n.toLocaleString('en-IN')}</span>
      {stat.suffix && <span className="ml-[0.12em] text-[0.55em] text-brand">{stat.suffix}</span>}
    </>
  );
}

export function Stats() {
  const [ref, inView] = useInView<HTMLDListElement>({ threshold: 0.4 });
  return (
    <dl ref={ref} className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            'flex flex-col-reverse gap-3 border-b border-line py-8 md:py-10',
            i % 2 === 1 && 'border-l pl-5 md:pl-8',
            i % 2 === 0 && 'pr-5 md:pr-8',
            i >= 1 && 'lg:border-l lg:pl-8',
            'lg:border-b-0',
          )}
        >
          <dt className="eyebrow">{s.label}</dt>
          <dd className="text-display flex min-h-[1em] items-end text-[clamp(2.75rem,6vw,5rem)] text-ink">
            <StatValue stat={s} start={inView} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
