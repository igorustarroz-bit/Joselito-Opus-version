import './CardsLinks.css';
import CardLink from '../../components/CardLink/CardLink.jsx';
import linkImg from '../../assets/images/feature-portrait.webp';

/**
 * Módulo Cards / Links — cabecera + fila de tarjetas-enlace. Máster Figma
 * 58163:40143 (Desktop 58163:40144 / Mobile 58163:40179).
 *
 * Un título de sección (SangBleu, Title/04) y una fila de `CardLink` (imagen 3:4
 * con título + subtítulo superpuestos). Por defecto 2 tarjetas, en fila tanto en
 * desktop como en mobile (más pequeñas). Reutiliza el componente Card Link.
 *
 * Nota de máster: paddings (120/60 desktop, 60/20 mobile) hardcodeados en el máster.
 */
const DEFAULT_ITEMS = [
  { title: 'Jamón Gran Reserva', subtitle: 'Desde 380€', image: linkImg },
  { title: 'Jamón Gran Reserva', subtitle: 'Desde 380€', image: linkImg },
];

export default function CardsLinks({
  title = 'Lorem ipsum accumsan eleifend',
  items = DEFAULT_ITEMS,
  className = '',
  ...rest
}) {
  return (
    <section className={`jl-cards-links ${className}`.trim()} {...rest}>
      {title && (
        <div className="jl-cards-links__head">
          <h2 className="jl-cards-links__title ts-title-4">{title}</h2>
        </div>
      )}
      <div className="jl-cards-links__row">
        {items.map((it, i) => (
          <CardLink key={i} className="jl-cards-links__card" {...it} />
        ))}
      </div>
    </section>
  );
}
