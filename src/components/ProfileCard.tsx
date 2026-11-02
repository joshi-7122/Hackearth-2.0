import type { Person } from '@/types';
import { Avatar } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { SocialLinks } from './SocialLinks';
import { Txt } from './ui/Txt';

/** Portrait card. On hover/focus (desktop) a panel rises with the bio and links. */
export function ProfileCard({ person }: { person: Person }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[16/11] overflow-hidden xs:aspect-[4/5] rounded-(--radius-card) border border-line bg-card transition-colors duration-500 group-hover:border-line-strong">
        <div className="size-full transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.04]">
          <Avatar seed={person.name + person.role + person.focus.join()} photo={person.photo} alt={`Portrait of ${person.name}`} />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper via-paper/10 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {person.focus.map((f) => (
            <Badge key={f} className="bg-paper/70 backdrop-blur-md">
              {f}
            </Badge>
          ))}
        </div>

        {/* Hover reveal — desktop */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-[calc(100%-0px)] flex-col gap-4 border-t border-line bg-paper/85 p-5 backdrop-blur-xl transition-transform duration-500 ease-(--ease-out-expo) group-focus-within:translate-y-0 group-hover:translate-y-0 md:flex">
          <p className="text-sm leading-relaxed text-ink-muted">
            <Txt wrap>{person.bio}</Txt>
          </p>
          <SocialLinks links={person.socials} size="sm" owner={person.name} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-serif text-lg font-semibold text-indigo">
          <Txt>{person.name}</Txt>
        </h3>
        <p className="mt-1 text-sm text-ink-muted">
          <Txt>{person.designation}</Txt> · <Txt>{person.company}</Txt>
        </p>
        {/* Touch devices: bio + links inline */}
        <div className="mt-3 flex flex-col gap-3 md:hidden">
          <p className="text-sm leading-relaxed text-ink-muted">
            <Txt wrap>{person.bio}</Txt>
          </p>
          <SocialLinks links={person.socials} size="sm" owner={person.name} />
        </div>
      </div>
    </article>
  );
}
