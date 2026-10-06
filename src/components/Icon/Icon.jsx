import './Icon.css';

// Todos los iconos de Figma (Brand Assets › Icons) como componentes SVGR. Color = currentColor.
const modules = import.meta.glob('../../assets/icons/*.svg', { query: '?react', import: 'default', eager: true });
export const ICONS = Object.fromEntries(Object.entries(modules).map(([p, C]) => [p.split('/').pop().replace(/\.svg$/, ''), C]));
export const ICON_NAMES = Object.keys(ICONS).sort();

/** Tamaños del máster "Icon Sizer" de Figma (propiedad Size). */
export const SIZES = ['L', 'M', 'S', 'XS', 'XXS'];

/**
 * Icono del sistema. Hereda el color del texto (currentColor); el tamaño sigue Icon Sizer.
 * Decorativo por defecto (aria-hidden); pasa `title` si el icono transmite información.
 */
export default function Icon({ name = 'star', size = 'M', title, className = '', ...rest }) {
  const Svg = ICONS[name];
  if (!Svg) return null;
  const a11y = title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true };
  return <Svg className={['icon', `icon--${size.toLowerCase()}`, className].filter(Boolean).join(' ')} focusable="false" {...a11y} {...rest} />;
}
