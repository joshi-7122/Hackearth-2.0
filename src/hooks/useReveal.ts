import { useCallback, useRef } from 'react';
import { observeReveal } from '@/lib/reveal';

/** Returns a ref callback that adds `is-in` when the element scrolls into view. */
export function useReveal<T extends Element>() {
  const cleanup = useRef<() => void>(undefined);
  return useCallback((el: T | null) => {
    cleanup.current?.();
    cleanup.current = el ? observeReveal(el) : undefined;
  }, []);
}
