import Icon from '../Icon/Icon';
import './SubnavItem.css';

/**
 * Elemento de la subnavegación (M06): texto Body/03 con icono y caret opcionales. Seleccionado =
 * color de acento con subrayado de 1 px. 40 px de alto (padding inferior FX-4).
 */
export default function SubnavItem({ text = 'Tienda', children, href = '#', selected = false, showIcon = false, icon = 'magnifying-glass',
  showCaret = false, caret = 'caret-down', theme, className = '', ...rest }) {
  return (
    <a className={['subnav-item', 'ts-body-03', selected ? 'is-selected' : '', className].filter(Boolean).join(' ')} href={href}
      aria-current={selected ? 'page' : undefined} data-theme={theme} {...rest}>
      {showIcon && <Icon name={icon} size="S" />}
      <span>{children ?? text}</span>
      {showCaret && <Icon name={caret} size="S" />}
    </a>
  );
}
