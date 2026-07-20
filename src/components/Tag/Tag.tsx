import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type TagType = 'transaction' | 'new' | 'aseptic';
export type TagSize = 'l' | 'xs';

const TYPE_CLASSES: Record<TagType, string> = {
  transaction: 'bg-transparent border-(--stroke-neutral-2) text-(--text-base)',
  new: 'bg-(--bg-accent-base) border-transparent text-(--text-always-white)',
  aseptic: 'bg-(--bg-neutral-1) border-transparent text-(--text-base)',
};

const SIZE_CLASSES: Record<TagSize, string> = {
  l: 'h-9 px-3 type-label-2',
  xs: 'h-6 px-2 type-label-1',
};

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tipo visual (Figma → UI12-Tag). */
  type?: TagType;
  /** Tamaño. */
  size?: TagSize;
  children?: ReactNode;
}

/**
 * Tag (UI12) — etiqueta breve. Tipos Transaction (borde), New (relleno) y
 * Aseptic (fondo sutil); tamaños L y XS. Colores desde tokens semánticos.
 */
export function Tag({ type = 'transaction', size = 'l', className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center border uppercase whitespace-nowrap',
        SIZE_CLASSES[size],
        TYPE_CLASSES[type],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Tag;
