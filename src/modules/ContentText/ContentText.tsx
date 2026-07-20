import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import type { ThemeName } from '@/modules/SectionHero';

export interface ContentTextProps { title?: ReactNode; children: ReactNode; columns?: 1 | 2; theme?: ThemeName; className?: string; }

/** Módulo Content / Text only — bloque de texto (prosa) a 1 o 2 columnas. */
export function ContentText({ title, children, columns = 1, theme = 'light-white', className }: ContentTextProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-11)">
        <div className="grid-12">
          <div className="col-span-full m:col-span-10 m:col-start-2 flex flex-col gap-fx-5">
            {title && <Title level={4} as="h2">{title}</Title>}
            <div className={cn('type-body-4 flex flex-col gap-fx-4 text-(--text-neutral-1)', columns === 2 && 'm:columns-2 m:gap-(--grid-gutter)')}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContentText;
