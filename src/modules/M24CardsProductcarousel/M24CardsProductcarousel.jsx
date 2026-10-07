import CardProduct from '../../components/CardProduct/CardProduct';
import Title from '../../components/Title/Title';
import img1 from '../../assets/images/order-summary-3.webp';
import img2 from '../../assets/images/card-product.webp';
import img3 from '../../assets/images/order-summary.webp';
import './M24CardsProductcarousel.css';

const PICS = [img1, img2, img3];
const ITEMS = Array.from({ length: 6 }, (_, i) => ({ title: 'Jamón Gran Reserva', price: '380€', image: PICS[i % 3], href: '#' }));

/**
 * Carrusel de productos: cabecera con "Ver todos" y fila desplazable de Card Product verticales
 * (4 columnas de ancho en escritorio, 5 en móvil, para que asome la siguiente).
 */
export default function M24CardsProductcarousel({ showTitle = true, eyebrow = 'Nuestra selección', linkText = 'Ver todos', href = '#', items = ITEMS,
  children, theme, className = '', ...rest }) {
  return (
    <section className={['m24-carousel', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {showTitle && <Title className="m24-carousel__title" eyebrow={eyebrow} showTitle={false} showLink linkText={linkText} href={href} />}
      <ul className="m24-carousel__track" tabIndex={0} aria-label={eyebrow}>
        {children ?? items.map((it, i) => (
          <li key={i}>
            <CardProduct type="Vertical" image={it.image} imageAlt={it.imageAlt ?? ''} title={it.title} price={it.price} showButton={false}
              showLabel={!!it.label} label={it.label} href={it.href} />
          </li>
        ))}
      </ul>
    </section>
  );
}
