import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type TitleStyle = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Estilo tipográfico (type-title-N). */
  level?: TitleStyle;
  /** Etiqueta HTML a renderizar (por semántica). Por defecto deriva del nivel. */
  as?: ElementType;
}

/**
 * Title — encabezado que aplica un estilo de texto de título (type-title-*)
 * y color semántico. Separa el estilo visual de la etiqueta semántica (`as`).
 */
export function Title({ level = 4, as, className, children, ...props }: TitleProps) {
  const Tag = (as ?? (`h${Math.min(level, 6)}` as ElementType)) as ElementType;
  return (
    <Tag className={cn('type-title-' + level, 'text-(--text-base)', className)} {...props}>
      {children}
    </Tag>
  );
}

export default Title;
