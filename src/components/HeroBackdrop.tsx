import { Dots, Swoosh } from './ui/Decor';

/**
 * Shared backdrop for the hero + organizers band: the deck's cream paper
 * with lavender and blush washes, corner arcs and dot clusters. Sits behind
 * both sections so they read as one continuous opening scene.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Off-white stage for the smoke (light theme) */}
      <div className="absolute inset-0 bg-[#faf8f4] dark:hidden" />
      {/* Washes — kept faint so the smoke colours stay clean */}
      <div className="absolute -top-32 right-[-10%] size-[30rem] rounded-full bg-blush/25 blur-3xl dark:bg-blush/60" />
      <div className="absolute top-[45%] -left-48 size-[38rem] rounded-full bg-lavender/30 blur-3xl dark:bg-lavender/70" />
      <div className="absolute right-[8%] bottom-[-12rem] size-[30rem] rounded-full bg-blush/20 blur-3xl dark:bg-blush/45" />
      {/* Faint paper grid that fades out toward the edges */}
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_65%,#000_10%,transparent_75%)]" />
      {/* Deck corner arcs + dot clusters */}
      <Swoosh className="absolute -top-6 -right-10 w-[22rem] max-md:w-52" />
      <Swoosh flip className="absolute bottom-16 -left-16 hidden w-80 rotate-180 lg:block" />
      <Dots className="absolute top-[34%] left-[3%] hidden h-14 w-24 opacity-60 lg:block" />
      <Dots className="absolute right-[4%] bottom-10 hidden h-12 w-24 opacity-50 md:block" />
      {/* Fade into the plain paper of the next section — no hard edge */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
