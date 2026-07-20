import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { ThemeName } from '@/modules/SectionHero';

export interface FooterColumn { title: ReactNode; links: { label: ReactNode; href?: string }[]; }

export interface FooterProps {
  /** Logo o nombre de marca. */
  brand?: ReactNode;
  columns?: FooterColumn[];
  /** Iconos/enlaces sociales (p. ej. <a><Icon/></a>). */
  social?: ReactNode;
  copyright?: ReactNode;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Navigation / Footer — pie de página a 100% del viewport. Marca +
 * columnas de enlaces + social + copyright. Tema propio (oscuro por defecto).
 */
export function Footer({ brand, columns = [], social, copyright, theme = 'dark-black-neutral', className }: FooterProps) {
  return (
    <footer data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-13)">
        <div className="grid-12 gap-y-(--space-8)">
          <div className="col-span-full flex flex-col gap-fx-4 m:col-span-4">
            {brand && <div className="type-title-5">{brand}</div>}
            {social && <div className="flex gap-fx-3 text-(--stroke-base)">{social}</div>}
          </div>
          {columns.map((col, i) => (
            <nav key={i} className="col-span-6 flex flex-col gap-fx-3 m:col-span-2" aria-label={typeof col.title === 'string' ? col.title : undefined}>
              <span className="type-label-2 uppercase text-(--text-neutral-1)">{col.title}</span>
              <ul className="flex flex-col gap-fx-2 m-0 p-0 list-none">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a href={l.href ?? '#'} className="type-body-3 text-(--text-base) no-underline hover:text-(--text-hover)">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        {copyright && <div className="mt-(--space-10) border-t border-(--stroke-neutral-4) pt-fx-5 type-label-2 text-(--text-neutral-1)">{copyright}</div>}
      </div>
    </footer>
  );
}

export default Footer;
