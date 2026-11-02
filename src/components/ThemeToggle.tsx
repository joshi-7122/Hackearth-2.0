import type { MouseEvent } from 'react';
import { cn } from '@/lib/cn';
import { setTheme, useTheme } from '@/lib/theme';

/** Sun / moon switch. The icons morph and the new theme ripples out from the button. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const dark = theme === 'dark';

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTheme(dark ? 'light' : 'dark', { x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
      className={cn(
        'group relative grid size-10 shrink-0 sm:size-11 place-items-center overflow-hidden rounded-full border border-line-strong bg-paper/70 text-indigo transition-colors duration-300 hover:border-brand/50 hover:text-brand',
        className,
      )}
    >
      {/* Sun */}
      <svg
        viewBox="0 0 24 24"
        width="19"
        height="19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        className={cn(
          'absolute transition-all duration-500 ease-(--ease-out-expo)',
          dark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
        )}
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
      {/* Moon */}
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
        className={cn(
          'absolute transition-all duration-500 ease-(--ease-out-expo)',
          dark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0',
        )}
      >
        <path d="M20.3 14.6A8.4 8.4 0 0 1 9.4 3.7a.6.6 0 0 0-.8-.7A9.6 9.6 0 1 0 21 15.4a.6.6 0 0 0-.7-.8z" />
      </svg>
    </button>
  );
}
