import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { ThemeName } from '@/modules/SectionHero';

export interface SecondaryMenuItem { label: ReactNode; href?: string; active?: boolean; }

export interface SecondaryMenuProps { items: SecondaryMenuItem[]; theme?: ThemeName; className?: string; }

/**
 * Módulo Navigation / Secondary menu — subnavegación horizontal (anclas de
 * sección) con item activo, scrollable en móvil.
 */
export function SecondaryMenu({ items, theme = 'light-white', className }: SecondaryMenuProps) {
  return (
    <nav data-theme={theme} aria-label="Navegación secundaria" className={cn('w-full border-b border-(--stroke-neutral-3) bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper">
        <ul className="flex gap-fx-6 overflow-x-auto m-0 p-0 list-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((it, i) => (
            <li key={i}>
              <a
                href={it.href ?? '#'}
                aria-current={it.active ? 'true' : undefined}
                className={cn(
                  'type-cta-s inline-flex h-14 items-center whitespace-nowrap border-b-2 uppercase no-underline',
                  it.active ? 'border-(--stroke-accent-base) text-(--text-base)' : 'border-transparent text-(--text-neutral-1) hover:text-(--text-base)',
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
