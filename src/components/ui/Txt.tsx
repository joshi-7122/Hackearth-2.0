import { Fragment } from 'react';
import { splitPlaceholders } from '@/lib/placeholder';

/**
 * Renders data-driven text. Any "[BRACKETED]" segment is styled as an
 * organizer placeholder so unfinished content is easy to spot and replace.
 */
export function Txt({ children, wrap = false }: { children: string; wrap?: boolean }) {
  return (
    <>
      {splitPlaceholders(children).map((seg, i) =>
        seg.placeholder ? (
          <span key={i} className={wrap ? 'ph ph-wrap' : 'ph'} title="Placeholder — edit in src/data">
            {seg.text}
          </span>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        ),
      )}
    </>
  );
}
