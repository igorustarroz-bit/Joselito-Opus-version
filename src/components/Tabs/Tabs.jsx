import { useState } from 'react';
import Tab from '../Tab/Tab';
import './Tabs.css';

/**
 * Grupo de pestañas (role=tablist). `items` (textos) o hijos propios (slot). Selección única; flechas
 * izquierda/derecha mueven la selección con teclado.
 */
export default function Tabs({ type = 'Primary', items = ['item', 'item'], children, value, defaultValue = 0, onChange, showIcons = false, label = 'Pestañas', theme, className = '', ...rest }) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const set = (i) => { if (value === undefined) setInner(i); onChange?.(i); };
  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const n = (current + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    set(n); e.currentTarget.querySelectorAll('[role=tab]')[n]?.focus();
  };
  return (
    <div className={['tabs', className].filter(Boolean).join(' ')} role="tablist" aria-label={label} onKeyDown={onKey} data-theme={theme} {...rest}>
      {children ?? items.map((t, i) => (
        <Tab key={i} variant={type.toLowerCase()} text={t} selected={i === current} tabIndex={i === current ? 0 : -1}
          showIconLeft={showIcons} showIconRight={showIcons} onClick={() => set(i)} />
      ))}
    </div>
  );
}
