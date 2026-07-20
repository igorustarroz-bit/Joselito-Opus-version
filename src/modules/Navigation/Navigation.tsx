import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { NavButton } from '@/components/NavButton';
import type { ThemeName } from '@/modules/SectionHero';

export interface NavItem { label: ReactNode; href?: string; selected?: boolean; onClick?: () => void; }

export interface NavigationProps {
  brand?: ReactNode;
  items?: NavItem[];
  /** Acciones a la derecha (p. ej. ButtonIcon de búsqueda o carrito). */
  actions?: ReactNode;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Navigation — barra de navegación superior a 100% del viewport: marca +
 * enlaces (NavButton) + acciones. Usa el wrapper de cabecera.
 */
export function Navigation({ brand, items = [], actions, theme = 'light-white', className }: NavigationProps) {
  return (
    <header data-theme={theme} className={cn('w-full border-b border-(--stroke-neutral-3) bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex h-20 items-center justify-between gap-fx-4">
        <div className="type-title-3 shrink-0">{brand}</div>
        <nav className="hidden items-center gap-fx-1 m:flex" aria-label="Principal">
          {items.map((it, i) => (
            <NavButton key={i} selected={it.selected} onClick={it.onClick}>{it.label}</NavButton>
          ))}
        </nav>
        <div className="flex items-center gap-fx-2">{actions}</div>
      </div>
    </header>
  );
}

export default Navigation;
