import Horizontal from '../../assets/logos/logo-horizontal.svg?react';
import Isotipo from '../../assets/logos/logo-isotipo.svg?react';

/**
 * BrandLogo — logo de Joselito (Brand Assets de Figma).
 * Variantes: "horizontal" (wordmark + isotipo) e "isotipo" (marca circular).
 * Color por `currentColor` (adapta al subtema; por defecto texto base).
 * El tamaño se controla con `height` (el ancho es proporcional al viewBox).
 */
const VARIANTS = { horizontal: Horizontal, isotipo: Isotipo };

export default function BrandLogo({ variant = 'horizontal', height = 40, color, title = 'Joselito', className = '', ...rest }) {
  const Svg = VARIANTS[variant] ?? Horizontal;
  return (
    <Svg
      height={height}
      className={className}
      style={{ color, width: 'auto', display: 'block', ...rest.style }}
      role="img"
      aria-label={title}
      {...rest}
    />
  );
}
