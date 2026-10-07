import { useCallback, useEffect, useRef, useState } from 'react';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import CardProduct from '../../components/CardProduct/CardProduct';
import Title from '../../components/Title/Title';
import img1 from '../../assets/images/order-summary-3.webp';
import img2 from '../../assets/images/card-product.webp';
import img3 from '../../assets/images/order-summary.webp';
import img4 from '../../assets/images/m27-cards-categories.webp';
import './M27CardsCategories.css';

const ITEMS = [
  { title: 'Jamones Gran Reserva', price: '380€', image: img1, href: '#' },
  { title: 'Paletas Gran Reserva', price: '380€', image: img2, href: '#' },
  { title: 'Embutidos y elaborados', price: '380€', image: img3, href: '#' },
  { title: 'Carne Fresca Nude', price: '380€', image: img4, href: '#' },
];

/**
 * Categorías de producto en carrusel: cabecera con "Ver todos", fila desplazable de Card Product
 * (4 columnas) y flechas anterior/siguiente (se desactivan en los extremos).
 */
export default function M27CardsCategories({ showTitle = true, eyebrow = 'Nuestros productos', linkText = 'Ver todos', href = '#', items = ITEMS,
  showArrows = true, theme, className = '', ...rest }) {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const update = useCallback(() => {
    const el = track.current; if (!el) return;
    setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 });
  }, []);
  useEffect(() => { update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, [update, items]);
  const move = (dir) => {
    const el = track.current; const card = el?.firstElementChild; if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };
  return (
    <section className={['m27-categories', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {showTitle && <Title className="m27-categories__title" eyebrow={eyebrow} showTitle={false} showLink linkText={linkText} href={href} />}
      <div className="m27-categories__content">
        <ul className="m27-categories__track" ref={track} onScroll={update} tabIndex={0} aria-label={eyebrow}>
          {items.map((it, i) => (
            <li key={i}>
              <CardProduct type="Vertical" image={it.image} imageAlt={it.imageAlt ?? ''} title={it.title} price={it.price} showButton={false} href={it.href} />
            </li>
          ))}
        </ul>
        {showArrows && (
          <div className="m27-categories__arrows">
            <ButtonIcon type="Terciary" size="M" icon="arrow-left" label="Anterior" disabled={edges.start} onClick={() => move(-1)} />
            <ButtonIcon type="Terciary" size="M" icon="arrow-right" label="Siguiente" disabled={edges.end} onClick={() => move(1)} />
          </div>
        )}
      </div>
    </section>
  );
}
