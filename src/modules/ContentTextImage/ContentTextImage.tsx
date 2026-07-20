import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';
import type { ThemeName } from '@/modules/SectionHero';

export type ContentTextImageType = 'left' | 'right' | 'half';

export interface ContentTextImageProps {
  /** Etiqueta superior (Body/03, gris, mayúsculas). */
  label?: ReactNode;
  /** Título (Title/03). */
  title: ReactNode;
  /** Cuerpo (Body/03). */
  body?: ReactNode;
  /** Botón secundario opcional. */
  ctaLabel?: string;
  onCta?: () => void;
  image?: ReactNode;
  imageRatio?: AspectRatioValue;
  /** Disposición (fiel al master): imagen a la izquierda, a la derecha o 50/50. */
  type?: ContentTextImageType;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Content / Text + Image (fiel al master) — imagen + bloque de texto
 * (label Body/03 gris, título Title/03, cuerpo Body/03, botón secundario).
 * Variantes: `left`, `right` (7/5) y `half` (6/6). Apila en móvil.
 */
export function ContentTextImage({ label, title, body, ctaLabel, onCta, image, imageRatio = '4:3', type = 'left', theme = 'light-white', className }: ContentTextImageProps) {
  const imageFirst = type !== 'right';
  const imageCols = type === 'half' ? 'm:col-span-6' : 'm:col-span-7';
  const textCols = type === 'half' ? 'm:col-span-6' : 'm:col-span-5';

  const imageEl = image && (
    <div className={cn('col-span-full', imageCols, !imageFirst && 'm:order-2')}>
      <AspectRatio ratio={imageRatio} className="bg-(--bg-neutral-1)">{image}</AspectRatio>
    </div>
  );
  const textEl = (
    <div className={cn('col-span-full flex flex-col gap-fx-6', textCols, !imageFirst && 'm:order-1')}>
      {label && <p className="type-body-3 m-0 uppercase text-(--text-neutral-2)">{label}</p>}
      <Title level={3} as="h2">{title}</Title>
      {body && <div className="type-body-3 flex flex-col gap-fx-3 text-(--text-neutral-1)">{body}</div>}
      {ctaLabel && <Button variant="secondary" size="s" className="mt-fx-4 self-start" onClick={onCta}>{ctaLabel}</Button>}
    </div>
  );

  return (
    <section data-theme={theme} className={cn('w-full border-b border-(--stroke-neutral-4) bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-15)">
        <div className="grid-12 items-center gap-y-(--space-8)">
          {imageFirst ? <>{imageEl}{textEl}</> : <>{textEl}{imageEl}</>}
        </div>
      </div>
    </section>
  );
}

export default ContentTextImage;
