import Icon from '../Icon/Icon';
import './ButtonActionLink.css';

/** Ejes del máster de Figma (Button-Action-Link). */
export const SIZES = ['L', 'M', 'S'];
export const TYPES = ['Default', 'Hover', 'Focus', 'Disabled'];

// Estilo de texto por tamaño (Figma: L → CTA/03 · M → CTA/02 · S → CTA/01)
const TEXT_STYLE = { L: 'ts-cta-03', M: 'ts-cta-02', S: 'ts-cta-01' };

/**
 * Enlace de acción: texto en mayúsculas subrayado, con icono opcional a cada lado.
 * Es `<a>` si recibe `href` y `<button>` si no. Hover, foco y desactivado son estados nativos
 * (:hover, :focus-visible, disabled); `state` solo fuerza la apariencia para documentación.
 */
export default function ButtonActionLink({
  text = 'Button',
  children,
  size = 'L',
  href,
  disabled = false,
  showIconLeft = false,
  showIconRight = false,
  iconLeft = 'star',
  iconRight = 'arrow-right',
  state,
  theme,
  className = '',
  ...rest
}) {
  const isDisabled = disabled || state === 'Disabled';
  const cls = [
    'button-action-link',
    `button-action-link--${size.toLowerCase()}`,
    TEXT_STYLE[size] || TEXT_STYLE.L,
    state && state !== 'Default' && state !== 'Disabled' ? `is-${state.toLowerCase()}` : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {showIconLeft && <Icon name={iconLeft} size="S" />}
      <span className="button-action-link__text">{children ?? text}</span>
      {showIconRight && <Icon name={iconRight} size="S" />}
    </>
  );

  if (href) {
    return (
      <a
        className={cls}
        href={isDisabled ? undefined : href}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        data-theme={theme}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} disabled={isDisabled} data-theme={theme} {...rest}>
      {content}
    </button>
  );
}
