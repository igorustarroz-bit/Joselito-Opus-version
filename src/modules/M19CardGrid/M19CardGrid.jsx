import CardProduct from '../../components/CardProduct/CardProduct';
import Title from '../../components/Title/Title';
import img1 from '../../assets/images/order-summary-3.webp';
import img2 from '../../assets/images/card-product.webp';
import img3 from '../../assets/images/order-summary.webp';
import './M19CardGrid.css';

const PICS = [img1, img2, img3];
const ITEMS = Array.from({ length: 6 }, (_, i) => ({
  title: 'Jamón Gran Reserva', price: '380€', image: PICS[i % 3], soldOut: i === 2 || i === 4, href: '#',
}));

/**
 * Rejilla de productos con cabecera (Title con enlace "Ver todos"): 3 columnas en escritorio y una en
 * móvil. Cada elemento es una Card Product vertical (imagen, nombre y precio; "AGOTADO" opcional).
 */
export default function M19CardGrid({ showTitle = true, eyebrow = 'Contenido de la caja', linkText = 'Ver todos', href = '#', items = ITEMS,
  children, theme, className = '', ...rest }) {
  return (
    <section className={['m19-grid', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {showTitle && <Title className="m19-grid__title" eyebrow={eyebrow} showTitle={false} showLink linkText={linkText} href={href} />}
      <ul className="m19-grid__list">
        {children ?? items.map((it, i) => (
          <li key={i}>
            <CardProduct type="Vertical" image={it.image} imageAlt={it.imageAlt ?? ''} title={it.title} price={it.price} showButton={false}
              showLabel={!!it.soldOut} label={it.label ?? 'AGOTADO'} href={it.href} />
          </li>
        ))}
      </ul>
    </section>
  );
}
