import type { ElementType, ReactNode, CSSProperties } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps {
  as?: ElementType;
  children: ReactNode;
  /** Stagger index — each step adds 70ms delay. */
  i?: number;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ as: Tag = 'div', children, i = 0, className, style }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} data-reveal="" className={className} style={{ ...style, ['--i' as string]: i }}>
      {children}
    </Tag>
  );
}
