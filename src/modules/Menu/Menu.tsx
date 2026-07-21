import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import { ActionLink } from '@/components/ActionLink';
import { AspectRatio } from '@/components/AspectRatio';
import type { ThemeName } from '@/modules/SectionHero';

export interface MenuItem { label: ReactNode; href?: string; active?: boolean; }
export interface MenuPromo { title: ReactNode; description?: ReactNode; linkLabel?: string; linkHref?: string; }

export interface MenuProps {
  open?: boolean;
  /** Columna de categorías (el activo se resalta con flecha). */
  items?: MenuItem[];
  /** Imagen destacada del panel. */
  image?: ReactNode;
  /** Bloque promocional a la derecha. */
  promo?: MenuPromo;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Menu (fiel al master) — mega-menú desplegable: columna de categorías
 * (el item activo en negro con flecha, el resto atenuados) + imagen destacada +
 * bloque promocional con enlace "descubre más". Se muestra bajo la Navigation.
 */
export function Menu({ open = true, items = [], image, promo, theme = 'light-white', className }: MenuProps) {
  if (!open) return null;
  return (
    <div data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex flex-col items-start justify-between gap-(--space-8) py-(--space-8) m:flex-row">
        <div className="flex w-full flex-col gap-(--space-8) m:w-auto m:flex-row m:gap-(--space-9)">
          <ul className="flex w-full flex-col gap-fx-1 m:w-[315px] m-0 p-0 list-none">
            {items.map((it, i) => (
              <li key={i}>
                <a
                  href={it.href ?? '#'}
                  aria-current={it.active ? 'true' : undefined}
                  className={cn(
                    'type-body-2 inline-flex items-center gap-fx-1 no-underline',
                    it.active ? 'text-(--text-base)' : 'text-(--text-neutral-3) hover:text-(--text-base)',
                  )}
                >
                  {it.active && <Icon name="ArrowRight" size="xs" />}
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
          {image && (
            <div className="w-full m:w-[315px]">
              <AspectRatio ratio="3:4" className="bg-(--bg-neutral-1)">{image}</AspectRatio>
            </div>
          )}
        </div>
        {promo && (
          <div className="flex w-full flex-col gap-fx-6 m:w-[316px]">
            <div className="flex flex-col gap-fx-2">
              <p className="type-body-2 m-0 text-(--text-base)">{promo.title}</p>
              {promo.description && <p className="type-body-2 m-0 text-(--text-neutral-2)">{promo.description}</p>}
            </div>
            {promo.linkLabel && <ActionLink href={promo.linkHref ?? '#'} size="s" className="self-start">{promo.linkLabel}</ActionLink>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
