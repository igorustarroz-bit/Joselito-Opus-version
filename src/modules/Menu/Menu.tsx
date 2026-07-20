import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface MenuLink { label: ReactNode; href?: string; }

export interface MenuProps {
  open?: boolean;
  onClose?: () => void;
  brand?: ReactNode;
  links?: MenuLink[];
  secondary?: MenuLink[];
  footer?: ReactNode;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Menu — panel de navegación a pantalla completa (overlay) para móvil.
 * Enlaces primarios grandes + secundarios + zona de pie. Tema oscuro por defecto.
 */
export function Menu({ open = true, onClose, brand, links = [], secondary = [], footer, theme = 'dark-black-neutral', className }: MenuProps) {
  if (!open) return null;
  return (
    <div data-theme={theme} role="dialog" aria-modal="true" aria-label="Menú" className={cn('fixed inset-0 z-50 flex flex-col bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex h-20 items-center justify-between">
        <div className="type-title-3">{brand}</div>
        <ButtonIcon variant="terciary" size="s" label="Cerrar menú" icon={<Icon name="X" size="s" />} onClick={onClose} />
      </div>
      <nav className="grid-wrapper flex flex-1 flex-col justify-center gap-fx-4" aria-label="Menú principal">
        {links.map((l, i) => (
          <a key={i} href={l.href ?? '#'} className="type-title-6 text-(--text-base) no-underline hover:text-(--text-hover)">{l.label}</a>
        ))}
      </nav>
      {(secondary.length > 0 || footer) && (
        <div className="grid-wrapper flex flex-wrap items-center justify-between gap-fx-4 border-t border-(--stroke-neutral-3) py-(--space-8)">
          <div className="flex flex-wrap gap-fx-4">
            {secondary.map((l, i) => (
              <a key={i} href={l.href ?? '#'} className="type-body-3 text-(--text-neutral-1) no-underline hover:text-(--text-hover)">{l.label}</a>
            ))}
          </div>
          {footer}
        </div>
      )}
    </div>
  );
}

export default Menu;
