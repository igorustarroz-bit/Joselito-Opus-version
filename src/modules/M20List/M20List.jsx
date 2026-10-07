import BlockBestPrice from '../../components/BlockBestPrice/BlockBestPrice';
import Title from '../../components/Title/Title';
import './M20List.css';

const ITEM = { title: 'Mejor precio garantizado', text: 'Selección entre Jamón Joselito Gran Reserva o Joselito Vintage.Selección entre Jamón Joselito Gran Reserva o Joselito Vintage.' };

/**
 * Lista de ventajas o datos destacados: cabecera (Title) y bloques Block best price con bordes compartidos,
 * en fila en escritorio y en columna en móvil. `showExtraItem` añade un cuarto bloque.
 */
export default function M20List({ showTitle = true, eyebrow = '100 g de Jamón Joselito aportan', items = [ITEM, ITEM, ITEM], showExtraItem = false,
  extraItem = ITEM, theme, className = '', ...rest }) {
  const list = showExtraItem ? [...items, extraItem] : items;
  return (
    <section className={['m20-list', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {showTitle && <Title className="m20-list__title" eyebrow={eyebrow} showTitle={false} showLink={false} />}
      <ul className="m20-list__items">
        {list.map((it, i) => <li key={i}><BlockBestPrice title={it.title} text={it.text} /></li>)}
      </ul>
    </section>
  );
}
