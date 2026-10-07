import CardCarrusel from '../../components/CardCarrusel/CardCarrusel';
import Title from '../../components/Title/Title';
import store from '../../assets/images/card-carrusel.webp';
import kiosk from '../../assets/images/toast.webp';
import './M25CardsLinks.css';

export const TYPES = ['One', 'Many'];
const ITEMS = [
  { title: 'Joselitos\nVelázquez', image: store, body: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis donec est auctor diam.' },
  { title: 'Kiosko', image: kiosk, body: 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis donec est auctor diam.' },
];

/**
 * Tarjetas de tiendas y restaurantes con cabecera. `One`: una Card Carrusel a todo el ancho.
 * `Many`: fila desplazable de tarjetas (9 columnas en escritorio, 5 en móvil) para que asome la siguiente.
 */
export default function M25CardsLinks({ type = 'Many', showTitle = true, eyebrow = 'Tiendas y restaurantes', linkText = 'Ver todos', href = '#',
  items = ITEMS, theme, className = '', ...rest }) {
  const many = type === 'Many';
  const list = many ? items : items.slice(0, 1);
  return (
    <section className={['m25-links', many ? 'm25-links--many' : 'm25-links--one', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {showTitle && <Title className="m25-links__title" eyebrow={eyebrow} showTitle={false} showLink linkText={linkText} href={href} />}
      <ul className="m25-links__track" tabIndex={many ? 0 : undefined} aria-label={eyebrow}>
        {list.map((it, i) => <li key={i}><CardCarrusel {...it} /></li>)}
      </ul>
    </section>
  );
}
