import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useReveal } from '@/hooks/useReveal';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  /** Each entry is one masked line in the reveal animation. */
  lines: ReactNode[];
  description?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
  className?: string;
  /** `md` for headings that sit in a narrow column. */
  size?: 'lg' | 'md';
}

export function SectionHeading({
  index,
  eyebrow,
  lines,
  description,
  align = 'left',
  id,
  className,
  size = 'lg',
}: SectionHeadingProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <p className="eyebrow flex items-center gap-3">
        <span className="text-brand">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        <span>{eyebrow}</span>
      </p>
      <h2
        id={id}
        className={cn(
          'text-display text-ink',
          size === 'lg' ? 'text-[clamp(2.4rem,6.2vw,5rem)]' : 'text-[clamp(2.4rem,4.6vw,4rem)]',
        )}
      >
        {lines.map((line, i) => (
          <span key={i} className="line-mask" style={{ ['--i' as string]: i }}>
            <span>{line}</span>
          </span>
        ))}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-xl text-base leading-relaxed text-ink-muted md:text-lg',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
