import { useState } from 'react';
import Icon from '../Icon/Icon';
import './InputQuantity.css';

/**
 * Selector de cantidad: botón menos, número y botón más sobre fondo neutro. Controlado (`value` +
 * `onChange`) o no controlado (`defaultValue`). Respeta `min` y `max` (los botones se desactivan).
 */
export default function InputQuantity({
  value,
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange,
  showMinus = true,
  showPlus = true,
  label = 'Cantidad',
  theme,
  className = '',
  ...rest
}) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const set = (n) => {
    const next = Math.min(max, Math.max(min, n));
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  return (
    <div className={['input-quantity', className].filter(Boolean).join(' ')} role="group" aria-label={label} data-theme={theme} {...rest}>
      {showMinus && (
        <button type="button" className="input-quantity__btn" aria-label="Restar uno" disabled={current <= min} onClick={() => set(current - 1)}>
          <Icon name="minus" size="XXS" />
        </button>
      )}
      <output className="input-quantity__num ts-body-02" aria-live="polite">{current}</output>
      {showPlus && (
        <button type="button" className="input-quantity__btn" aria-label="Sumar uno" disabled={current >= max} onClick={() => set(current + 1)}>
          <Icon name="plus" size="XXS" />
        </button>
      )}
    </div>
  );
}
