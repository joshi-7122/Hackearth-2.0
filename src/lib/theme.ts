import { useSyncExternalStore } from 'react';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';

export type Theme = 'light' | 'dark';

const KEY = 'he2-theme';
const EVENT = 'themechange';
const META: Record<Theme, string> = { light: '#fcf7eb', dark: '#140a26' };

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[theme]);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* storage unavailable — the choice just won't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Switches theme. Where the View Transitions API exists (and motion is
 * allowed) the new theme is revealed as a circle growing from `origin`.
 */
export function setTheme(theme: Theme, origin?: { x: number; y: number }) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
  if (!doc.startViewTransition || prefersReducedMotion() || !origin) {
    apply(theme);
    return;
  }
  const { x, y } = origin;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  doc
    .startViewTransition(() => apply(theme))
    .ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    })
    .catch(() => {});
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => 'light');
}

/** Calls `cb` whenever the theme changes (for canvases that cache colours). */
export function onThemeChange(cb: () => void): () => void {
  return subscribe(cb);
}

/** Reads a CSS custom property from :root (e.g. "--binary-rgb"). */
export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
