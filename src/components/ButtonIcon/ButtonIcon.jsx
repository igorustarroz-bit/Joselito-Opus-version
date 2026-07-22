import './ButtonIcon.css';
import Icon from '../Icon/Icon.jsx';

/**
 * UI03-Button-Icon — botón cuadrado solo-icono. 3 tipos (Primary/Secondary/Terciary),
 * tamaños XS–XL y estados. Reutiliza los colores de UI02-Button.
 * Tamaño de icono por tamaño de botón: XS→16, S/M/L→20, XL→32.
 */
const ICON_BY_SIZE = { xs: 'XS', s: 'S', m: 'S', l: 'S', xl: 'L' };

export default function ButtonIcon({
  icon = 'ArrowRight',
  type = 'primary',
  size = 'm',
  selected = false,
  disabled = false,
  label,
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      className={`jl-iconbtn jl-iconbtn--${type} jl-iconbtn--${size} ${className}`}
      data-selected={selected ? 'true' : undefined}
      disabled={disabled}
      aria-label={label || icon}
      {...rest}
    >
      <span className="jl-iconbtn__icon"><Icon name={icon} size={ICON_BY_SIZE[size] ?? 'S'} /></span>
    </button>
  );
}
