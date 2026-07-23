import './CardsGallery.css';
import CardProduct from '../../components/CardProduct/CardProduct.jsx';
import portraitImg from '../../assets/images/product-portrait.webp';
import squareImg from '../../assets/images/gallery-square.webp';

/**
 * Módulo Cards / Gallery — cabecera + galería/slider de fichas de producto.
 * Máster Figma 58163:40311 (Desktop/Mobile · estados default/expanded).
 *
 * Un título de sección (SangBleu, Title/04) y una serie de `CardProduct` con
 * **ratio de imagen alterno** (3:4 / 1:1) que produce el efecto escalonado de
 * galería. En desktop es un slider horizontal (scroll, tarjetas de 312px); en
 * mobile las tarjetas fluyen en dos columnas. Reutiliza Card Product.
 *
 * Nota de máster: el ratio alterna por posición (par 3:4, impar 1:1). El estado
 * "expanded" del máster (más filas visibles) se cubre añadiendo más `items`.
 */
const DEFAULT_ITEMS = [
  { title: 'Jamón Gran Reserva', price: 'Desde 380€', address: 'Calle Velázquez, 30', cta: 'Descubrir', image: portraitImg },
  { title: 'Jamón Gran Reserva', price: 'Desde 380€', address: 'Calle Velázquez, 30', cta: 'Descubrir', image: squareImg },
  { title: 'Jamón Gran Reserva', price: 'Desde 380€', address: 'Calle Velázquez, 30', cta: 'Descubrir', image: portraitImg },
  { title: 'Jamón Gran Reserva', price: 'Desde 380€', address: 'Calle Velázquez, 30', cta: 'Descubrir', image: squareImg },
];

export default function CardsGallery({
  title = 'Ullamcorper tellus',
  items = DEFAULT_ITEMS,
  className = '',
  ...rest
}) {
  return (
    <section className={`jl-cards-gallery ${className}`.trim()} {...rest}>
      {title && (
        <div className="jl-cards-gallery__head">
          <h2 className="jl-cards-gallery__title ts-title-4">{title}</h2>
        </div>
      )}
      <div className="jl-cards-gallery__row">
        {items.map((it, i) => (
          <CardProduct
            key={i}
            className="jl-cards-gallery__card"
            ratio={it.ratio || (i % 2 === 0 ? '3:4' : '1:1')}
            {...it}
          />
        ))}
      </div>
    </section>
  );
}
