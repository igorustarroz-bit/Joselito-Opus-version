import './NavButton.css';
import Icon from '../Icon/Icon.jsx';

/**
 * UI01-Nav-Button — botón de navegación (tamaño fijo XS). Texto en mayúsculas,
 * caret derecho por defecto (indica desplegable). Estados fieles a Figma.
 */
export default function NavButton({
  children,
  selected = false,
  disabled = false,
  iconLeft,
  iconRight = 'CaretDown',
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      className={`jl-navbtn ${className}`}
      data-selected={selected ? 'true' : undefined}
      disabled={disabled}
      {...rest}
    >
      {iconLeft && <span className="jl-navbtn__icon"><Icon name={iconLeft} size="XS" /></span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="jl-navbtn__icon"><Icon name={iconRight} size="XS" /></span>}
    </button>
  );
}
