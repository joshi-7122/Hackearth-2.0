import { marqueeWords } from '@/data/hackathon';

/** Infinite kinetic word band. Duplicated track for a seamless loop; paused for reduced motion. */
export function Marquee() {
  const words = [...marqueeWords, ...marqueeWords, ...marqueeWords];
  const track = (hidden: boolean) => (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
      aria-hidden={hidden || undefined}
    >
      {words.map((w, i) => (
        <li key={i} className="flex items-center gap-10 md:gap-16">
          <span
            className={
              i % 2 === 0
                ? 'text-display text-[clamp(2.5rem,7vw,6rem)] text-ink'
                : 'text-display text-outline text-[clamp(2.5rem,7vw,6rem)]'
            }
          >
            {w}.
          </span>
          <span aria-hidden="true" className="size-3 rotate-45 bg-brand" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-line py-8 md:py-10">
      <p className="sr-only">Build. Break. Rebuild. Ship. Repeat.</p>
      <div className="flex w-max animate-marquee motion-reduce:animate-none" aria-hidden="true">
        {track(true)}
        {track(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}
