import Icon from '../Icon/Icon';
import './CheckboxRadio.css';

/** Ejes del máster de Figma (Checkboxes-Radios). */
export const TYPES = ['Checkboxes', 'Radio'];
export const STATES = ['Not Selected', 'Hover', 'Selected', 'Selected Disabled', 'Disabled'];
export const TONES = ['Light', 'Dark'];

/**
 * Control de casilla (cuadrada) o radio (circular) de 20 px. Es un `<input>` nativo oculto
 * visualmente con la apariencia de Figma encima: marcado, hover, foco y desactivado son nativos.
 * `tone` replica el eje Theme de Figma (Light/Dark). `state` solo fuerza la apariencia en la documentación.
 * Para usarlo con texto, ver Checkbox-Label (o pasar `aria-label`).
 */
export default function CheckboxRadio({
  type = 'Checkboxes',
  tone = 'Light',
  checked,
  defaultChecked,
  disabled = false,
  state,
  name,
  value,
  onChange,
  className = '',
  theme,
  ...rest
}) {
  const forced = state != null;
  const isChecked = forced ? /Selected/.test(state) && state !== 'Not Selected' : checked;
  const isDisabled = disabled || (forced && /Disabled/.test(state));
  const isRadio = type === 'Radio';
  const cls = ['check-radio', `check-radio--${isRadio ? 'radio' : 'checkbox'}`, `check-radio--${tone.toLowerCase()}`,
    state === 'Hover' ? 'is-hover' : '', className].filter(Boolean).join(' ');
  return (
    <span className={cls} data-theme={theme}>
      <input
        className="check-radio__input"
        type={isRadio ? 'radio' : 'checkbox'}
        name={name}
        value={value}
        checked={forced ? isChecked : checked}
        defaultChecked={defaultChecked}
        disabled={isDisabled}
        onChange={onChange ?? (forced || checked !== undefined ? () => {} : undefined)}
        {...rest}
      />
      <span className="check-radio__box" aria-hidden="true">
        {isRadio ? <span className="check-radio__dot" /> : <Icon name="check" size="XS" className="check-radio__check" />}
      </span>
    </span>
  );
}
