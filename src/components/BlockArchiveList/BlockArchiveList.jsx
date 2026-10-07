import './BlockArchiveList.css';

export const TYPES = ['Left', 'Right'];

/**
 * Entrada de un listado de archivo (M32): año/colección (Body/03) + nombre grande (Title/05).
 * `Left`: etiqueta a la izquierda; `Right`: etiqueta a la derecha. Inactivo = Neutral 3; activo (hover o
 * `active`) = Texts/Base. En móvil (por debajo de 481 px) se apila con la etiqueta encima.
 */
export default function BlockArchiveList({ type = 'Left', label = 'Collection 2007', title = 'Colección FSC', href, active = false, theme, className = '', ...rest }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag className={['block-archive', `block-archive--${type.toLowerCase()}`, active ? 'is-active' : '', className].filter(Boolean).join(' ')} href={href} data-theme={theme} {...rest}>
      <span className="block-archive__label ts-body-03">{label}</span>
      <span className="block-archive__title ts-title-05">{title}</span>
    </Tag>
  );
}
