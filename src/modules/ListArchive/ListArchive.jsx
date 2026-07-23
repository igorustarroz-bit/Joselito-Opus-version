import './ListArchive.css';

/**
 * Módulo List / Archive table — tabla de archivo/noticias a 100% de ancho.
 * Máster Figma 58418:53062 (Desktop/Mobile · estados Default/Hover).
 *
 * Un título de sección y una lista de entradas, cada una con fecha (Body/03) y
 * titular (SangBleu, 24px), separadas por líneas. En desktop van en fila
 * (fecha a la izquierda, titular a la derecha); en mobile se apilan. Si una
 * entrada trae `href`, la fila es un enlace.
 *
 * Nota de máster: el estado Hover del máster muestra una imagen en miniatura
 * siguiendo al cursor ("List with hover images"); aquí se implementa un realce
 * de hover simple y se deja la miniatura como mejora pendiente.
 */
const DEFAULT_ITEMS = [
  { date: 'Diciembre 2025', headline: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis donec est auctor diam ac morbi semper. Leo et et pharetra.' },
  { date: 'Diciembre 2025', headline: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis donec est auctor diam ac morbi semper. Leo et et pharetra.' },
  { date: 'Diciembre 2025', headline: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis donec est auctor diam ac morbi semper. Leo et et pharetra.' },
];

export default function ListArchive({
  title = 'Últimas noticias',
  items = DEFAULT_ITEMS,
  className = '',
  ...rest
}) {
  return (
    <section className={`jl-archive ${className}`.trim()} {...rest}>
      {title && (
        <div className="jl-archive__head">
          <h2 className="jl-archive__title">{title}</h2>
        </div>
      )}
      <div className="jl-archive__rows">
        {items.map((it, i) => {
          const Tag = it.href ? 'a' : 'div';
          return (
            <Tag className="jl-archive__row" key={i} {...(it.href ? { href: it.href } : {})}>
              <span className="jl-archive__date ts-body-3">{it.date}</span>
              <span className="jl-archive__headline">{it.headline}</span>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
