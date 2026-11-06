import type { Person } from '@/types';
import { Avatar } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { SocialLinks } from './SocialLinks';
import { Txt } from './ui/Txt';
import { cn } from '@/lib/cn';

interface ProfileCardProps {
  person: Person;
  centered?: boolean;
}

/** Portrait card. On hover/focus, a glassmorphic overlay reveals the person's full details. */
export function ProfileCard({ person, centered = false }: ProfileCardProps) {
  return (
    <article className="group/card relative flex flex-col w-full">
      {/* Portrait box with hover details overlay */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-(--radius-card) border border-line bg-card transition-all duration-500 ease-(--ease-out-expo) group-hover/card:border-brand/60 group-hover/card:shadow-[0_16px_36px_-12px_rgb(199_58_123/0.35)]">
        {/* Avatar / Photo */}
        <div className="size-full transition-transform duration-700 ease-(--ease-out-expo) group-hover/card:scale-105">
          <Avatar seed={person.name + person.role + person.focus.join()} photo={person.photo} alt={`Portrait of ${person.name}`} />
        </div>

        {/* Soft bottom gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/85 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover/card:opacity-10"
        />

        {/* Default top badges */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1.5 transition-opacity duration-300 group-hover/card:opacity-0">
          {person.focus.map((f) => (
            <Badge key={f} className="bg-paper/75 backdrop-blur-md text-[0.68rem]">
              {f}
            </Badge>
          ))}
        </div>

        {/* Hover Details Overlay — revealed ONLY on hover/focus of this specific card */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-paper/98 via-paper/92 to-paper/40 p-4 xs:p-5 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-400 ease-(--ease-out-expo) group-hover/card:opacity-100 group-hover/card:pointer-events-auto group-focus-within/card:opacity-100 group-focus-within/card:pointer-events-auto">
          <div className="flex flex-col gap-2 translate-y-3 transition-transform duration-400 ease-(--ease-out-expo) group-hover/card:translate-y-0 group-focus-within/card:translate-y-0">
            {/* Focus Tags */}
            <div className="flex flex-wrap gap-1">
              {person.focus.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-brand/40 bg-brand/15 px-2 py-0.5 font-mono text-[0.62rem] font-medium tracking-wide text-brand-deep uppercase"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Name */}
            <h4 className="font-serif text-base xs:text-lg font-bold leading-tight text-indigo">
              <Txt>{person.name}</Txt>
            </h4>

            {/* Designation & Company */}
            <p className="text-xs font-medium text-ink-muted">
              <Txt>{person.designation}</Txt> · <Txt>{person.company}</Txt>
            </p>

            {/* Bio */}
            <p className="text-xs leading-relaxed text-ink line-clamp-3">
              <Txt wrap>{person.bio}</Txt>
            </p>

            {/* Social Links */}
            <div className="mt-1 pt-2 border-t border-line/60">
              <SocialLinks links={person.socials} size="sm" owner={person.name} />
            </div>
          </div>
        </div>
      </div>

      {/* Static summary below card */}
      <div className={cn('mt-3.5 flex flex-col transition-colors duration-300', centered ? 'items-center text-center' : 'items-start text-left')}>
        <h3 className="font-serif text-base sm:text-lg font-semibold text-indigo transition-colors duration-300 group-hover/card:text-brand">
          <Txt>{person.name}</Txt>
        </h3>
        <p className="mt-0.5 text-xs sm:text-sm text-ink-muted">
          <Txt>{person.designation}</Txt> · <Txt>{person.company}</Txt>
        </p>
      </div>
    </article>
  );
}
