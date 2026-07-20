import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';
import type { ThemeName } from '@/modules/SectionHero';

export interface ContentImageProps {
  image: ReactNode;
  ratio?: AspectRatioValue;
  caption?: ReactNode;
  /** full = ancho completo del wrapper; contained = ancho de contenido. */
  width?: 'contained' | 'full';
  theme?: ThemeName;
  className?: string;
}

/** Módulo Content / Image only — imagen destacada con pie opcional. */
export function ContentImage({ image, ratio = '16:9', caption, width = 'contained', theme = 'light-white', className }: ContentImageProps) {
  const inner = (
    <figure className="m-0 flex flex-col gap-fx-3">
      <AspectRatio ratio={ratio} className="bg-(--bg-neutral-1)">{image}</AspectRatio>
      {caption && <figcaption className="type-label-2 text-(--text-neutral-1)">{caption}</figcaption>}
    </figure>
  );
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className={cn(width === 'full' ? 'grid-wrapper' : 'grid-wrapper', 'py-(--space-11)')}>
        {width === 'full' ? inner : (
          <div className="grid-12"><div className="col-span-full m:col-span-10 m:col-start-2">{inner}</div></div>
        )}
      </div>
    </section>
  );
}
export default ContentImage;
