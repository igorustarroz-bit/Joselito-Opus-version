import { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox.jsx';

/**
 * UI08-Checkbox-List — lista de casillas (UI09). Disposición vertical (gap 8) u
 * horizontal (gap 16). Gestiona la selección internamente y notifica con onChange.
 */
export default function CheckboxList({ items = [], vertical = true, size = 'm', onChange, className = '', ...rest }) {
  const [checked, setChecked] = useState(() => items.map((it) => !!it.checked));
  const toggle = (i) => {
    setChecked((prev) => {
      const next = prev.map((c, idx) => (idx === i ? !c : c));
      onChange?.(i, next[i], next);
      return next;
    });
  };
  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', gap: vertical ? 'var(--spacer-fx-2)' : 'var(--spacer-fx-4)', flexWrap: vertical ? 'nowrap' : 'wrap' }}
      role="group"
      {...rest}
    >
      {items.map((it, i) => (
        <Checkbox
          key={i}
          size={size}
          label={it.label}
          checked={checked[i]}
          disabled={it.disabled}
          onChange={() => toggle(i)}
        />
      ))}
    </div>
  );
}
