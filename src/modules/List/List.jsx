import './List.css';

/**
 * Módulo List — lista de características a 100% de ancho. Máster Figma 58468:60752
 * (variantes Desktop 58468:60751 / Mobile 58468:60750).
 *
 * Un título centrado (SangBleu, Title/04) y una serie de ítems, cada uno con
 * título (SangBleu 24px), descripción (Body/03) y un número grande en itálica
 * (SangBleu Italic, `--text-neutral-3`). En desktop los ítems se muestran en
 * columnas separadas por divisores verticales; en mobile se apilan separados por
 * líneas horizontales. El número se genera automáticamente (01, 02, …).
 *
 * Notas de máster: el número, en el máster, está dentro del flujo del primer ítem
 * y como hermano en el resto (inconsistencia); aquí se normaliza a "texto → número"
 * en todos. Paddings del título (120/60 desktop, 60/20 mobile) hardcodeados; el
 * resto de espaciados usa los tokens responsive `--sp-*` y `--grid-wrapper`.
 */
const DEFAULT_ITEMS = [
  { title: 'Mejor precio garantizado', description: 'Selección entre Jamón Joselito Gran Reserva o Joselito Vintage.' },
  { title: 'Servicio Maestro Cortador', description: 'Lorem ipsum dolor sit amet consectetur. Leo proin nisi in neque.' },
  { title: 'Notas de cata', description: 'Notas de cata que certifican la autenticidad e identifican la añada.' },
  { title: 'Lorem ipsum dolor sit ament', description: 'Lorem ipsum dolor sit amet consectetur. Leo proin nisi in neque.' },
];

export default function List({
  title = 'This is a title',
  items = DEFAULT_ITEMS,
  className = '',
  ...rest
}) {
  return (
    <section className={`jl-list ${className}`.trim()} {...rest}>
      {title && (
        <div className="jl-list__head">
          <h2 className="jl-list__title ts-title-4">{title}</h2>
        </div>
      )}
      <div className="jl-list__items">
        {items.map((it, i) => (
          <div className="jl-list__item" key={i}>
            <div className="jl-list__text">
              {it.title && <h3 className="jl-list__item-title">{it.title}</h3>}
              {it.description && <p className="jl-list__desc ts-body-3">{it.description}</p>}
            </div>
            <span className="jl-list__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
