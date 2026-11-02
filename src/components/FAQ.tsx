import { useState } from 'react';
import { faqs } from '@/data/faqs';
import { Disclosure } from './ui/Disclosure';
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
          <p className="max-w-2xl pl-6 xs:pl-8 sm:pl-11 text-sm xs:text-base leading-relaxed text-ink-muted">
            <Txt wrap>{f.answer}</Txt>
          </p>
        </Disclosure>
      ))}
    </div>
  );
}
