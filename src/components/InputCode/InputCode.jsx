import { useId, useRef, useState } from 'react';
import '../Input/Input.css';
import './InputCode.css';

export const STATES = ['Default', 'Hover', 'Focused', 'Filled', 'Error', 'Validated', 'Disabled'];

/**
 * Código de verificación: casillas de 40 × 40 px (6 por defecto; Show 4/5/6 permiten 3–6) con avance
 * automático, retroceso con Borrar y pegado del código completo. Mensaje inferior opcional.
 */
export default function InputCode({ length = 6, value, defaultValue = '', onChange, onComplete, info = 'Message', showInfo = true, error, validated, disabled,
  state, label = 'Código de verificación', theme, className = '', ...rest }) {
  const id = useId();
  const refs = useRef([]);
  const [inner, setInner] = useState(defaultValue);
  const current = (value ?? inner).slice(0, length);
  const st = state ? state.toLowerCase() : disabled ? 'disabled' : error ? 'error' : validated ? 'validated' : current.length === length ? 'filled' : 'default';
  const set = (v) => { const next = v.replace(/\D/g, '').slice(0, length); if (value === undefined) setInner(next); onChange?.(next); if (next.length === length) onComplete?.(next); };
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !current[i] && i > 0) { refs.current[i - 1]?.focus(); set(current.slice(0, i - 1) + current.slice(i)); e.preventDefault(); }
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
  };
  const onInput = (i, e) => {
    const d = e.target.value.replace(/\D/g, '');
    if (!d) { set(current.slice(0, i) + current.slice(i + 1)); return; }
    const next = (current.slice(0, i) + d + current.slice(i + d.length)).slice(0, length);
    set(next); refs.current[Math.min(i + d.length, length - 1)]?.focus();
  };
  return (
    <div className={['input-code', 'input', `is-${st}`, state === 'Hover' ? 'is-hover' : '', state === 'Focused' ? 'is-forced-focus' : '', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="input-code__cols" role="group" aria-label={label} aria-describedby={showInfo ? `${id}-info` : undefined}>
        {Array.from({ length }, (_, i) => (
          <input key={i} ref={(el) => { refs.current[i] = el; }} className="input-code__box ts-forms-input-m-text" inputMode="numeric" autoComplete={i === 0 ? 'one-time-code' : 'off'}
            maxLength={length} value={current[i] ?? ''} disabled={disabled || state === 'Disabled'} aria-label={`Dígito ${i + 1}`} aria-invalid={error || state === 'Error' || undefined}
            onChange={(e) => onInput(i, e)} onKeyDown={(e) => onKey(i, e)} onFocus={(e) => e.target.select()} />
        ))}
      </div>
      {showInfo && <p id={`${id}-info`} className="input__info ts-forms-input-m-info">{info}</p>}
    </div>
  );
}
