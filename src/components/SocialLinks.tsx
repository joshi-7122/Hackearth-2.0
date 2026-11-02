import { resolveHref } from '@/lib/placeholder';
import { cn } from '@/lib/cn';
import type { SocialLink } from '@/types';
import { Icon } from './ui/Icon';

/** Renders live links for real URLs; placeholders render as inert, dimmed icons. */
export function SocialLinks({
  links,
  size = 'md',
  className,
  owner,
}: {
  links: SocialLink[];
  size?: 'sm' | 'md';
  className?: string;
  owner?: string;
}) {
  const box = size === 'sm' ? 'size-8' : 'size-10';
  const icon = size === 'sm' ? 14 : 16;
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {links.map((l) => {
        const href = resolveHref(l.url);
        const label = owner ? `${owner} on ${l.label}` : l.label;
        const cls = cn(
          'grid place-items-center rounded-full border border-line-strong transition-colors duration-300',
          box,
        );
        return (
          <li key={l.platform + l.url}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(cls, 'text-ink-muted hover:border-brand hover:bg-brand hover:text-on-brand')}
              >
                <Icon name={l.platform} size={icon} />
              </a>
            ) : (
              <span
                role="img"
                aria-label={`${label} (link not set yet)`}
                title={`${l.label}: ${l.url}`}
                className={cn(cls, 'border-dashed text-ink-subtle/60')}
              >
                <Icon name={l.platform} size={icon} />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
