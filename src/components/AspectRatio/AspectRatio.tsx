import type { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/cn';

/** Ratios disponibles (Figma → Foundations → Aspect Ratio). */
export const ASPECT_RATIOS = ['16:9', '3:2', '4:3', '1:1', '3:4', '2:3', '9:16'] as const;
export type AspectRatioValue = (typeof ASPECT_RATIOS)[number];

export interface AspectRatioProps {
  /** Proporción ancho:alto. */
  ratio?: AspectRatioValue;
  /** Contenido (imagen, vídeo, etc.). Se recorta al contenedor. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Mantiene una proporción fija de ancho:alto para su contenido.
 * Origen: Figma → Foundations → Aspect Ratio.
 */
export function AspectRatio({ ratio = '16:9', children, className, style }: AspectRatioProps) {
  const [w, h] = ratio.split(':').map(Number);
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      style={{ aspectRatio: `${w} / ${h}`, ...style }}
      data-ratio={ratio}
    >
      <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full [&>img]:object-cover [&>video]:object-cover">
        {children}
      </div>
    </div>
  );
}

export default AspectRatio;
