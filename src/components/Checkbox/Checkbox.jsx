import './Checkbox.css';
import Icon from '../Icon/Icon.jsx';

/**
 * UI10-Checkbox — casilla. Marcada: acento con check blanco. Estados hover/disabled.
 */
export default function Checkbox({ checked = false, onChange, disabled = false, label, className = '', ...rest }) {
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
      <span className={`jl-check__control jl-check__control--checkbox ${checked ? 'is-checked' : ''}`}>
        {checked && <Icon name="Check" size="XXS" />}
      </span>
      {label && <span className="jl-check__label ts-body-3">{label}</span>}
    </label>
  );
}
