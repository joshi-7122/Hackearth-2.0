import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

/**
 * The hero illustration as a 3D "acrylic cut-out".
 *
 * • Depth: the transparent illustration is stacked in thin, progressively
 *   darker layers along Z, giving it real thickness in CSS 3D perspective.
 * • Motion: tilts toward the pointer (eased); when idle it sways gently and
 *   floats, with a ground shadow that breathes with it.
 * • Details: a pulsing glow on the lightbulb and code glyphs rising from the
 *   laptop.
 * Reduced motion: a still, un-tilted figure with no particles.
 */

const DEPTH_LAYERS = 7;
const LAYER_GAP = 2.4; // px between layers
const GLYPHS = ['</>', '{ }', '01', '10', '</>', '( )', '01'];

export function Figure3D({ className, alt }: { className?: string; alt: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    if (!stage || !tilt || prefersReducedMotion()) return;

    let tx = 0;
    let ty = 0; // target tilt (deg)
    let cx = 0;
    let cy = 0; // current tilt
    let lastPointer = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    const t0 = performance.now();

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      tx = Math.max(-1, Math.min(1, nx)) * 22;
      ty = Math.max(-1, Math.min(1, ny)) * -12;
      lastPointer = performance.now();
    };

    const frame = (now: number) => {
      const t = (now - t0) / 1000;
      // Idle sway takes over a moment after the pointer stops moving.
      const idle = now - lastPointer > 2200;
      const gx = idle ? Math.sin(t * 0.55) * 9 : tx;
      const gy = idle ? Math.sin(t * 0.4 + 1) * 4 : ty;
      cx += (gx - cx) * 0.06;
      cy += (gy - cy) * 0.06;
      const bob = Math.sin(t * 1.1) * 8;
      tilt.style.transform = `translate3d(0, ${bob.toFixed(2)}px, 0) rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
      stage.style.setProperty('--bob', (bob / 8).toFixed(3));
      stage.style.setProperty('--shine', `${(50 + cx * 2.4).toFixed(1)}%`);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(stage);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('pointermove', onMove, { passive: true });
    start();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div ref={stageRef} className={cn('relative [perspective:1100px]', className)}>
      {/* Ground shadow — tightens as the figure rises */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-2%] left-1/2 h-[7%] w-[62%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgb(48_21_87/0.45),transparent_70%)] blur-md"
        style={{ transform: 'translateX(-50%) scale(calc(1 - var(--bob, 0) * 0.08))', opacity: 'calc(0.85 - var(--bob, 0) * 0.15)' }}
      />

      <div ref={tiltRef} className="relative size-full [transform-style:preserve-3d] will-change-transform">
        {/* Extruded depth: darker copies stepping back in Z */}
        {Array.from({ length: DEPTH_LAYERS }, (_, i) => {
          const k = DEPTH_LAYERS - i;
          return (
            <img
              key={k}
              src="/brand/coder.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 size-full object-contain object-bottom select-none"
              style={{
                transform: `translateZ(${-k * LAYER_GAP}px)`,
                filter: `brightness(${0.42 + (i / DEPTH_LAYERS) * 0.25}) saturate(1.2)`,
              }}
            />
          );
        })}

        {/* Front face */}
        <img
          src="/brand/coder.webp"
          alt={alt}
          draggable={false}
          fetchPriority="high"
          className="absolute inset-0 size-full object-contain object-bottom drop-shadow-[0_24px_30px_rgb(48_21_87/0.28)] select-none"
          style={{ transform: 'translateZ(1px)' }}
        />

        {/* Moving sheen — sells the glossy acrylic surface */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-soft-light [mask-image:url(/brand/coder.webp)] [mask-position:bottom] [mask-repeat:no-repeat] [mask-size:contain] motion-reduce:hidden"
          style={{
            transform: 'translateZ(2px)',
            background: 'linear-gradient(115deg, transparent calc(var(--shine, 50%) - 18%), rgb(255 255 255 / 0.55) var(--shine, 50%), transparent calc(var(--shine, 50%) + 18%))',
          }}
        />

        {/* Lightbulb glow (positioned over the bulb in the artwork) */}
        <span
          aria-hidden="true"
          className="absolute top-[7%] left-[57%] size-[14%] rounded-full bg-[radial-gradient(circle,rgb(255_220_120/0.85),rgb(255_180_80/0.25)_45%,transparent_70%)] animate-[bulb-glow_2.8s_ease-in-out_infinite] mix-blend-screen motion-reduce:hidden"
          style={{ transform: 'translateZ(14px)' }}
        />

        {/* Code glyphs drifting up from the laptop */}
        <div aria-hidden="true" className="absolute top-[26%] right-[4%] h-[34%] w-[30%] motion-reduce:hidden" style={{ transform: 'translateZ(26px)' }}>
          {GLYPHS.map((g, i) => (
            <span
              key={i}
              className="absolute bottom-0 font-mono text-[clamp(0.7rem,1.1vw,0.95rem)] font-semibold text-brand [text-shadow:0_0_10px_rgb(199_58_123/0.5)]"
              style={{
                left: `${(i * 37) % 90}%`,
                animation: `glyph-rise ${4.2 + (i % 3) * 0.9}s ease-out ${i * 0.85}s infinite`,
                opacity: 0,
              }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
