import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import type { ThemeName } from '@/modules/SectionHero';

export interface Characteristic { num?: ReactNode; title: ReactNode; text?: ReactNode; }

export interface ListCharacteristicsProps {
  heading?: ReactNode;
  items: Characteristic[];
  columns?: 2 | 3 | 4;
  theme?: ThemeName;
  className?: string;
}

const COLS: Record<number, string> = { 2: 'm:grid-cols-2', 3: 'm:grid-cols-3', 4: 'm:grid-cols-2 lg:grid-cols-4' };

/**
 * Módulo List / Characteristics (fiel al master) — cabecera (Title/04) + rejilla
 * de características: número (Body/06), título (Title/01) y texto (Body/05).
 */
export function ListCharacteristics({ heading, items, columns = 3, theme = 'light-white', className }: ListCharacteristicsProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex flex-col gap-fx-4 pt-(--space-14) pb-(--space-16)">
        {heading && <Title level={4} as="h2">{heading}</Title>}
        <ul className={cn('mt-(--space-8) grid grid-cols-1 gap-(--space-9) m-0 p-0 list-none', COLS[columns])}>
          {items.map((it, i) => (
            <li key={i} className="flex flex-col gap-fx-4">
              <div className="flex flex-col gap-fx-2">
                {it.num && <span className="type-body-6 text-(--text-neutral-1)">{it.num}</span>}
                <span className="type-title-1 text-(--text-base)">{it.title}</span>
              </div>
              {it.text && <p className="type-body-5 m-0 text-(--text-neutral-1)">{it.text}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ListCharacteristics;
