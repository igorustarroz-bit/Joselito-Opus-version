import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';
import type { ThemeName } from '@/modules/SectionHero';

export interface GalleryItem { image: ReactNode; caption?: ReactNode; ratio?: AspectRatioValue; }

export interface CardsGalleryProps {
  heading?: ReactNode;
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  theme?: ThemeName;
  className?: string;
}

const COLS: Record<number, string> = { 2: 'm:grid-cols-2', 3: 'm:grid-cols-2 lg:grid-cols-3', 4: 'm:grid-cols-2 lg:grid-cols-4' };

/**
 * Módulo Cards / Gallery — galería de imágenes en rejilla responsive con pie
 * opcional por imagen.
 */
export function CardsGallery({ heading, items, columns = 3, theme = 'light-white', className }: CardsGalleryProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        {heading && <Title level={5} as="h2" className="mb-(--space-8)">{heading}</Title>}
        <div className={cn('grid grid-cols-1 gap-(--grid-gutter) gap-y-(--space-8)', COLS[columns])}>
          {items.map((it, i) => (
            <figure key={i} className="m-0 flex flex-col gap-fx-2">
              <AspectRatio ratio={it.ratio ?? '4:3'} className="bg-(--bg-neutral-1)">{it.image}</AspectRatio>
              {it.caption && <figcaption className="type-label-2 text-(--text-neutral-1)">{it.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardsGallery;
