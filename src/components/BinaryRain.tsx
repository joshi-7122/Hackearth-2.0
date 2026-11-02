import { useEffect, useRef, type RefObject } from 'react';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { cssVar, getTheme, onThemeChange } from '@/lib/theme';

/**
 * Falling binary rain for the hero backdrop (not interactive).
 * Columns of 0/1 glyphs fall at slow, varied speeds: a brighter head digit
 * leads a fading tail, and tail digits occasionally flip. Glyphs fade out
 * around the `avoid` element so the hero copy stays readable.
 * Drawn at ~30 fps (plenty for falling digits), paused off-screen, single
 * still frame for reduced motion, coloured from the theme's --binary-rgb.
 */

const FONT = 13;
const COL_W = 10;
const ROW_H = 16;
/** Drops sharing each column — more = denser shower. */
const DROPS_PER_COL = 6;
const FPS = 45; // smoother at the higher fall speed

interface Drop {
  col: number;
  y: number; // head position in px
  speed: number; // px per second
  len: number; // tail length in glyphs
  glyphs: string[]; // one per row, flipped occasionally
}

export function BinaryRain({ className, avoid }: { className?: string; avoid?: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    let w = 1;
    let h = 1;
    let rows = 1;
    let drops: Drop[] = [];
    let zone = { l: 0, t: 0, r: -1, b: -1 };
    let rgb = cssVar('--binary-rgb') || '166, 42, 100';
    let alphaScale = getTheme() === 'dark' ? 0.75 : 0.6;
    const FEATHER = 140;

    // Pre-rendered glyph sprites: drawImage + globalAlpha is far cheaper than
    // fillText with a new fillStyle per digit.
    const sprites: Record<string, HTMLCanvasElement> = {};
    let spriteDpr = 1;
    const buildSprites = () => {
      spriteDpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const g of ['0', '1']) {
        const c = document.createElement('canvas');
        c.width = Math.ceil(COL_W * spriteDpr);
        c.height = Math.ceil(ROW_H * spriteDpr);
        const x = c.getContext('2d')!;
        x.scale(spriteDpr, spriteDpr);
        x.font = `500 ${FONT}px "JetBrains Mono Variable", ui-monospace, monospace`;
        x.textBaseline = 'top';
        x.textAlign = 'center';
        x.fillStyle = `rgb(${rgb})`;
        x.fillText(g, COL_W / 2, 0);
        sprites[g] = c;
      }
    };

    const bit = () => (Math.random() < 0.5 ? '0' : '1');
    const newDrop = (col: number, startAbove: boolean): Drop => ({
      col,
      y: startAbove ? -Math.random() * h * 0.5 : Math.random() * h * 1.4,
      speed: 140 + Math.random() * 180,
      len: 18 + Math.floor(Math.random() * 28),
      glyphs: Array.from({ length: rows + 2 }, bit),
    });

    // Soft oval falloff around the copy (no rectangular edge): full rain far
    // away, easing down to a faint drizzle behind the text so it blends in.
    const MIN_VIS = 0.12;
    const visibility = (x: number, y: number) => {
      if (zone.r < zone.l) return 1;
      const cx = (zone.l + zone.r) / 2;
      const cy = (zone.t + zone.b) / 2;
      const rx = (zone.r - zone.l) / 2 + FEATHER;
      const ry = (zone.b - zone.t) / 2 + FEATHER;
      const d = Math.hypot((x - cx) / rx, (y - cy) / ry); // 1 ≈ edge of the oval
      const t = Math.min(1, Math.max(0, (d - 0.45) / 0.75));
      const s = t * t * (3 - 2 * t);
      return MIN_VIS + (1 - MIN_VIS) * s;
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rows = Math.ceil(h / ROW_H) + 1;
      const cols = Math.ceil(w / COL_W);
      drops = Array.from({ length: cols * DROPS_PER_COL }, (_, i) => newDrop(i % cols, false));
      const a = avoid?.current?.getBoundingClientRect();
      zone = a
        ? { l: a.left - r.left - 16, t: a.top - r.top - 16, r: a.right - r.left + 16, b: a.bottom - r.top + 16 }
        : { l: 0, t: 0, r: -1, b: -1 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const left = COL_W / 2;
      for (const d of drops) {
        const x = d.col * COL_W + COL_W / 2;
        const headRow = Math.floor(d.y / ROW_H);
        for (let k = 0; k <= d.len; k++) {
          const row = headRow - k;
          if (row < 0 || row >= rows) continue;
          const y = row * ROW_H;
          const vis = visibility(x, y + ROW_H / 2);
          if (vis <= 0) continue;
          // Head is brightest; tail fades out.
          const a = (k === 0 ? 0.9 : 0.6 * (1 - k / (d.len + 1))) * alphaScale * vis;
          if (a < 0.02) continue;
          ctx.globalAlpha = a;
          ctx.drawImage(sprites[d.glyphs[row]!]!, x - left, y, COL_W, ROW_H);
        }
      }
      ctx.globalAlpha = 1;
    };

    const update = (dt: number) => {
      for (const d of drops) {
        d.y += d.speed * dt;
        // A few digits flip as they fall
        if (Math.random() < 0.35) {
          const i = Math.floor(Math.random() * d.glyphs.length);
          d.glyphs[i] = bit();
        }
        if (d.y - d.len * ROW_H > h) Object.assign(d, newDrop(d.col, true));
      }
    };

    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let acc = 0;
    const loop = (now: number) => {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
      last = now;
      acc += dt;
      if (acc >= 1 / FPS) {
        update(acc);
        acc = 0;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    buildSprites();
    resize();
    draw();
    document.fonts?.ready
      .then(() => {
        buildSprites();
        if (!running) draw();
      })
      .catch(() => {});
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    if (avoid?.current) ro.observe(avoid.current);
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    const offTheme = onThemeChange(() => {
      rgb = cssVar('--binary-rgb') || rgb;
      buildSprites();
      alphaScale = getTheme() === 'dark' ? 0.75 : 0.6;
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
  }, [avoid]);

  return <canvas ref={ref} aria-hidden="true" className={cn('pointer-events-none', className)} />;
}
