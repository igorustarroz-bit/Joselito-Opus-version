import Icon from '../Icon/Icon';
import './Button.css';

/** Ejes del máster de Figma (Button). */
export const TYPES = ['Primary', 'Secondary', 'Terciary'];
export const SIZES = ['L', 'M', 'S', 'XS'];
export const STATES = ['Default', 'Hover', 'Focus', 'Selected', 'Disabled'];

// Estilo de texto e icono por tamaño (Figma: L/M → CTA/03 · S → CTA/02 · XS → CTA/01; iconos 24/20/20/16)
const TEXT_STYLE = { L: 'ts-cta-03', M: 'ts-cta-03', S: 'ts-cta-02', XS: 'ts-cta-01' };
const ICON_SIZE = { L: 'M', M: 'S', S: 'S', XS: 'XS' };

/**
 * Botón de texto con iconos opcionales. Hover, foco y desactivado son estados nativos;
 * `selected` se expone como `aria-pressed`; `state` solo fuerza la apariencia para documentación.
 * Es `<a>` con `href` y `<button>` sin él. Ancho según contenido con ancho mínimo por tamaño.
 */
export default function Button({
  text = 'Button',
  children,
  type = 'Primary',
  size = 'L',
  href,
  htmlType = 'button',
  showIconLeft = false,
  showIconRight = false,
  iconLeft = 'calendar-blank',
  iconRight = 'arrow-right',
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
    'button',
    `button--${type.toLowerCase()}`,
    `button--${size.toLowerCase()}`,
    TEXT_STYLE[size] || TEXT_STYLE.L,
    state === 'Hover' ? 'is-hover' : '',
    state === 'Focus' ? 'is-focus' : '',
    isSelected ? 'is-selected' : '',
    className,
  ].filter(Boolean).join(' ');
  const content = (
    <>
      {showIconLeft && <Icon name={iconLeft} size={ICON_SIZE[size]} />}
      <span className="button__text">{children ?? text}</span>
      {showIconRight && <Icon name={iconRight} size={ICON_SIZE[size]} />}
    </>
  );
  if (href) {
    return (
      <a className={cls} href={isDisabled ? undefined : href} aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined} data-theme={theme} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type={htmlType} className={cls} aria-pressed={selected ? true : undefined} disabled={isDisabled}
      data-theme={theme} {...rest}>
      {content}
    </button>
  );
}
