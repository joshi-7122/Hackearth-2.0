import { useState } from 'react';
import { faqs } from '@/data/faqs';
import { Disclosure } from './ui/Disclosure';
import { Icon } from './ui/Icon';
import { Txt } from './ui/Txt';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {faqs.map((f, i) => (
        <Disclosure
          key={f.question}
          id={`faq-${i}`}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
          header={
            <span className="flex items-baseline gap-5">
              <span className="w-6 shrink-0 font-mono text-xs text-ink-subtle">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-serif text-base xs:text-lg font-semibold text-indigo md:text-xl">{f.question}</span>
            </span>
          }
        >
          <div className="max-w-2xl pl-6 xs:pl-8 sm:pl-11">
            <p className="text-sm xs:text-base leading-relaxed text-ink-muted">
              <Txt wrap>{f.answer}</Txt>
            </p>
            {f.link && (
              <div className="mt-3.5">
                <a
                  href={f.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs xs:text-sm font-semibold text-brand-deep hover:bg-brand hover:text-on-brand transition-colors shadow-xs"
                >
                  <Icon name="download" size={14} />
                  <span>{f.link.label}</span>
                  <Icon name="arrowUpRight" size={13} />
                </a>
              </div>
            )}
          </div>
        </Disclosure>
      ))}
    </div>
  );
}
