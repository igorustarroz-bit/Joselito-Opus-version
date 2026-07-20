import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import type { ThemeName } from '@/modules/SectionHero';

export interface CardsGridProps {
  title?: ReactNode;
  /** Tarjetas (CardLink, CardProduct…). */
  children: ReactNode;
  /** Columnas desde el breakpoint M. */
  columns?: 2 | 3 | 4;
  theme?: ThemeName;
  className?: string;
}

const COLS: Record<number, string> = {
  2: 'm:grid-cols-2',
  3: 'm:grid-cols-2 lg:grid-cols-3',
  4: 'm:grid-cols-2 lg:grid-cols-4',
};

/**
 * Módulo Cards / Links — rejilla responsive de tarjetas con título opcional.
 * 1 columna en móvil; 2–4 desde los breakpoints M/LG.
 */
export function CardsGrid({ title, children, columns = 3, theme = 'light-white', className }: CardsGridProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        {title && <Title level={5} as="h2" className="mb-(--space-8)">{title}</Title>}
        <div className={cn('grid grid-cols-1 gap-(--grid-gutter) gap-y-(--space-8)', COLS[columns])}>
          {children}
        </div>
      </div>
    </section>
  );
}

export default CardsGrid;
