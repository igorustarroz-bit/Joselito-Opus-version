import { useState } from 'react';
import './Accordion.css';
import Icon from '../Icon/Icon.jsx';

/**
 * UI13-Accordion — contenedor de ítems desplegables. Cada ítem: cabecera con
 * título (CTA-XS mayúsculas) y toggle Plus/Minus; al abrir muestra su contenido.
 */
export function AccordionItem({ title = 'Item', defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="jl-accordion-item">
      <button
        type="button"
        className="jl-accordion-item__header"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="jl-accordion-item__title">{title}</span>
        <span className="jl-accordion-item__icon"><Icon name={open ? 'Minus' : 'Plus'} size="XS" /></span>
      </button>
      {open && children && <div className="jl-accordion-item__body ts-body-3">{children}</div>}
    </div>
  );
}

export default function Accordion({ items, children, className = '', ...rest }) {
  return (
    <div className={`jl-accordion ${className}`} {...rest}>
      {items
        ? items.map((it, i) => (
            <AccordionItem key={i} title={it.title} defaultOpen={it.defaultOpen}>{it.content}</AccordionItem>
          ))
        : children}
    </div>
  );
}
