import './BrandLogo.css';

// Todos los brand assets de Figma (Brand Assets: logos, sellos y firmas) como componentes SVGR.
const modules = import.meta.glob('../../assets/logos/*.svg', { query: '?react', import: 'default', eager: true });
export const LOGOS = Object.fromEntries(Object.entries(modules).map(([p, C]) => [p.split('/').pop().replace(/\.svg$/, ''), C]));
export const LOGO_NAMES = Object.keys(LOGOS).sort();
/** Monocromos (currentColor): logo de marca, partners y firmas. El resto conserva sus colores de marca. */
export const MONO = (name) => /^(brand-logo|logo-riu|logo-ufv|firma-)/.test(name);

/** Variantes del máster "Brand Logo" de Figma (propiedad Horizontal). */
export const HORIZONTAL = ['Yes', 'No'];
const SIZE = { Yes: [300, 200], No: [200, 200] };

/**
 * Logo de la marca (máster Brand Logo). Hereda el color del texto (`--texts-base` por defecto).
 * `width` escala el logo manteniendo la proporción del frame de Figma.
 */
export default function BrandLogo({ horizontal = 'Yes', width, title = 'Joselito', className = '', ...rest }) {
  const name = horizontal === 'No' ? 'brand-logo-vertical' : 'brand-logo-horizontal';
  const Svg = LOGOS[name];
  const [w, h] = SIZE[horizontal === 'No' ? 'No' : 'Yes'];
  const width0 = width ?? w;
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return (
    <Svg
      className={['brand-logo', `brand-logo--${horizontal === 'No' ? 'vertical' : 'horizontal'}`, className].filter(Boolean).join(' ')}
      width={width0}
      height={typeof width0 === 'number' ? Math.round((width0 * h) / w) : undefined}
      focusable="false"
      {...a11y}
      {...rest}
    />
  );
}

/** Cualquier brand asset por nombre de fichero (p. ej. `pefc-mark`, `firma-ferran-adria`). */
export function Logo({ name, width, title, className = '', ...rest }) {
  const Svg = LOGOS[name];
  if (!Svg) return null;
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  const kind = name.startsWith('firma-') ? 'signature' : MONO(name) ? 'mono' : 'color';
  return <Svg className={['logo', `logo--${kind}`, className].filter(Boolean).join(' ')} width={width} focusable="false" {...a11y} {...rest} />;
}
