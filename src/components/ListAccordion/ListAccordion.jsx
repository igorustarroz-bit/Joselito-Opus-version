import Accordion from '../Accordion/Accordion';
import './ListAccordion.css';

/** list_accordion: lista de elementos accordion apilados (slot). `items`: lista de objetos con title y content, o hijos Accordion. */
export default function ListAccordion({ items = [{ title: 'item' }, { title: 'item' }], children, theme, className = '', ...rest }) {
  return (
    <div className={['list-accordion', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {children ?? items.map((it, i) => <Accordion key={i} title={it.title} {...it}>{it.content}</Accordion>)}
    </div>
  );
}
