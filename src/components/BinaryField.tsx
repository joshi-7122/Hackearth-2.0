import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { cssVar, onThemeChange } from '@/lib/theme';

/**
 * Decorative field of binary digits in WIE dark pink. A sparse grid of 0/1
 * glyphs at varying opacity; a handful flip every tick, so it shimmers like
 * live data. Pauses off-screen; static under reduced motion.
 * Shape and fade it with className (e.g. a CSS mask).
 */
export function BinaryField({
  className,
  color,
  fontSize = 13,
  density = 0.55,
  maxAlpha = 0.55,
}: {
  className?: string;
  /** "r, g, b" — defaults to the theme's --binary-rgb (WIE dark pink) */
  color?: string;
  fontSize?: number;
  /** 0–1: share of cells that hold a digit */
  density?: number;
  maxAlpha?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = prefersReducedMotion();
    let cols = 0;
    let rows = 0;
    let cw = 0;
    let ch = 0;
    let cells: { d: string; a: number }[] = [];
    let timer = 0;
    let visible = true;
    let rgb = color ?? (cssVar('--binary-rgb') || '166, 42, 100');

    const build = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cw = fontSize * 0.95;
      ch = fontSize * 1.45;
      cols = Math.ceil(r.width / cw);
      rows = Math.ceil(r.height / ch);
      cells = Array.from({ length: cols * rows }, () => ({
        d: Math.random() < 0.5 ? '0' : '1',
        a: Math.random() < density ? (0.15 + Math.random() * 0.85) * maxAlpha : 0,
      }));
      draw();
    };

    const draw = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      ctx.font = `500 ${fontSize}px "JetBrains Mono Variable", ui-monospace, monospace`;
      ctx.textBaseline = 'top';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const c = cells[y * cols + x]!;
          if (c.a <= 0) continue;
          ctx.fillStyle = `rgba(${rgb}, ${c.a.toFixed(3)})`;
          ctx.fillText(c.d, x * cw, y * ch);
        }
      }
    };

    const tick = () => {
      // Flip a few digits and occasionally light / dim a cell.
      const n = Math.max(2, Math.round(cells.length * 0.02));
      for (let i = 0; i < n; i++) {
        const c = cells[(Math.random() * cells.length) | 0];
        if (!c) continue;
        c.d = c.d === '0' ? '1' : '0';
        if (Math.random() < 0.25) c.a = Math.random() < density ? (0.15 + Math.random() * 0.85) * maxAlpha : 0;
      }
      draw();
    };

    const start = () => {
      if (reduced || timer || !visible || document.hidden) return;
      timer = window.setInterval(tick, 140);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };

    build();
    document.fonts?.ready.then(draw).catch(() => {});
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const offTheme = onThemeChange(() => {
      rgb = color ?? (cssVar('--binary-rgb') || rgb);
      draw();
    });
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      offTheme();
    };
  }, [color, fontSize, density, maxAlpha]);

  return <canvas ref={ref} aria-hidden="true" className={cn('pointer-events-none block', className)} />;
}
