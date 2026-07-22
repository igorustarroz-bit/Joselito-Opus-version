import './Checkbox.css';
import Icon from '../Icon/Icon.jsx';

/**
 * UI10-Checkbox — casilla. Marcada o indeterminada: acento con check/minus blanco.
 * Tamaños m (20px) / s (16px). Estados hover/disabled. Etiqueta opcional (UI09).
 */
export default function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  label,
  size = 'm',
  className = '',
  ...rest
}) {
  const marked = checked || indeterminate;
  const labelStyle = size === 's' ? 'ts-body-2' : 'ts-body-3';
  const iconPx = size === 's' ? 10 : 12;
  return (
    <label className={`jl-check ${disabled ? 'jl-check--disabled' : ''} ${className}`}>
      <input
        type="checkbox"
        className="jl-check__input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <span className={`jl-check__control jl-check__control--checkbox ${size === 's' ? 'jl-check__control--s' : ''} ${marked ? 'is-checked' : ''}`}>
        {indeterminate ? <Icon name="Minus" size={iconPx} /> : checked ? <Icon name="Check" size={iconPx} /> : null}
      </span>
      {label && <span className={`jl-check__label ${labelStyle}`}>{label}</span>}
    </label>
  );
}
