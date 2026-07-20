import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface BreadcrumbProps {
  /** Etiqueta del enlace de vuelta a la sección/página anterior. */
  label: ReactNode;
  href?: string;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Navigation / Breadcrumb (fiel al master) — banda de 80px con un enlace
 * "volver": icono ArrowLeft + etiqueta (Body/03).
 */
export function Breadcrumb({ label, href = '#', theme = 'light-white', className }: BreadcrumbProps) {
  return (
    <nav data-theme={theme} aria-label="Volver" className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex h-20 items-center">
        <a href={href} className="group inline-flex items-end gap-fx-2 no-underline text-(--text-base)">
          <Icon name="ArrowLeft" size="m" className="transition-transform group-hover:-translate-x-fx-1" />
          <span className="type-body-3">{label}</span>
        </a>
      </div>
    </nav>
  );
}

export default Breadcrumb;
