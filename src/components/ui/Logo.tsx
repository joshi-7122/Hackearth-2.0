import { cn } from '@/lib/cn';
import { hackathonInfo } from '@/data/hackathon';

/** Brand mark: the HackEarth leaf (from the deck cover) in a magenta-ringed seal. */
export function LogoMark({ size = 30, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="15" fill="#392f73" />
      <circle cx="16" cy="16" r="12.6" stroke="#c73a7b" strokeWidth="1.2" strokeDasharray="2.2 2.2" />
      <path d="M9.5 21.5C9.5 14 14 9.6 22.5 9c-.4 8.3-4.7 12.6-12.4 12.5z" fill="#00a155" />
      <path d="M9.5 21.5 18 13" stroke="#fcf7eb" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="font-display text-[1.2rem] leading-none tracking-[-0.005em] text-indigo">
        <span className="text-brand">{hackathonInfo.prefix}</span> {hackathonInfo.name}
        <span className="ml-1 text-brand">{hackathonInfo.edition}</span>
      </span>
    </span>
  );
}
