import { useEffect, useId, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import Listbox from '../Listbox/Listbox';
import ListboxItem from '../ListboxItem/ListboxItem';
import './Input.css';

export const TYPES = ['Default', 'Dropdown'];
export const SIZES = ['Big', 'Small'];
export const STATES = ['Default', 'Hover', 'Focused', 'Filled', 'Error', 'Validated', 'Disabled'];

/**
 * Campo de formulario con etiqueta flotante: vacío muestra la etiqueta grande dentro; al enfocar o
 * escribir, la etiqueta sube (Label-In) y aparece el valor. Mensaje inferior opcional (ayuda, error,
 * validación). `Dropdown` abre un Listbox con opciones de selección única.
 * Hover/foco/desactivado son nativos; `error` y `validated` por prop; `state` fuerza la apariencia en docs.
 */
export default function Input({
  type = 'Default',
  size = 'Big',
  label = 'Label',
  value,
  defaultValue = '',
  onChange,
  placeholder,
  inputType = 'text',
  name,
  info = 'Message',
  showInfo = true,
  error = false,
  validated = false,
  disabled = false,
  showIcon = false,
  icon = 'calendar-blank',
  showCaret = true,
  showTypeCursor = true,
  options = [],
  extraCount = 0,
  state,
  theme,
  className = '',
  ...rest
}) {
  const id = useId();
  const ref = useRef(null);
  const [inner, setInner] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const current = value ?? inner;
  const isDropdown = type === 'Dropdown';
  const isDisabled = disabled || state === 'Disabled';
  const forcedFloat = ['Focused', 'Filled', 'Error', 'Validated'].includes(state);
  const floating = forcedFloat || focused || open || String(current ?? '') !== '';
  const st = state ? state.toLowerCase() : isDisabled ? 'disabled' : error ? 'error' : validated ? 'validated'
    : focused || open ? 'focused' : String(current ?? '') !== '' ? 'filled' : 'default';

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc); document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const set = (v) => { if (value === undefined) setInner(v); onChange?.(v); };
  const sz = size === 'Small' ? 's' : 'm';
  const cls = ['input', `input--${size.toLowerCase()}`, `is-${st}`, floating ? 'is-floating' : '', state === 'Hover' ? 'is-hover' : '', showTypeCursor ? '' : 'no-cursor', className]
    .filter(Boolean).join(' ');
  const selected = options.find((o) => (o.value ?? o.label) === current);

  return (
    <div className={cls} ref={ref} data-theme={theme} {...rest}>
      {isDropdown ? (
        <button type="button" className="input__field" id={id} disabled={isDisabled} aria-haspopup="listbox" aria-expanded={open}
          onClick={() => setOpen((o) => !o)} aria-describedby={showInfo ? `${id}-info` : undefined}>
          <span className="input__texts">
            <span className={`input__label ts-forms-input-${sz}-${floating ? 'label-in' : 'text'}`}>{label}</span>
            {floating && <span className={`input__value ts-forms-input-${sz}-text`}>{selected?.label ?? current ?? ''}{extraCount > 0 && <span className="input__extra"> +{extraCount}</span>}</span>}
          </span>
          {showIcon && <Icon name={icon} size="S" className="input__icon" />}
          {showCaret && <Icon name="caret-down" size="XS" className="input__icon" />}
        </button>
      ) : (
        <label className="input__field" htmlFor={id}>
          <span className="input__texts">
            <span className={`input__label ts-forms-input-${sz}-${floating ? 'label-in' : 'text'}`}>{label}</span>
            <input id={id} className={`input__control ts-forms-input-${sz}-text`} type={inputType} name={name} value={current}
              placeholder={placeholder} disabled={isDisabled} aria-invalid={error || state === 'Error' || undefined}
              aria-describedby={showInfo ? `${id}-info` : undefined}
              onChange={(e) => set(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
          </span>
          {showIcon && <Icon name={icon} size="S" className="input__icon" />}
        </label>
      )}
      {isDropdown && open && options.length > 0 && (
        <Listbox className="input__listbox" label={label}>
          {options.map((o) => {
            const v = o.value ?? o.label;
            return <ListboxItem key={v} text={o.label} name={`${id}-opt`} value={v} checked={v === current}
              onChange={() => { set(v); setOpen(false); }} />;
          })}
        </Listbox>
      )}
      {showInfo && <p id={`${id}-info`} className={`input__info ts-forms-input-${sz}-info`}>{info}</p>}
    </div>
  );
}
