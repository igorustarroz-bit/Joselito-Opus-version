import AspectRatio from '../../components/AspectRatio/AspectRatio';
import BrandLogo from '../../components/BrandLogo/BrandLogo';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import Icon from '../../components/Icon/Icon';
import MenuItemList from '../../components/MenuItemList/MenuItemList';
import MobileMenuAccordion from '../../components/MobileMenuAccordion/MobileMenuAccordion';
import M01Navigation from '../M01Navigation/M01Navigation';
import photoLab from '../../assets/images/m02-menu.webp';
import photoPremium from '../../assets/images/m02-menu-3.webp';
import photoShops from '../../assets/images/toast.webp';
import photoEvents from '../../assets/images/m02-menu-2.webp';
import kitchen from '../../assets/images/mobile-menu-accordion.webp';
import './M02Menu.css';

export const TYPES = ['Collapsed', 'Product', 'About'];
const SECTIONS = ['Productos', 'Origen', 'Excelencia', 'Compromisos', 'Experiencias'];
const LINKS = ['Todos los productos', 'Embutidos y Elaborados', 'Regalos y Selecciones Especiales', 'Accesorios', 'Jamones Gran Reserva',
  'Loncheados', 'Añadas y Ediciones Limitadas', 'Paletas Gran Reserva', 'Carne Fresca Joselito Nude', 'Colecciones Premium'];
const MOBILE_LINKS = ['Jamones Gran Reserva', 'Paletas Gran Reserva', 'Carne Fresca Joselito Nude', 'Embutidos y Elaborados', 'Loncheados',
  'Regalos y Selecciones Especiales', 'Añadas y Ediciones Limitadas', 'Accesorios', 'Colecciones Premium'];
const FEATURE = { image: photoShops, mobileImage: kitchen, title: 'Regalos y Selecciones Especiales',
  text: 'Un regalo especial para disfrutar de la tradición, el sabor y la calidad de Joselito en cualquier ocasión', cta: 'DESCUBRE MÁS' };
const PHOTOS = [
  { image: photoLab, title: 'Joselito Lab' },
  { image: photoPremium, title: 'Colecciones Joselito Premium' },
  { image: photoShops, title: 'Tiendas y Restaurantes' },
  { image: photoEvents, title: 'Experiencias y Eventos Privados' },
];
// Sección activa por defecto de cada Type (como en Figma): en escritorio, la del menú subrayada; en móvil, el acordeón abierto.
const ACTIVE = { Collapsed: [-1, -1], Product: [0, 0], About: [1, 2] };

/**
 * Menú desplegable de la cabecera. Escritorio (desde 960 px): M01-Navigation con la sección activa y,
 * debajo, el panel de la sección (Product: lista de enlaces + foto + destacado; About: fila de fotos).
 * Móvil: barra con cierre, logo, buscar y cesta; acordeones por sección y selector de idioma al final.
 */
export default function M02Menu({
  type = 'Product', sections = SECTIONS, links = LINKS, selectedLink = 'Paletas Gran Reserva', mobileLinks = MOBILE_LINKS,
  feature = FEATURE, photos = PHOTOS, showPhoto = true, active, activeMobile, language = 'ENGLISH',
  onClose, onSearch, onCart, homeHref = '/', theme = 'light-white', className = '', ...rest
}) {
  const [defDesk, defMob] = ACTIVE[type] ?? ACTIVE.Collapsed;
  const desk = active ?? defDesk;
  const mob = activeMobile ?? defMob;
  const menu = sections.map((text, i) => ({ text, selected: i === desk }));
  const panel = type === 'About' ? 'photos' : type === 'Product' ? 'product' : null;
  return (
    <div className={['m02-menu', `m02-menu--${type.toLowerCase()}`, className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="m02-menu__desktop">
        <M01Navigation mode="Light" menu={menu} theme={theme} />
        {panel === 'photos' && (
          <div className="m02-menu__panel m02-menu__panel--photos">
            <ul className="m02-menu__photos">
              {photos.map((p, i) => (
                <li key={i}>
                  <a className="m02-menu__photo" href={p.href ?? '#'}>
                    <AspectRatio size="3:2" src={p.image} alt={p.alt ?? ''} />
                    <span className="ts-body-03">{p.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {panel === 'product' && (
          <div className="m02-menu__panel m02-menu__panel--product">
            <div className="m02-menu__group">
              <ul className="m02-menu__links">
                {links.map((l, i) => {
                  const text = typeof l === 'string' ? l : l.text;
                  return <li key={i}><MenuItemList text={text} href={l.href ?? '#'} selected={text === selectedLink} /></li>;
                })}
              </ul>
              {showPhoto && feature?.image && <AspectRatio className="m02-menu__thumb" size="3:4" src={feature.image} alt="" />}
            </div>
            {feature && (
              <div className="m02-menu__feature">
                <div className="m02-menu__feature-texts">
                  <span className="ts-body-03">{feature.title}</span>
                  <p className="m02-menu__feature-text ts-body-02">{feature.text}</p>
                </div>
                <ButtonActionLink size="M" text={feature.cta} href={feature.href ?? '#'} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="m02-menu__mobile">
        <div className="m02-menu__bar">
          <button type="button" className="m02-menu__icon" aria-label="Cerrar menú" onClick={onClose}><Icon name="x" size="M" /></button>
          <a className="m02-menu__logo" href={homeHref} aria-label="Joselito, inicio"><BrandLogo horizontal="Yes" width={126} /></a>
          <span className="m02-menu__tools">
            <button type="button" className="m02-menu__icon" aria-label="Buscar" onClick={onSearch}><Icon name="magnifying-glass" size="M" /></button>
            <button type="button" className="m02-menu__icon" aria-label="Cesta" onClick={onCart}><Icon name="bag" size="M" /></button>
          </span>
        </div>
        <nav className="m02-menu__sections" aria-label="Menú">
          <div className="m02-menu__accordions">
            {sections.map((s, i) => (
              <MobileMenuAccordion key={s} title={s.toUpperCase()} defaultOpen={i === mob}
                content={i === 0 ? 'links' : 'photos'} links={mobileLinks}
                feature={feature && { ...feature, image: feature.mobileImage ?? feature.image }} photos={photos} />
            ))}
          </div>
        </nav>
        <div className="m02-menu__language">
          <MobileMenuAccordion title={language} content="links" links={['ESPAÑOL', 'ENGLISH']} feature={null} />
        </div>
      </div>
    </div>
  );
}
