import { useId, useMemo } from 'react';

const palette = ['#c73a7b', '#7f4ba3', '#007a3f', '#392f73'];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/**
 * Deterministic geometric avatar used until a real photo is supplied.
 * Same seed → same pattern, so people keep a stable identity.
 */
export function Avatar({ seed, photo, alt }: { seed: string; photo?: string; alt: string }) {
  const uid = useId().replace(/:/g, '');
  const cells = useMemo(() => {
    const h = hash(seed);
    const out: { x: number; y: number; c: string; o: number }[] = [];
    const color = palette[h % palette.length]!;
    // 3 columns × 5 rows of bits, mirrored horizontally → symmetric identicon.
    for (let i = 0; i < 15; i++) {
      if (!((h >> (i + 2)) & 1)) continue;
      const col = i % 3;
      const y = Math.floor(i / 3);
      const o = 0.35 + ((h >> (i % 13)) & 3) * 0.2;
      out.push({ x: col, y, c: color, o });
      if (col !== 2) out.push({ x: 4 - col, y, c: color, o });
    }
    return out;
  }, [seed]);

  if (photo) {
    return (
      <img
        src={photo}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
      />
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="size-full" role="img" aria-label={alt}>
      <defs>
        <pattern id={`g${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" fill="none" style={{ stroke: 'rgb(var(--grid-rgb) / .08)' }} strokeWidth=".4" />
        </pattern>
        <radialGradient id={`r${uid}`} cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor={cells[0]?.c ?? '#c73a7b'} stopOpacity=".14" />
          <stop offset="100%" style={{ stopColor: 'var(--color-card)', stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <rect width="100" height="100" style={{ fill: 'var(--color-card)' }} />
      <rect width="100" height="100" fill={`url(#g${uid})`} />
      <rect width="100" height="100" fill={`url(#r${uid})`} />
      {/* corner ticks */}
      <path
        d="M30 30h4M30 30v4M70 30h-4M70 30v4M30 66h4M30 66v-4M70 66h-4M70 66v-4"
        style={{ stroke: 'rgb(var(--outline-rgb) / .3)' }}
        strokeWidth=".6"
        fill="none"
      />
      <g transform="translate(37 35)">
        {cells.map((cell, i) => (
          <rect
            key={i}
            x={cell.x * 5.6}
            y={cell.y * 5.6}
            width="4.4"
            height="4.4"
            rx=".8"
            fill={cell.c}
            opacity={cell.o}
          />
        ))}
      </g>
    </svg>
  );
}
