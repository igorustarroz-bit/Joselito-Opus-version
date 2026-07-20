import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface ContentImageProps {
  /** Una o dos imágenes (fiel a las variantes Images=1 / Images=2). */
  images: ReactNode | ReactNode[];
  ratio?: AspectRatioValue;
  /** Muestra un botón de reproducción centrado (contenido de vídeo). */
  video?: boolean;
  /** Pie opcional. */
  caption?: ReactNode;
  theme?: ThemeName;
  className?: string;
}

function PlayButton() {
  return (
    <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-(--stroke-neutral-3) bg-(--bg-always-white) text-(--text-always-black)">
      <Icon name="Play" size="s" title="Reproducir" />
    </span>
  );
}

/**
 * Módulo Content / Image only (fiel al master) — imagen(es) centrada(s) sobre el
 * fondo del tema, con botón de reproducción opcional (vídeo). Soporta 1 o 2 imágenes.
 */
export function ContentImage({ images, ratio = '16:9', video = false, caption, theme = 'light-white', className }: ContentImageProps) {
  const list = Array.isArray(images) ? images : [images];
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex flex-col items-center gap-fx-3 py-(--space-14)">
        <div className={cn('flex w-full justify-center gap-(--grid-gutter)', list.length > 1 && 'flex-col m:flex-row')}>
          {list.map((img, i) => (
            <div key={i} className={cn('relative', list.length > 1 ? 'w-full m:flex-1' : 'w-full max-w-[660px]')}>
              <AspectRatio ratio={ratio} className="bg-(--bg-neutral-1)">{img}</AspectRatio>
              {video && i === 0 && <PlayButton />}
            </div>
          ))}
        </div>
        {caption && <p className="type-label-2 m-0 text-(--text-neutral-1)">{caption}</p>}
      </div>
    </section>
  );
}

export default ContentImage;
