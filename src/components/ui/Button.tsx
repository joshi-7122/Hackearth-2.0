import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

interface ButtonProps {
  children: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName | null;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  fullWidth?: boolean;
}

const base =
  'group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-tight whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-(--ease-out-expo) active:scale-[0.98]';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-on-brand shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_8px_20px_-10px_rgb(199_58_123/0.7)] hover:bg-brand-deep hover:shadow-(--glow-brand)',
  secondary:
    'border border-line-strong bg-card/70 text-indigo backdrop-blur-sm hover:border-brand/50 hover:text-brand-deep',
  ghost: 'text-ink-muted hover:text-ink',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[0.95rem]',
};

/**
 * Pill button. On hover / keyboard focus the label turns into a scrolling
 * ticker ("Register now ✦ Register now ✦ …"). The static label keeps the
 * button's width, so nothing shifts. Renders <a> when href is set.
 */
export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon = 'arrowRight',
  external,
  className,
  ariaLabel,
  fullWidth = false,
}: ButtonProps) {
  const half = (
    <>
      <span>{children}</span>
      <span className="px-2.5 opacity-70">✦</span>
      <span>{children}</span>
      <span className="px-2.5 opacity-70">✦</span>
    </>
  );

  const inner: ReactNode = (
    <>
      <span className="relative block overflow-hidden group-hover:[mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)] group-focus-visible:[mask-image:linear-gradient(to_right,transparent,#000_14%,#000_86%,transparent)] motion-reduce:![mask-image:none]">
        {/* Static label — sets the width, hidden while the ticker runs */}
        <span className="block transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:!opacity-100">
          {children}
        </span>
        {/* Ticker — two identical halves shifted by -50% for a seamless loop */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 flex w-max items-center opacity-0 transition-opacity duration-200 [animation:btn-ticker_2.6s_linear_infinite_paused] group-hover:opacity-100 group-hover:[animation-play-state:running] group-focus-visible:opacity-100 group-focus-visible:[animation-play-state:running] motion-reduce:hidden"
        >
          {half}
          {half}
        </span>
      </span>
      {icon && (
        <Icon
          name={icon}
          size={16}
          strokeWidth={2.2}
          className="shrink-0 transition-transform duration-500 ease-(--ease-out-expo) group-hover:translate-x-1 group-focus-visible:translate-x-1"
        />
      )}
    </>
  );

  const cls = cn(base, variants[variant], sizes[size], 'w-full');

  const el = href ? (
    <a
      href={href}
      onClick={onClick}
      className={cls}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls} aria-label={ariaLabel}>
      {inner}
    </button>
  );

  return <span className={cn(fullWidth ? 'flex w-full' : 'inline-flex', className)}>{el}</span>;
}
