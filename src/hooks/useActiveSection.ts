import { useEffect, useState } from 'react';

/** Tracks which section id currently sits under the upper third of the viewport. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;

      // Scrolled to bottom: activate the last section
      if (scrollY + innerHeight >= scrollHeight - 80) {
        setActive(ids[ids.length - 1] ?? null);
        return;
      }

      // At the very top (hero area): no nav item active
      if (scrollY < 120) {
        setActive(null);
        return;
      }

      // Upper third activation line
      const activationLine = scrollY + innerHeight * 0.35;
      let currentId: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        if (top <= activationLine) {
          currentId = id;
        }
      }

      setActive(currentId);
    };

    let raf = 0;
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          update();
          raf = 0;
        });
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return active;
}
