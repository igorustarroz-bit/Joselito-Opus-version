import type { SVGProps } from 'react';
import { cn } from '@/lib/cn';
import { icons, ICON_VIEWBOX, type IconName } from './icons';

/** Tamaños de icono (Figma → Brand Assets → Icon Sizer). */
export const ICON_SIZES = { xxs: 12, xs: 16, s: 20, m: 24, l: 32 } as const;
export type IconSize = keyof typeof ICON_SIZES;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Nombre del icono (lista oficial de Brand Assets). */
  name: IconName;
  /** Tamaño según Icon Sizer. */
  size?: IconSize;
  /** Texto accesible; si se omite, el icono es decorativo (aria-hidden). */
  title?: string;
}

/**
 * Icon — renderiza un icono del set oficial. Hereda el color con `currentColor`
 * (se recolorea con `color` / clases de texto). Ningún componente debe usar
 * iconos fuera de esta lista.
 */
export function Icon({ name, size = 'm', title, className, ...props }: IconProps) {
  const px = ICON_SIZES[size];
  const markup = icons[name];
  return (
    <svg
      width={px}
      height={px}
      viewBox={ICON_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${title}</title>` : '') + markup }}
      {...props}
    />
  );
}

export default Icon;
