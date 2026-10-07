import { useId, useState } from 'react';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import './InputPhone.css';

export { STATES } from '../Input/Input';
const CODES = ['+34', '+33', '+351', '+44', '+49', '+1'];

/**
 * Teléfono con prefijo: selector del código de país (+34 y caret) y campo del número con etiqueta
 * flotante ("Phone Num" vacío → "Teléfono" al rellenar). Comparte estados y tamaños con Input.
 */
export default function InputPhone({ size = 'Big', code, defaultCode = '+34', codes = CODES, onCodeChange, label = 'Teléfono', inputLabel = 'Phone Num',
  info = 'Message', showInfo = true, state, disabled, error, validated, theme, className = '', ...rest }) {
  const id = useId();
  const [inner, setInner] = useState(defaultCode);
  const current = code ?? inner;
  const sz = size === 'Small' ? 's' : 'm';
  const st = state ? state.toLowerCase() : disabled ? 'disabled' : error ? 'error' : validated ? 'validated' : 'default';
  return (
    <div className={['input-phone', 'input', `input--${size.toLowerCase()}`, `is-${st}`, className].filter(Boolean).join(' ')} data-theme={theme}>
      <div className="input-phone__row">
        <label className={`input-phone__code input input--${size.toLowerCase()} is-${st} ${state === 'Hover' ? 'is-hover' : ''}`}>
          <span className="input__field">
            <span className={`input__label ts-forms-input-${sz}-text`}>{current}</span>
            <Icon name="caret-down" size="S" className="input__icon" />
            <select aria-label="Prefijo" value={current} disabled={disabled || state === 'Disabled'}
              onChange={(e) => { setInner(e.target.value); onCodeChange?.(e.target.value); }}>
              {codes.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </span>
        </label>
        <Input className="input-phone__num" size={size} label={label} emptyLabel={inputLabel} inputType="tel" showInfo={false}
          state={state} disabled={disabled} error={error} validated={validated} aria-describedby={showInfo ? `${id}-info` : undefined} {...rest} />
      </div>
      {showInfo && <p id={`${id}-info`} className={`input__info ts-forms-input-${sz}-info`}>{info}</p>}
    </div>
  );
}
