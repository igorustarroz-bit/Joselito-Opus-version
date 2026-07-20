import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import { BrandLogo } from '@/components/BrandLogo';
import type { ThemeName } from '@/modules/SectionHero';

export interface NavItem { label: ReactNode; href?: string; active?: boolean; }

export interface NavigationProps {
  /** Marca centrada (por defecto el BrandLogo horizontal). */
  brand?: ReactNode;
  /** Enlaces de navegación (izquierda). */
  items?: NavItem[];
  /** Etiqueta del buscador (con icono). null para ocultarlo. */
  searchLabel?: string | null;
  /** Enlace de cuenta. null para ocultarlo. */
  accountLabel?: string | null;
  /** Cesta: etiqueta + nº de artículos. null para ocultarla. */
  cart?: { label: string; count?: number } | null;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Navigation (fiel al master) — cabecera a 100% del viewport: enlaces
 * (Body/02) a la izquierda, logo centrado y utilidades a la derecha (Buscar,
 * Cuenta, Cesta en color de acento).
 */
export function Navigation({
  brand = <BrandLogo height={26} />,
  items = [],
  searchLabel = 'Buscar',
  accountLabel = 'Cuenta',
  cart = { label: 'Cesta', count: 0 },
  theme = 'light-white',
  className,
}: NavigationProps) {
  return (
    <header data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper relative flex items-center justify-between py-fx-6">
        <nav className="hidden items-center gap-fx-5 m:flex" aria-label="Principal">
          {items.map((it, i) => (
            <a
              key={i}
              href={it.href ?? '#'}
              aria-current={it.active ? 'page' : undefined}
              className={cn('type-body-2 no-underline hover:text-(--text-hover)', it.active ? 'text-(--text-accent-base)' : 'text-(--text-base)')}
            >
              {it.label}
            </a>
          ))}
        </nav>

        <a href="#" aria-label="Inicio" className="absolute left-1/2 -translate-x-1/2 text-(--text-base)">{brand}</a>

        <div className="ml-auto flex items-center gap-fx-5">
          {searchLabel && (
            <button type="button" className="inline-flex items-center gap-fx-2 type-body-2 text-(--text-base) hover:text-(--text-hover) cursor-pointer">
              <Icon name="MagnifyingGlass" size="s" />
              <span className="hidden sm:inline">{searchLabel}</span>
            </button>
          )}
          {accountLabel && <a href="#" className="type-body-2 no-underline text-(--text-base) hover:text-(--text-hover)">{accountLabel}</a>}
          {cart && (
            <a href="#" className="type-body-2 no-underline text-(--text-accent-base) hover:text-(--text-hover)">
              {cart.label}{typeof cart.count === 'number' && <span> ({cart.count})</span>}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
