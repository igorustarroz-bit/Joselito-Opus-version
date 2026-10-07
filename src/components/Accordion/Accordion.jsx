import AccordionItem from '../AccordionItem/AccordionItem';
import './Accordion.css';

/** Lista de elementos accordion apilados (slot). `items`: lista de objetos con title y content, o hijos AccordionItem. */
export default function Accordion({ items = [{ title: 'item' }, { title: 'item' }], children, theme, className = '', ...rest }) {
  return (
    <div className={['accordion', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {children ?? items.map((it, i) => <AccordionItem key={i} title={it.title} {...it}>{it.content}</AccordionItem>)}
    </div>
  );
}
