import Icon from '../Icon/Icon';
import './MenuItemList.css';

/**
 * Elemento de lista de menú (submenús del M02-Menu): texto Body/03. Seleccionado = flecha a la
 * izquierda y color Button/Nav/Default; sin seleccionar = Button/Nav/Hover (más suave).
 */
export default function MenuItemList({ text = 'Producto', children, href = '#', selected = false, theme, className = '', ...rest }) {
  return (
    <a className={['menu-item-list', 'ts-body-03', selected ? 'is-selected' : '', className].filter(Boolean).join(' ')} href={href}
      aria-current={selected ? 'page' : undefined} data-theme={theme} {...rest}>
      {selected && <Icon name="arrow-right" size="S" />}
      <span>{children ?? text}</span>
    </a>
  );
}
