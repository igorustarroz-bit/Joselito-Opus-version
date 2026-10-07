import Icon from '../Icon/Icon';
import './ButtonIcon.css';

/** Ejes del máster de Figma (Button-Icon). */
export const TYPES = ['Primary', 'Secondary', 'Terciary'];
export const SIZES = ['XL', 'L', 'M', 'S', 'XS'];
export const STATES = ['Default', 'Hover', 'Focussed', 'Selected', 'Disabled'];

// Tamaño del icono por tamaño de botón (Figma: XL 32 · L 24 · M 24 · S 20 · XS 16 → Icon Sizer)
const ICON_SIZE = { XL: 'L', L: 'M', M: 'M', S: 'S', XS: 'XS' };

/**
 * Botón cuadrado solo con icono. Hover, foco y desactivado son estados nativos (:hover,
 * :focus-visible, disabled); `selected` se expone como `aria-pressed`. `state` solo fuerza la
 * apariencia para documentación. Necesita `label` (nombre accesible) porque no lleva texto.
 */
export default function ButtonIcon({
  type = 'Primary',
  size = 'L',
  icon = 'arrow-right',
  label = 'Botón',
  href,
  selected = false,
  disabled = false,
  state,
  theme,
  className = '',
  ...rest
}) {
  const isDisabled = disabled || state === 'Disabled';
  const isSelected = selected || state === 'Selected';
  const cls = [
    'button-icon',
    `button-icon--${type.toLowerCase()}`,
    `button-icon--${size.toLowerCase()}`,
    state === 'Hover' ? 'is-hover' : '',
    state === 'Focussed' ? 'is-focus' : '',
    isSelected ? 'is-selected' : '',
    className,
  ].filter(Boolean).join(' ');
  const content = <Icon name={icon} size={ICON_SIZE[size] || 'M'} />;

  if (href) {
    return (
      <a className={cls} href={isDisabled ? undefined : href} aria-label={label} aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined} data-theme={theme} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} aria-label={label} aria-pressed={selected ? true : undefined}
      disabled={isDisabled} data-theme={theme} {...rest}>
      {content}
    </button>
  );
}
