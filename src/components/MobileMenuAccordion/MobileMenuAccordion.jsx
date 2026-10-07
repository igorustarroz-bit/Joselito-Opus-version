import { useId, useState } from 'react';
import AspectRatio from '../AspectRatio/AspectRatio';
import Icon from '../Icon/Icon';
import MenuItemList from '../MenuItemList/MenuItemList';
import photo from '../../assets/images/mobile-menu-accordion.webp';
import './MobileMenuAccordion.css';

const DEFAULT_LINKS = ['Jamones Gran Reserva', 'Paletas Gran Reserva', 'Carne Fresca Joselito Nuestra', 'Embutidos y Elaborados', 'Loncheados',
  'Regalos y Selecciones Especiales', 'Añadas y Ediciones Limitadas', 'Accesorios', 'Colecciones Premium'];
const DEFAULT_FEATURE = { image: photo, title: 'Regalos y Selecciones Especiales', text: 'Un regalo especial para disfrutar de la tradición, el sabor y la calidad de Joselito.' };
const DEFAULT_PHOTOS = Array.from({ length: 4 }, () => ({ image: photo, title: 'Sostenibilidad' }));

/**
 * Sección desplegable del menú móvil (M02 en móvil). Cerrada: título + CaretDown. Abierta (`content`):
 * `links` = lista de enlaces + tarjeta destacada (State=Open 1); `photos` = fila de fotos con título
 * desplazable en horizontal (State=Open 2).
 */
export default function MobileMenuAccordion({
  title = 'PRODUCTOS', content = 'links', links = DEFAULT_LINKS, feature = DEFAULT_FEATURE, photos = DEFAULT_PHOTOS,
  open, defaultOpen = false, onToggle, theme, className = '', ...rest
}) {
  const id = useId();
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const toggle = () => { if (open === undefined) setInner(!isOpen); onToggle?.(!isOpen); };
  return (
    <div className={['mm-accordion', isOpen ? 'is-open' : '', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <button type="button" className="mm-accordion__head" aria-expanded={isOpen} aria-controls={`${id}-panel`} onClick={toggle}>
        <span className="ts-body-02">{title}</span>
        <Icon name={isOpen ? 'caret-up' : 'caret-down'} size="S" />
      </button>
      <div id={`${id}-panel`} className="mm-accordion__panel" hidden={!isOpen}>
        {content === 'photos' ? (
          <ul className="mm-accordion__photos">
            {photos.map((p, i) => (
              <li key={i} className="mm-accordion__photo">
                <a href={p.href ?? '#'}>
                  <AspectRatio size="3:2" src={p.image} alt={p.alt ?? ''} />
                  <span className="ts-body-03">{p.title}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <ul className="mm-accordion__links">
              {links.map((l, i) => <li key={i}><MenuItemList className="mm-accordion__link" text={typeof l === 'string' ? l : l.text} href={l.href ?? '#'} /></li>)}
            </ul>
            {feature && (
              <a className="mm-accordion__feature" href={feature.href ?? '#'}>
                <AspectRatio className="mm-accordion__feature-img" size="4:3" src={feature.image} alt={feature.alt ?? ''} />
                <span className="mm-accordion__feature-texts">
                  <span className="mm-accordion__feature-title ts-body-03">{feature.title}</span>
                  <span className="mm-accordion__feature-text ts-body-02">{feature.text}</span>
                </span>
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
