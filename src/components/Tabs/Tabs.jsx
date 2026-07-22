import { useState } from 'react';
import './Tabs.css';
import Icon from '../Icon/Icon.jsx';

/**
 * UI05-Tabs — barra de pestañas. Tipos Primary/Secondary. Controlado
 * (value + onChange) o no controlado (defaultValue). Cada item admite iconos.
 */
export default function Tabs({
  items = [],
  type = 'primary',
  value,
  defaultValue = 0,
  onChange,
  className = '',
  ...rest
}) {
  const [internal, setInternal] = useState(defaultValue);
  const active = value !== undefined ? value : internal;
  const select = (i) => {
    if (value === undefined) setInternal(i);
    onChange?.(i);
  };
  return (
    <div className={`jl-tabs ${className}`} role="tablist" {...rest}>
      {items.map((it, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={active === i}
          className={`jl-tab jl-tab--${type}`}
          data-active={active === i ? 'true' : undefined}
          disabled={it.disabled}
          onClick={() => select(i)}
        >
          {it.iconLeft && <span className="jl-tab__icon"><Icon name={it.iconLeft} size="XS" /></span>}
          <span>{it.label}</span>
          {it.iconRight && <span className="jl-tab__icon"><Icon name={it.iconRight} size="XS" /></span>}
        </button>
      ))}
    </div>
  );
}
