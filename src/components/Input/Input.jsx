import './Input.css';
import Icon from '../Icon/Icon.jsx';

/**
 * UI06-Input — campo de formulario. Tamaños Big/Small; estados default, filled,
 * error, validated, disabled (hover/focus vía CSS). Botón de acción opcional.
 */
export default function Input({
  label = 'Label',
  value,
  onChange,
  size = 'big',
  state = 'default',
  message,
  actionIcon,
  onAction,
  type = 'text',
  className = '',
  ...rest
}) {
  const disabled = state === 'disabled';
  return (
    <div className={`jl-input jl-input--${size} ${className}`} data-state={state} {...rest}>
      <div className="jl-input__box">
        <input
          className="jl-input__field"
          type={type}
          placeholder={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {actionIcon && (
          <button type="button" className="jl-input__action" onClick={onAction} disabled={disabled} aria-label="acción">
            <Icon name={actionIcon} size="S" />
          </button>
        )}
      </div>
      {message && <span className="jl-input__msg">{message}</span>}
    </div>
  );
}
