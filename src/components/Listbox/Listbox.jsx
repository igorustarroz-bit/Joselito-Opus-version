import { useState } from 'react';
import './Listbox.css';

/**
 * UI07-Listbox — lista de opciones (desplegable). Cada opción es seleccionable;
 * texto con estilo de formulario. Controlado (value+onChange) o no controlado.
 */
export default function Listbox({ items = [], value, defaultValue, onChange, className = '', ...rest }) {
  const [internal, setInternal] = useState(defaultValue);
  const selected = value !== undefined ? value : internal;
  const select = (val) => {
    if (value === undefined) setInternal(val);
    onChange?.(val);
  };
  return (
    <div className={`jl-listbox ${className}`} role="listbox" {...rest}>
      {items.map((it, i) => {
        const val = it.value ?? it.label ?? i;
        return (
          <button
            key={i}
            type="button"
            role="option"
            aria-selected={selected === val}
            className="jl-listbox__item"
            disabled={it.disabled}
            onClick={() => select(val)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
