import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import type { ThemeName } from '@/modules/SectionHero';

export interface ContentTitleProps { title: ReactNode; align?: 'left' | 'center'; level?: 3 | 4 | 5 | 6; theme?: ThemeName; className?: string; }

/** Módulo Content / Title — bloque de solo título de sección. */
export function ContentTitle({ title, align = 'left', level = 5, theme = 'light-white', className }: ContentTitleProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-10)">
        <div className={cn('grid-12')}>
          <div className={cn('col-span-full m:col-span-10', align === 'center' ? 'text-center m:col-start-2' : 'text-left')}>
            <Title level={level} as="h2">{title}</Title>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContentTitle;
