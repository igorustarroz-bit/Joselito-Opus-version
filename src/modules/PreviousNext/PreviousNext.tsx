import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface PrevNextLink { label: ReactNode; href?: string; }

export interface PreviousNextProps {
  prev?: PrevNextLink;
  next?: PrevNextLink;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Navigation / PreviousNext (fiel al master) — navegación anterior/
 * siguiente: botón-icono cuadrado (64px, con borde) + etiqueta (Body/06) a cada
 * lado, con separador superior.
 */
export function PreviousNext({ prev, next, theme = 'light-white', className }: PreviousNextProps) {
  return (
    <nav data-theme={theme} aria-label="Anterior y siguiente" className={cn('w-full border-t border-(--stroke-neutral-3) bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex items-center justify-between gap-fx-4 py-(--space-13)">
        {prev ? (
          <a href={prev.href ?? '#'} className="group flex items-center gap-fx-8 no-underline text-(--text-base)">
            <span className="flex size-16 shrink-0 items-center justify-center border border-(--stroke-neutral-3) transition-colors group-hover:border-(--stroke-base)">
              <Icon name="ArrowLeft" size="m" />
            </span>
            <span className="type-body-6">{prev.label}</span>
          </a>
        ) : <span />}
        {next ? (
          <a href={next.href ?? '#'} className="group flex items-center justify-end gap-fx-8 text-right no-underline text-(--text-base)">
            <span className="type-body-6">{next.label}</span>
            <span className="flex size-16 shrink-0 items-center justify-center border border-(--stroke-neutral-3) transition-colors group-hover:border-(--stroke-base)">
              <Icon name="ArrowRight" size="m" />
            </span>
          </a>
        ) : <span />}
      </div>
    </nav>
  );
}

export default PreviousNext;
