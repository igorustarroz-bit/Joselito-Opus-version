import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import type { ThemeName } from '@/modules/SectionHero';

export interface NumberItem { title: ReactNode; description?: ReactNode; }

export interface ListNumbersProps {
  heading?: ReactNode;
  items: NumberItem[];
  columns?: 1 | 2 | 3;
  theme?: ThemeName;
  className?: string;
}

const COLS: Record<number, string> = { 1: '', 2: 'm:grid-cols-2', 3: 'm:grid-cols-2 lg:grid-cols-3' };

/**
 * Módulo List / Numbers — lista de pasos/hitos con número destacado, título y
 * descripción, en 1–3 columnas responsive.
 */
export function ListNumbers({ heading, items, columns = 3, theme = 'light-white', className }: ListNumbersProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        {heading && <Title level={5} as="h2" className="mb-(--space-8)">{heading}</Title>}
        <ol className={cn('grid grid-cols-1 gap-(--space-8) m-0 p-0 list-none', COLS[columns])}>
          {items.map((it, i) => (
            <li key={i} className="flex flex-col gap-fx-2 border-t border-(--stroke-neutral-3) pt-fx-4">
              <span className="type-title-7 text-(--text-accent-base)">{String(i + 1).padStart(2, '0')}</span>
              <span className="type-title-2">{it.title}</span>
              {it.description && <p className="type-body-3 m-0 text-(--text-neutral-1)">{it.description}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ListNumbers;
