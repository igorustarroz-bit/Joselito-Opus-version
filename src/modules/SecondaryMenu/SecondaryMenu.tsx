import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { ThemeName } from '@/modules/SectionHero';

export interface SecondaryMenuItem { label: ReactNode; href?: string; active?: boolean; }

export interface SecondaryMenuProps { items: SecondaryMenuItem[]; theme?: ThemeName; className?: string; }

/**
 * Módulo Navigation / Secondary menu (fiel al master) — subnavegación horizontal
 * CENTRADA con items (Body/03); el activo lleva subrayado (stroke base).
 * Scrollable si no cabe.
 */
export function SecondaryMenu({ items, theme = 'light-white', className }: SecondaryMenuProps) {
  return (
    <nav data-theme={theme} aria-label="Navegación secundaria" className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex justify-center overflow-x-auto pt-fx-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex gap-fx-8 m-0 p-0 list-none">
          {items.map((it, i) => (
            <li key={i}>
              <a
                href={it.href ?? '#'}
                aria-current={it.active ? 'true' : undefined}
                className={cn(
                  'type-body-3 inline-flex whitespace-nowrap border-b-2 pb-fx-3 no-underline text-(--text-base) hover:text-(--text-hover)',
                  it.active ? 'border-(--stroke-base)' : 'border-transparent',
                )}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default SecondaryMenu;
