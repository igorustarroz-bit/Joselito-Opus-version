import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Icon, type IconName } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface Characteristic { icon?: IconName; title: ReactNode; description?: ReactNode; }

export interface ListCharacteristicsProps {
  heading?: ReactNode;
  items: Characteristic[];
  columns?: 2 | 3 | 4;
  theme?: ThemeName;
  className?: string;
}

const COLS: Record<number, string> = { 2: 'm:grid-cols-2', 3: 'm:grid-cols-2 lg:grid-cols-3', 4: 'm:grid-cols-2 lg:grid-cols-4' };

/**
 * Módulo List / Characteristics — rejilla de características (icono + título +
 * descripción), responsive.
 */
export function ListCharacteristics({ heading, items, columns = 3, theme = 'light-white', className }: ListCharacteristicsProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        {heading && <Title level={5} as="h2" className="mb-(--space-8)">{heading}</Title>}
        <ul className={cn('grid grid-cols-1 gap-(--space-8) m-0 p-0 list-none', COLS[columns])}>
          {items.map((it, i) => (
            <li key={i} className="flex flex-col gap-fx-3">
              {it.icon && <span className="text-(--stroke-accent-base)"><Icon name={it.icon} size="l" /></span>}
              <span className="type-title-2">{it.title}</span>
              {it.description && <p className="type-body-3 m-0 text-(--text-neutral-1)">{it.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ListCharacteristics;
