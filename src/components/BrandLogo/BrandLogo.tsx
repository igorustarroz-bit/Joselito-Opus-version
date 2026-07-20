import type { SVGProps } from 'react';
import { cn } from '@/lib/cn';
import { brandLogos } from './logos';

export type BrandLogoVariant = 'horizontal' | 'isotype';

export interface BrandLogoProps extends Omit<SVGProps<SVGSVGElement>, 'height'> {
  /** Variante: logotipo horizontal o isotipo (símbolo). */
  variant?: BrandLogoVariant;
  /** Alto en px; el ancho se calcula por proporción. */
  height?: number;
  /** Texto accesible. Por defecto "Joselito". */
  title?: string;
}

/**
 * BrandLogo — logo de marca de Joselito. No es un icono, pero funciona igual:
 * SVG inline recoloreable con `currentColor`. Variantes horizontal e isotipo.
 * Origen: Figma → Brand Assets → Brand Logo.
 */
export function BrandLogo({ variant = 'horizontal', height = 40, title = 'Joselito', className, ...props }: BrandLogoProps) {
  const logo = brandLogos[variant];
  return (
    <svg
      viewBox={logo.viewBox}
      height={height}
      width={Math.round(height * logo.ratio)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={cn('inline-block shrink-0', className)}
      dangerouslySetInnerHTML={{ __html: `<title>${title}</title>` + logo.markup }}
      {...props}
    />
  );
}

export default BrandLogo;
