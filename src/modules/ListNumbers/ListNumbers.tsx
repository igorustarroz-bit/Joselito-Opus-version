import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { ThemeName } from '@/modules/SectionHero';

export interface NumberItem { value: ReactNode; description?: ReactNode; }

export interface ListNumbersProps {
  heading?: ReactNode;
  items: NumberItem[];
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo List / Numbers (fiel al master) — cabecera + filas con un valor grande
 * (Title/05, serif) a la izquierda y una descripción (Body/05) a la derecha,
 * separadas por un filete superior. Apila en móvil.
 */
export function ListNumbers({ heading, items, theme = 'light-white', className }: ListNumbersProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper pt-(--space-14) pb-(--space-16)">
        {heading && <p className="type-title-1 mb-(--space-8)">{heading}</p>}
        <ul className="m-0 p-0 list-none">
          {items.map((it, i) => (
            <li key={i} className="flex flex-col gap-fx-4 border-t border-(--stroke-neutral-2) py-(--space-9) m:flex-row m:items-center m:gap-(--space-12)">
              <span className="type-title-5 flex-1">{it.value}</span>
              {it.description && <p className="type-body-5 m-0 text-(--text-base) m:w-[309px]">{it.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ListNumbers;
