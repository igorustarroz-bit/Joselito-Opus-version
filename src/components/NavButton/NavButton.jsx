import Icon from '../Icon/Icon';
import './NavButton.css';

/** Ejes del máster de Figma (NavButton). */
export const STATES = ['Default', 'Hover', 'Focus', 'Selected', 'Disable'];

/**
 * Elemento de navegación principal (cabecera): texto Body/02 con icono y caret opcionales.
 * Seleccionado = página actual (subrayado de 1 px, `aria-current`). Hover/foco/desactivado nativos;
 * `state` solo fuerza la apariencia para documentación.
 */
export default function NavButton({
  text = 'Item',
  children,
  href,
  selected = false,
  disabled = false,
  showIcon = false,
  icon = 'magnifying-glass',
  showCaret = false,
  caret = 'caret-down',
  state,
  theme,
  className = '',
  ...rest
}) {
  const isDisabled = disabled || state === 'Disable';
  const isSelected = selected || state === 'Selected';
  const cls = ['nav-button', 'ts-body-02', state === 'Hover' ? 'is-hover' : '', state === 'Focus' ? 'is-focus' : '',
    isSelected ? 'is-selected' : '', className].filter(Boolean).join(' ');
  const content = (
    <>
      {showIcon && <Icon name={icon} size="S" />}
      <span className="nav-button__text">{children ?? text}</span>
      {showCaret && <Icon name={caret} size="S" />}
    </>
  );
  if (href) {
    return (
      <a className={cls} href={isDisabled ? undefined : href} aria-current={isSelected ? 'page' : undefined}
        aria-disabled={isDisabled || undefined} tabIndex={isDisabled ? -1 : undefined} data-theme={theme} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} aria-pressed={isSelected || undefined} disabled={isDisabled} data-theme={theme} {...rest}>
      {content}
    </button>
  );
}
