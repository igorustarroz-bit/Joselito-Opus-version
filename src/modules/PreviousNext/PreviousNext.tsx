import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface PrevNextLink { label: ReactNode; caption?: ReactNode; href?: string; }

export interface PreviousNextProps {
  prev?: PrevNextLink;
  next?: PrevNextLink;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Navigation / PreviousNext — navegación anterior/siguiente entre páginas
 * o artículos, a 100% del viewport.
 */
export function PreviousNext({ prev, next, theme = 'light-white', className }: PreviousNextProps) {
  return (
    <nav data-theme={theme} aria-label="Anterior y siguiente" className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex items-stretch justify-between gap-fx-4 border-y border-(--stroke-neutral-3) py-(--space-8)">
        {prev ? (
          <a href={prev.href ?? '#'} className="group flex items-center gap-fx-3 no-underline text-(--text-base)">
            <Icon name="ArrowLeft" size="m" className="transition-transform group-hover:-translate-x-fx-1" />
            <span className="flex flex-col">
              {prev.caption && <span className="type-label-2 uppercase text-(--text-neutral-1)">{prev.caption}</span>}
              <span className="type-title-2 group-hover:text-(--text-hover)">{prev.label}</span>
            </span>
          </a>
        ) : <span />}
        {next ? (
          <a href={next.href ?? '#'} className="group flex items-center gap-fx-3 text-right no-underline text-(--text-base)">
            <span className="flex flex-col">
              {next.caption && <span className="type-label-2 uppercase text-(--text-neutral-1)">{next.caption}</span>}
              <span className="type-title-2 group-hover:text-(--text-hover)">{next.label}</span>
            </span>
            <Icon name="ArrowRight" size="m" className="transition-transform group-hover:translate-x-fx-1" />
          </a>
        ) : <span />}
      </div>
    </nav>
  );
}

export default PreviousNext;
