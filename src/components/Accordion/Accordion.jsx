import { useId, useState } from 'react';
import Icon from '../Icon/Icon';
import './Accordion.css';

/**
 * Elemento de acordeón: cabecera (título CTA-Link-Footer/01 + subtítulo opcional + icono más/menos)
 * que despliega el contenido (slot). Controlado (`open` + `onToggle`) o no (`defaultOpen`).
 */
export default function Accordion({
  title = 'item', subtitle = 'Text', showSubtitle = false, children, open, defaultOpen = false, onToggle, theme, className = '', ...rest
}) {
  const id = useId();
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const toggle = () => { if (open === undefined) setInner(!isOpen); onToggle?.(!isOpen); };
  return (
    <div className={['accordion', isOpen ? 'is-open' : '', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <button type="button" className="accordion__head" aria-expanded={isOpen} aria-controls={`${id}-panel`} onClick={toggle}>
        <span className="accordion__texts">
          <span className="accordion__title ts-cta-link-footer-01">{title}</span>
          {showSubtitle && <span className="accordion__subtitle ts-body-01">{subtitle}</span>}
        </span>
        <Icon name={isOpen ? 'minus' : 'plus'} size="XS" />
      </button>
      <div id={`${id}-panel`} className="accordion__content ts-body-02" hidden={!isOpen}>
        {children ?? 'Joselito ofrece, a través de sus Entidades Emisoras, una amplia gama de tarjetas que van acompañadas de las marcas internacionales de mayor aceptación. Los beneficios añadidos a las tarjetas Joselito, las convierten en uno de los medios de pago más útiles del mercado.'}
      </div>
    </div>
  );
}
