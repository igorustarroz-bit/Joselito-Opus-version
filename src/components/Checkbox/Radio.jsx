import './Checkbox.css';

/**
 * UI10-Radio — botón de opción. Marcado: punto de acento interior. Estados hover/disabled.
 */
export default function Radio({ checked = false, onChange, disabled = false, label, name, value, className = '', ...rest }) {
  return (
    <label className={`jl-check ${disabled ? 'jl-check--disabled' : ''} ${className}`}>
      <input
        type="radio"
        className="jl-check__input"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
        value={value}
        {...rest}
      />
      <span className={`jl-check__control jl-check__control--radio ${checked ? 'is-checked' : ''}`}>
        {checked && <span className="jl-check__dot" />}
      </span>
      {label && <span className="jl-check__label ts-body-3">{label}</span>}
    </label>
  );
}
