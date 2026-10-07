import Icon from '../Icon/Icon';
import './Tag.css';

/** Ejes del máster de Figma (Tag). */
export const TYPES = ['Transaction', 'New', 'Aseptic'];
export const SIZES = ['XL', 'L', 'XS'];

// Estilo de texto e icono X por tamaño (Figma: XL Body/02 + X 20 · L Labels/02 + X 16 · XS Labels/01 + X 12)
const TEXT_STYLE = { XL: 'ts-body-02', L: 'ts-labels-02', XS: 'ts-labels-01' };
const ICON_SIZE = { XL: 'S', L: 'XS', XS: 'XXS' };

/**
 * Etiqueta corta. `Transaction` (fondo base y borde), `New` (fondo de acento, p. ej. "NUEVO") y
 * `Aseptic` (solo borde). Con `removable` muestra una X; si además recibe `onRemove`, la X es un botón.
 */
export default function Tag({
  text,
  children,
  type = 'Transaction',
  size = 'L',
  removable = false,
  onRemove,
  removeLabel = 'Quitar',
  theme,
  className = '',
  ...rest
}) {
  const label = children ?? text ?? (type === 'New' ? 'NUEVO' : 'LABEL');
  const showX = removable && type !== 'New';
  const cls = ['tag', `tag--${type.toLowerCase()}`, `tag--${size.toLowerCase()}`, TEXT_STYLE[size] || TEXT_STYLE.L, className]
    .filter(Boolean).join(' ');
  return (
    <span className={cls} data-theme={theme} {...rest}>
      <span className="tag__text">{label}</span>
      {showX && (onRemove
        ? <button type="button" className="tag__remove" aria-label={`${removeLabel} ${label}`} onClick={onRemove}><Icon name="x" size={ICON_SIZE[size]} /></button>
        : <Icon name="x" size={ICON_SIZE[size]} />)}
    </span>
  );
}
