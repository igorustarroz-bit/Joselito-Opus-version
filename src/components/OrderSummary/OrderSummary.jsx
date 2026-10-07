import CardProduct from '../CardProduct/CardProduct';
import Tag from '../Tag/Tag';
import './OrderSummary.css';

const ROWS = [
  { label: 'Subtotal', value: '307,00€' },
  { label: 'Descuentos', value: '15,00€', note: '15% de descuento por cada artículo', noteValue: '15,00€' },
  { label: 'Envío', value: '8,00€' },
  { label: 'Total', value: '300,00€' },
];

/** Resumen del pedido: fecha (Title/01), etiquetas, productos (Card Product horizontal) y cuadro de totales. */
export default function OrderSummary({ title = '25 de julio', tags = ['3 ARTÍCULOS'], products = Array.from({ length: 4 }, () => ({})), rows = ROWS, theme, className = '', ...rest }) {
  return (
    <section className={['order-summary', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <header className="order-summary__head">
        <h2 className="order-summary__title ts-title-01">{title}</h2>
        <div className="order-summary__tags">{tags.map((t, i) => <Tag key={i} type="Aseptic" size="XS" text={t} />)}</div>
      </header>
      <div className="order-summary__cards">{products.map((p, i) => <CardProduct key={i} type="Horizontal" {...p} />)}</div>
      <dl className="order-summary__totals">
        {rows.map((r, i) => (
          <div key={i} className="order-summary__group">
            <div className="order-summary__row ts-body-03"><dt>{r.label}</dt><dd>{r.value}</dd></div>
            {r.note && <div className="order-summary__row order-summary__row--note ts-body-02"><dt>{r.note}</dt><dd>{r.noteValue}</dd></div>}
          </div>
        ))}
      </dl>
    </section>
  );
}
