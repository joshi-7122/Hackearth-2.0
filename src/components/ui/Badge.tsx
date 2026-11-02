import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { Accent } from '@/types';

const tones: Record<Accent | 'neutral', string> = {
  neutral: 'border-line-strong text-ink-muted',
  brand: 'border-brand/30 text-brand bg-brand/[0.06]',
  violet: 'border-violet/30 text-violet bg-violet/[0.06]',
  leaf: 'border-leaf/30 text-leaf bg-leaf/[0.06]',
  indigo: 'border-indigo/30 text-indigo bg-indigo/[0.06]',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: Accent | 'neutral';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] font-medium tracking-[0.08em] uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
