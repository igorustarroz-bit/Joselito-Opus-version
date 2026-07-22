import './SecondaryMenu.css';

/**
 * Módulo Navigation/Secondary menu — fila de enlaces de categoría (Body/03) a 100%
 * de ancho. Desktop centrada; mobile con scroll horizontal. El activo va subrayado.
 */
export default function SecondaryMenu({
  items = ['Todos', 'Jamones', 'Paletas', 'Carne fresca', 'Embutidos', 'Loncheados', 'Regalos', 'Añadas', 'Accesorios'],
  active = 0,
  onSelect,
  className = '',
  ...rest
}) {
  return (
    <nav className={`jl-secmenu ${className}`} aria-label="Categorías" {...rest}>
      <div className="jl-secmenu__list">
        {items.map((it, i) => {
          const label = typeof it === 'string' ? it : it.label;
          return (
            <a
              key={i}
              href={typeof it === 'object' ? it.href : undefined}
              className={`jl-secmenu__item ts-body-3 ${active === i ? 'jl-secmenu__item--active' : ''}`}
              aria-current={active === i ? 'page' : undefined}
              onClick={() => onSelect?.(i)}
            >
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
