import { Fragment, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';

export interface Crumb { label: ReactNode; href?: string; }

export interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
}

/**
 * Módulo Navigation / Breadcrumb — ruta de navegación con separadores (Caret).
 * El último elemento es la página actual (aria-current).
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Miga de pan" className={cn('w-full', className)}>
      <ol className="flex flex-wrap items-center gap-fx-2 m-0 p-0 list-none type-label-2">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {last ? (
                  <span aria-current="page" className="text-(--text-neutral-1)">{c.label}</span>
                ) : (
                  <a href={c.href ?? '#'} className="text-(--text-base) no-underline hover:text-(--text-hover)">{c.label}</a>
                )}
              </li>
              {!last && <li aria-hidden className="text-(--text-neutral-2)"><Icon name="CaretRight" size="xxs" /></li>}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
