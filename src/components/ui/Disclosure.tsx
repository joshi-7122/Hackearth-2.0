import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from './Icon';

interface DisclosureProps {
  id: string;
  open: boolean;
  onToggle: () => void;
  header: ReactNode;
  children: ReactNode;
  headingLevel?: 'h3' | 'h4';
  className?: string;
}

/**
 * Accessible accordion item. Height animates via grid-template-rows
 * (0fr → 1fr), so no measuring or JS animation is needed.
 */
export function Disclosure({
  id,
  open,
  onToggle,
  header,
  children,
  headingLevel: H = 'h3',
  className,
}: DisclosureProps) {
  const btnId = `${id}-btn`;
  const panelId = `${id}-panel`;
  return (
    <div className={cn('border-b border-line', className)}>
      <H className="font-sans">
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
        >
          <span className="min-w-0 flex-1">{header}</span>
          <span
            aria-hidden="true"
            className={cn(
              'grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-(--ease-out-expo)',
              open
                ? 'rotate-45 border-brand bg-brand text-on-brand'
                : 'border-line-strong text-ink-muted group-hover:border-indigo/30 group-hover:text-ink',
            )}
          >
            <Icon name="plus" size={16} strokeWidth={2} />
          </span>
        </button>
      </H>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-out-expo)',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-6 md:pb-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
