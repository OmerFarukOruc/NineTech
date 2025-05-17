import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionContainer({ id, className, children, ...props }: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24 lg:py-32', className)}
      {...props}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
