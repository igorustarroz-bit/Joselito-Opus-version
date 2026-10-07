import ButtonActionLink from '../ButtonActionLink/ButtonActionLink';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import CardProduct from '../CardProduct/CardProduct';
import Tag from '../Tag/Tag';
import './OrderByDay.css';

/**
 * Pedido del historial (área de cliente): fecha con botón para ver el detalle, etiquetas (número, importe,
 * estado), "volver a comprar" y los productos (Card Product vertical) en una fila desplazable.
 */
export default function OrderByDay({ title = '25 de julio', tags = ['Pedido 876523', '890 €', 'entregado'], products = Array.from({ length: 4 }, () => ({})),
  showButton = true, buttonText = 'volver a comprar', onButton, showButtonGo = true, href, theme, className = '', ...rest }) {
  return (
    <section className={['order-by-day', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <header className="order-by-day__head">
        <div className="order-by-day__top">
          <h2 className="order-by-day__title ts-title-01">{title}</h2>
          {showButtonGo && <ButtonIcon type="Terciary" size="S" icon="arrow-right" label={`Ver pedido del ${title}`} href={href} />}
        </div>
        <div className="order-by-day__meta">
          <div className="order-by-day__tags">{tags.map((t, i) => <Tag key={i} type="Aseptic" size="XS" text={t} />)}</div>
          {showButton && <ButtonActionLink size="M" text={buttonText} onClick={onButton} />}
        </div>
      </header>
      <ul className="order-by-day__cards">{products.map((p, i) => <li key={i}><CardProduct type="Vertical" {...p} /></li>)}</ul>
    </section>
  );
}
