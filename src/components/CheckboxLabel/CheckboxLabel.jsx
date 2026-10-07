import CheckboxRadio from '../CheckboxRadio/CheckboxRadio';
import './CheckboxLabel.css';

export const SIZES = ['Medium', 'Small'];
export const STATES = ['Default', 'Hover', 'Selected', 'Undefined', 'Disabled', 'Disabled Selected'];

/**
 * Casilla con texto: toda la etiqueta es clicable. Medium (casilla 20 px, Body/03, separación FX-3) o
 * Small (16 px, Body/02, FX-2). `indeterminate` = Estado Undefined. `state` fuerza la apariencia en docs.
 */
export default function CheckboxLabel({
  text = 'Label', children, showLabel = true, size = 'Medium', checked, defaultChecked, indeterminate = false,
  disabled = false, onChange, name, value, state, theme, className = '', ...rest
}) {
  const map = { Default: 'Not Selected', Hover: 'Hover', Selected: 'Selected', Undefined: 'Selected', Disabled: 'Disabled', 'Disabled Selected': 'Selected Disabled' };
  const isDisabled = disabled || /Disabled/.test(state || '');
  const isChecked = state ? /Selected|Undefined/.test(state) : checked;
  const cls = ['checkbox-label', `checkbox-label--${size.toLowerCase()}`, isDisabled ? 'is-disabled' : '', isDisabled && isChecked ? 'is-disabled-selected' : '',
    state === 'Hover' ? 'is-hover' : '', className].filter(Boolean).join(' ');
  return (
    <label className={cls} data-theme={theme} {...rest}>
      <CheckboxRadio type="Checkboxes" size={size} state={state ? map[state] : undefined} checked={checked} defaultChecked={defaultChecked}
        indeterminate={indeterminate || state === 'Undefined'} disabled={disabled} onChange={onChange} name={name} value={value}
        className={state === 'Hover' ? 'is-hover' : ''} />
      {showLabel && <span className={`checkbox-label__text ${size === 'Small' ? 'ts-body-02' : 'ts-body-03'}`}>{children ?? text}</span>}
    </label>
  );
}
