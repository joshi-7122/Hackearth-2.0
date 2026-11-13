import { roleLabels } from '@/data/people';
import type { Person } from '@/types';
import { SocialLinks } from './SocialLinks';
import { Txt } from './ui/Txt';
import { cn } from '@/lib/cn';

interface ProfileCardProps {
  person: Person;
  centered?: boolean;
}

/** Neutral silhouette shown until a real photo is supplied. */
function PhotoPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" className="size-full bg-[#efe3f1]" aria-hidden="true">
      <circle cx="50" cy="40" r="17" fill="#c9a8d4" />
      <path d="M18 100c0-19 14-32 32-32s32 13 32 32z" fill="#c9a8d4" />
    </svg>
  );
}

/**
 * Event card template (public/people/card-template.webp) with the person's
 * photo in the centre and their role printed in the bottom band; name,
 * position and LinkedIn sit underneath.
 */
export function ProfileCard({ person, centered = false }: ProfileCardProps) {
  return (
    <article className="group/card relative flex w-full flex-col">
      <div
        className="@container relative aspect-[336/508] overflow-hidden rounded-(--radius-card) border border-line bg-[#fdf9f8] bg-cover bg-center shadow-(--shadow-card) transition-all duration-500 ease-(--ease-out-expo) group-hover/card:-translate-y-1 group-hover/card:shadow-[0_16px_36px_-12px_rgb(199_58_123/0.45)]"
        style={{ backgroundImage: 'url(/people/card-template.webp)' }}
      >
        {/* Photo, centred where the template's title block was */}
        <div className="absolute top-[20.5%] left-[11.9%] h-[49.2%] w-[76.2%] overflow-hidden rounded-[6cqw] border-[1.2cqw] border-[#b0177e] bg-[#efe3f1] shadow-[0_6px_18px_-6px_rgb(92_14_96/0.55)]">
          {person.photo ? (
            <img
              src={person.photo}
              alt={`Portrait of ${person.name}`}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover/card:scale-105"
            />
          ) : (
            <PhotoPlaceholder />
          )}
        </div>

        {/* Role band */}
        <p className="absolute top-[90.4%] right-[3%] left-[3%] flex h-[6.5%] items-center justify-center font-label text-[7cqw] leading-none font-bold tracking-[0.03em] text-black uppercase">
          {roleLabels[person.role]}
        </p>
      </div>

      {/* Name, position, LinkedIn */}
      <div
        className={cn(
          'mt-3.5 flex gap-3',
          centered ? 'flex-col items-center text-center' : 'items-start justify-between text-left',
        )}
      >
        <div className="min-w-0">
          <h3 className="font-serif text-base font-semibold text-indigo transition-colors duration-300 group-hover/card:text-brand sm:text-lg">
            <Txt>{person.name}</Txt>
          </h3>
          <p className="mt-0.5 text-xs text-ink-muted sm:text-sm">
            <Txt>{person.designation}</Txt>
          </p>
        </div>
        <SocialLinks
          links={[{ platform: 'linkedin', url: person.linkedin, label: 'LinkedIn' }]}
          size="sm"
          owner={person.name}
          className="shrink-0"
        />
      </div>
    </article>
  );
}
