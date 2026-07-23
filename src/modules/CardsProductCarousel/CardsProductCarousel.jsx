import './CardsProductCarousel.css';
import CardProduct from '../../components/CardProduct/CardProduct.jsx';
import Icon from '../../components/Icon/Icon.jsx';

/**
 * Módulo Cards / Product carousel — cabecera + carrusel de fichas de producto.
 * Máster Figma 58163:83548 (Desktop / Mobile / Mobile 2).
 *
 * Cabecera con antetítulo (Body/04) y enlace "Explorar todos" (Body/03 + chevron);
 * debajo, un carrusel horizontal de `CardProduct` con badge ("TOP VENTAS"), chips
 * de ubicación, estrellas y enlace "Descubrir". Reutiliza Card Product e Icon.
 *
 * Nota de máster: en desktop el máster reparte 3 fichas a lo ancho con mucho hueco;
 * aquí es un carrusel con scroll horizontal y separación uniforme (aprox.).
 */
const DEFAULT_ITEMS = Array.from({ length: 3 }).map(() => ({
  title: 'Jamón Gran Reserva',
  price: 'Desde 380€',
  address: 'Calle Velázquez, 30',
  badge: 'TOP VENTAS',
  locations: ['Barcelona', 'España'],
  stars: 3,
  cta: 'Descubrir',
  ratio: '3:4',
}));

export default function CardsProductCarousel({
  eyebrow = 'Nuestros chefs',
  link = 'Explorar todos',
  linkHref = '#',
  items = DEFAULT_ITEMS,
  className = '',
  ...rest
}) {
  return (
    <section className={`jl-carousel ${className}`.trim()} {...rest}>
      <div className="jl-carousel__head">
        {eyebrow && <p className="jl-carousel__eyebrow">{eyebrow}</p>}
        {link && (
          <a className="jl-carousel__link ts-body-3" href={linkHref}>
            {link}
            <Icon name="CaretRight" size="M" />
          </a>
        )}
      </div>
      <div className="jl-carousel__track">
        {items.map((it, i) => (
          <CardProduct key={i} className="jl-carousel__card" {...it} />
        ))}
      </div>
    </section>
  );
}
