import type { Accent } from '@/types';

/** Static class maps so Tailwind can see every accent class at build time. */
export const accentText: Record<Accent, string> = {
  brand: 'text-brand',
  violet: 'text-violet',
  leaf: 'text-leaf',
  indigo: 'text-indigo',
};

export const accentBg: Record<Accent, string> = {
  brand: 'bg-brand',
  violet: 'bg-violet',
  leaf: 'bg-leaf',
  indigo: 'bg-indigo',
};

/** "r g b" triplets for CSS custom properties (e.g. --spot). */
export const accentRgb: Record<Accent, string> = {
  brand: '199 58 123',
  violet: '127 75 163',
  leaf: '0 122 63',
  indigo: '57 47 115',
};
