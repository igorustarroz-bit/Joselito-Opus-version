import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface CategoryItem { image: ReactNode; label: ReactNode; href?: string; ratio?: AspectRatioValue; }

export interface CardsCategoriesProps {
  heading?: ReactNode;
  items: CategoryItem[];
  columns?: 2 | 3 | 4;
  theme?: ThemeName;
  className?: string;
}

const COLS: Record<number, string> = { 2: 'm:grid-cols-2', 3: 'm:grid-cols-2 lg:grid-cols-3', 4: 'm:grid-cols-2 lg:grid-cols-4' };

/**
 * Módulo Cards / Categories — mosaicos de categoría (imagen con título superpuesto
 * y flecha), enlazables, en rejilla responsive.
 */
export function CardsCategories({ heading, items, columns = 3, theme = 'light-white', className }: CardsCategoriesProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        {heading && <Title level={5} as="h2" className="mb-(--space-8)">{heading}</Title>}
        <div className={cn('grid grid-cols-1 gap-(--grid-gutter) gap-y-(--space-8)', COLS[columns])}>
          {items.map((it, i) => (
            <a key={i} href={it.href ?? '#'} className="group relative block overflow-hidden no-underline">
              <AspectRatio ratio={it.ratio ?? '3:4'} className="bg-(--bg-neutral-1)">{it.image}</AspectRatio>
              <span className="absolute inset-0 bg-(--bg-overlay) opacity-60 transition-opacity group-hover:opacity-80" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-fx-3 p-fx-5 text-(--text-always-white)">
                <span className="type-title-3">{it.label}</span>
                <Icon name="ArrowRight" size="m" className="transition-transform group-hover:translate-x-fx-1" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardsCategories;
