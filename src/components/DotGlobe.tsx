import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { getTheme, onThemeChange } from '@/lib/theme';

/**
 * Digital dot-matrix Earth. Points are spread evenly over a sphere
 * (Fibonacci lattice); each is tagged land/ocean by sampling the Blue Marble
 * texture once. Every frame the sphere turns slowly and the front-facing
 * dots are drawn — land in WIE magenta, ocean as faint violet — sized and
 * faded by depth. A thin limb halo and a tilted orbit ring finish it.
 * Not interactive. Paused off-screen; single still frame for reduced motion.
 */

const POINTS = 3400;
const TILT = 0.38; // axial tilt toward the viewer
const SPEED = 0.0016; // radians per frame-ish
const BUCKETS = 5;

export function DotGlobe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    let size = 1;
    let land: Uint8Array | null = null;
    // Unit-sphere coordinates (planet frame)
    const px = new Float32Array(POINTS);
    const py = new Float32Array(POINTS);
    const pz = new Float32Array(POINTS);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINTS; i++) {
      const y = 1 - (i / (POINTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      px[i] = Math.cos(th) * r;
      py[i] = y;
      pz[i] = Math.sin(th) * r;
    }

    let brand = '199, 58, 123';
    let violet = '127, 75, 163';
    let dark = false;
    const readTheme = () => {
      dark = getTheme() === 'dark';
      brand = dark ? '226, 84, 154' : '199, 58, 123';
      violet = dark ? '181, 145, 224' : '127, 75, 163';
    };
    readTheme();

    let rot = 1.35; // start with Asia/India toward the viewer

    const draw = () => {
      const s = size;
      const c = s / 2;
      const R = s * 0.46;
      ctx.clearRect(0, 0, s, s);

      // Soft limb halo
      const halo = ctx.createRadialGradient(c, c, R * 0.92, c, c, R * 1.12);
      halo.addColorStop(0, `rgba(${brand}, 0)`);
      halo.addColorStop(0.45, `rgba(${brand}, ${dark ? 0.32 : 0.22})`);
      halo.addColorStop(1, `rgba(${brand}, 0)`);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(c, c, R * 1.12, 0, Math.PI * 2);
      ctx.fill();

      // Solid sphere body in the page colour (hides the rain behind it),
      // lit from the upper left with a soft violet tint toward the limb.
      ctx.fillStyle = dark ? '#160b2b' : '#fbf8f3';
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();
      const body = ctx.createRadialGradient(c - R * 0.4, c - R * 0.4, R * 0.05, c, c, R);
      body.addColorStop(0, `rgba(${brand}, ${dark ? 0.12 : 0.06})`);
      body.addColorStop(0.7, `rgba(${violet}, ${dark ? 0.1 : 0.06})`);
      body.addColorStop(1, `rgba(${violet}, ${dark ? 0.28 : 0.16})`);
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();

      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);
      const landPaths = Array.from({ length: BUCKETS }, () => new Path2D());
      const seaPaths = Array.from({ length: BUCKETS }, () => new Path2D());
      const dot = Math.max(1.6, s / 210);

      for (let i = 0; i < POINTS; i++) {
        // spin about Y, then tilt about X
        const x1 = px[i]! * cosR - pz[i]! * sinR;
        const z1 = px[i]! * sinR + pz[i]! * cosR;
        const y2 = py[i]! * cosT - z1 * sinT;
        const z2 = py[i]! * sinT + z1 * cosT;
        if (z2 <= 0.02) continue; // back-facing
        const b = Math.min(BUCKETS - 1, Math.floor(z2 * BUCKETS));
        const isLand = land ? land[i] === 1 : false;
        const r = dot * (isLand ? 1.2 : 0.55) * (0.55 + 0.55 * z2);
        {
          const path = (isLand ? landPaths : seaPaths)[b]!;
          const cxp = c + x1 * R;
          const cyp = c - y2 * R;
          path.moveTo(cxp + r / 2, cyp);
          path.arc(cxp, cyp, r / 2, 0, Math.PI * 2);
        }
      }
      for (let b = 0; b < BUCKETS; b++) {
        const depth = (b + 1) / BUCKETS;
        ctx.fillStyle = `rgba(${violet}, ${(dark ? 0.38 : 0.3) * depth})`;
        ctx.fill(seaPaths[b]!);
        ctx.fillStyle = `rgba(${brand}, ${0.35 + 0.65 * depth})`;
        ctx.fill(landPaths[b]!);
      }

      // Outline
      ctx.lineWidth = Math.max(1, s / 500);
      ctx.strokeStyle = `rgba(${brand}, ${dark ? 0.45 : 0.35})`;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.stroke();

      // Tilted orbit ring with a travelling node
      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(-0.42);
      ctx.strokeStyle = `rgba(${violet}, ${dark ? 0.55 : 0.4})`;
      ctx.setLineDash([2, 7]);
      ctx.beginPath();
      ctx.ellipse(0, 0, R * 1.32, R * 0.36, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      const a = rot * 1.6;
      ctx.fillStyle = `rgb(${brand})`;
      ctx.shadowColor = `rgba(${brand}, 0.8)`;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * R * 1.32, Math.sin(a) * R * 0.36, Math.max(3, s / 120), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = Math.max(1, Math.min(r.width, r.height));
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    // Land mask from the Blue Marble texture (blue-dominant = ocean)
    const img = new Image();
    img.decoding = 'async';
    img.src = '/brand/earth-day.webp';
    img.onload = () => {
      const w = 512;
      const h = 256;
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const cx = c.getContext('2d', { willReadFrequently: true });
      if (!cx) return;
      cx.drawImage(img, 0, 0, w, h);
      const d = cx.getImageData(0, 0, w, h).data;
      land = new Uint8Array(POINTS);
      for (let i = 0; i < POINTS; i++) {
        const lat = Math.asin(py[i]!);
        const lon = Math.atan2(px[i]!, pz[i]!);
        const u = Math.min(w - 1, Math.floor((lon / (2 * Math.PI) + 0.5) * w));
        const v = Math.min(h - 1, Math.floor((0.5 - lat / Math.PI) * h));
        const o = (v * w + u) * 4;
        const r = d[o]!;
        const g = d[o + 1]!;
        const b = d[o + 2]!;
        land[i] = b > r + 10 && b >= g - 4 ? 0 : 1;
      }
      draw();
    };

    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    const loop = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;
      rot += SPEED * (dt / 16);
      draw();
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

    resize();
    const ro = new ResizeObserver(resize);
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
      readTheme();
      draw();
    });
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      offTheme();
      img.onload = null;
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={cn('pointer-events-none block', className)} />;
}
