import Icon from '../Icon/Icon';
import './Tab.css';

export const STATES = ['Default', 'Hover', 'Focus', 'Selected', 'Disabled'];

/**
 * Pestaña (base de tab_primary y tab_secondary): texto Body/03 con iconos de 16 px opcionales, padding
 * FX-6 arriba y FX-4 en el resto, trazo inferior de 1 px. Se usa dentro de Tabs (role=tab).
 */
export default function Tab({ variant = 'primary', text = 'item', children, selected = false, disabled = false, showIconLeft = true,
  showIconRight = true, iconLeft = 'calendar-blank', iconRight = 'caret-down', state, theme, className = '', ...rest }) {
  const isSel = selected || state === 'Selected';
  const cls = ['tab', `tab--${variant}`, 'ts-body-03', state === 'Hover' ? 'is-hover' : '', state === 'Focus' ? 'is-focus' : '', isSel ? 'is-selected' : '', className]
    .filter(Boolean).join(' ');
  return (
    <button type="button" role="tab" aria-selected={isSel} className={cls} disabled={disabled || state === 'Disabled'} data-theme={theme} {...rest}>
      {showIconLeft && <Icon name={iconLeft} size="XS" />}
      <span>{children ?? text}</span>
      {showIconRight && <Icon name={iconRight} size="XS" />}
    </button>
  );
}
