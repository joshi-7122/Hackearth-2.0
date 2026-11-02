import { cn } from '@/lib/cn';

/** The deck's thin magenta/violet corner arcs. Purely decorative. */
export function Swoosh({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      className={cn('pointer-events-none', flip && '-scale-x-100', className)}
    >
      <path d="M400 30C250 60 120 170 60 400" stroke="#c73a7b" strokeWidth="2" opacity=".75" />
      <path d="M400 80C280 110 170 210 120 400" stroke="#7f4ba3" strokeWidth="1.4" opacity=".55" />
      <path d="M400 140C320 160 240 240 200 400" stroke="#c73a7b" strokeWidth="1" opacity=".35" />
    </svg>
  );
}

/** Small dotted cluster, as used on every deck slide. */
export function Dots({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('bg-dots pointer-events-none', className)} />;
}

/** The HackEarth leaf, from the deck cover wordmark. */
export function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <path d="M8 56C8 28 26 9 60 6c-2 31-19 48-50 50z" fill="#007a3f" />
      <path d="M8 56C8 28 26 9 60 6c-6 6-26 28-52 50z" fill="#00a155" opacity=".55" />
      <path d="M8 56 44 20" stroke="#fcf7eb" strokeWidth="2" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}
