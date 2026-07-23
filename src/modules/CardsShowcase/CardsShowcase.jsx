import './CardsShowcase.css';
import CardCarrusel from '../../components/CardCarrusel/CardCarrusel.jsx';
import Icon from '../../components/Icon/Icon.jsx';

/**
 * Módulo Cards / Showcase — cabecera + carrusel de tarjetas grandes (imagen +
 * texto al lado). Máster Figma 58182:4396 (Desktop Many / Desktop One / Mobile Many).
 *
 * Cabecera con antetítulo (Body/04) y enlace "Ver todos"; debajo, `CardCarrusel`
 * horizontales (imagen 3:2 + título Title/04 + descripción + tags + "Descubrir").
 * `type="many"` muestra un carrusel (slides asomando); `type="one"`, una sola
 * tarjeta a todo el ancho. Reutiliza Card Carrusel e Icon.
 */
const DEFAULT_ITEMS = [
  { title: 'Joselitos Velázquez', body: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis serum.', tags: ['Madrid', 'Restaurante'], cta: 'Descubrir' },
  { title: 'Joselitos Serrano', body: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis serum.', tags: ['Madrid', 'Tienda'], cta: 'Descubrir' },
];

export default function CardsShowcase({
  eyebrow = 'Tiendas y restaurantes',
  link = 'Ver todos',
  linkHref = '#',
  type = 'many',
  items = DEFAULT_ITEMS,
  className = '',
  ...rest
}) {
  const list = type === 'one' ? items.slice(0, 1) : items;
  return (
    <section className={`jl-showcase jl-showcase--${type} ${className}`.trim()} {...rest}>
      <div className="jl-showcase__head">
        {eyebrow && <p className="jl-showcase__eyebrow ts-body-4">{eyebrow}</p>}
        {link && (
          <a className="jl-showcase__link ts-body-3" href={linkHref}>
            {link}
            <Icon name="CaretRight" size="M" />
          </a>
        )}
      </div>
      <div className="jl-showcase__track">
        {list.map((it, i) => (
          <CardCarrusel key={i} className="jl-showcase__slide" orientation="horizontal" {...it} />
        ))}
      </div>
    </section>
  );
}
