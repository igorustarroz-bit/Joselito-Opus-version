import './Button.css';
import Icon from '../Icon/Icon.jsx';

/**
 * UI02-Button — botón principal. Tres tipos (Primary/Secondary/Terciary),
 * tamaños XS–L y estados (hover/focus/selected/disabled) fieles a Figma.
 * Rectangular, texto CTA en mayúsculas. Iconos opcionales a izquierda/derecha.
 */
export default function Button({
  children,
  type = 'primary',
  size = 'm',
  selected = false,
  disabled = false,
  iconLeft,
  iconRight,
  className = '',
  ...rest
}) {
  const iconSize = size === 'xs' || size === 's' ? 'XS' : 'S';
  return (
    <button
      type="button"
      className={`jl-btn jl-btn--${type} jl-btn--${size} ${className}`}
      data-selected={selected ? 'true' : undefined}
      disabled={disabled}
      {...rest}
    >
      {iconLeft && <span className="jl-btn__icon"><Icon name={iconLeft} size={iconSize} /></span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="jl-btn__icon"><Icon name={iconRight} size={iconSize} /></span>}
    </button>
  );
}
