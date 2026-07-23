import { useState } from 'react';
import './Menu.css';
import Icon from '../../components/Icon/Icon.jsx';
import BrandLogo from '../../components/BrandLogo/BrandLogo.jsx';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';
import ActionLink from '../../components/ActionLink/ActionLink.jsx';
import cardImg from '../../assets/images/generic-filler.webp';
import featuredImg from '../../assets/images/menu-feature.webp';

/* Contenido real de los másters de Figma (Menu, 58182:4350).
   - Desktop/Product (58182:4348): lista de productos + imagen + destacado.
   - Desktop/About (58182:4349): fila de 4 tarjetas (imagen + label).
   - Mobile Default/Product/About (58512:86748 · 58525:37049 · 58525:37139):
     acordeón de secciones; al abrir muestra la lista de productos o el grid de
     tarjetas según el tipo de sección. */

const PRODUCT = {
  items: [
    { label: 'Todos los productos' },
    { label: 'Jamones Gran Reserva' },
    { label: 'Paletas Gran Reserva', active: true },
    { label: 'Embutidos y Elaborados' },
    { label: 'Loncheados' },
    { label: 'Carne Fresca Joselito Nude' },
    { label: 'Regalos y Selecciones Especiales' },
    { label: 'Añadas y Ediciones Limitadas' },
    { label: 'Colecciones Premium' },
    { label: 'Accesorios' },
  ],
  featured: {
    title: 'Regalos y Selecciones Especiales',
    description:
      'Un regalo especial para disfrutar de la tradición, el sabor y la calidad de Joselito en cualquier ocasión',
    cta: 'DESCUBRE MÁS',
    href: '#',
  },
};

/* Tarjetas del panel About en desktop (máster Desktop/About). */
const ABOUT_CARDS = [
  { label: 'Joselito Lab', image: cardImg },
  { label: 'Colecciones Joselito Premium', image: cardImg },
  { label: 'Tiendas y Restaurantes', image: cardImg },
  { label: 'Experiencias y Eventos Privados', image: cardImg },
];

/* Secciones del cajón mobile (máster Mobile). PRODUCTOS despliega la lista de
   productos; EXCELENCIA despliega un grid de tarjetas (máster Mobile/About usa
   4 "Sostenibilidad"). El resto son enlaces simples. */
const SECTIONS = [
  { id: 'productos', label: 'PRODUCTOS', kind: 'product', product: PRODUCT },
  { id: 'origen', label: 'ORIGEN', kind: 'link', href: '#' },
  {
    id: 'excelencia',
    label: 'EXCELENCIA',
    kind: 'about',
    cards: [
      { label: 'Sostenibilidad', image: cardImg },
      { label: 'Sostenibilidad', image: cardImg },
      { label: 'Sostenibilidad', image: cardImg },
      { label: 'Sostenibilidad', image: cardImg },
    ],
  },
  { id: 'compromisos', label: 'COMPROMISOS', kind: 'link', href: '#' },
  { id: 'experiencias', label: 'EXPERIENCIAS', kind: 'link', href: '#' },
];

/* ---- Piezas reutilizables ---- */

/** Lista de productos (columna izquierda del panel Product). */
function ProductList({ items }) {
  return (
    <ul className="jl-menu__prodlist ts-body-2">
      {items.map((it, i) => (
        <li key={i}>
          <a href="#" className={`jl-menu__prod${it.active ? ' jl-menu__prod--active' : ''}`}>
            {it.active && (
              <span className="jl-menu__prod-arrow"><Icon name="ArrowRight" size="XXS" /></span>
            )}
            <span>{it.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Bloque destacado (título + descripción + enlace de acción). */
function Featured({ featured }) {
  return (
    <div className="jl-menu__featured">
      <div className="jl-menu__featured-text ts-body-2">
        <p className="jl-menu__featured-title">{featured.title}</p>
        <p className="jl-menu__featured-desc">{featured.description}</p>
      </div>
      <ActionLink href={featured.href}>{featured.cta}</ActionLink>
    </div>
  );
}

/** Tarjeta de menú: imagen (AspectRatio 3:2) + label. */
function MenuCard({ card }) {
  return (
    <div className="jl-menu__card">
      <AspectRatio ratio="3:2" className="jl-menu__card-media">
        {card.image ? <img src={card.image} alt="" /> : null}
      </AspectRatio>
      <p className="jl-menu__card-label ts-body-3">{card.label}</p>
    </div>
  );
}

/** Panel de contenido de una sección (Product o About). */
function SectionContent({ section }) {
  if (section.kind === 'product') {
    return (
      <div className="jl-menu__product">
        <div className="jl-menu__product-main">
          <ProductList items={section.product.items} />
          <AspectRatio ratio="3:4" className="jl-menu__product-media">
            <img src={featuredImg} alt="" />
          </AspectRatio>
        </div>
        <Featured featured={section.product.featured} />
      </div>
    );
  }
  if (section.kind === 'about') {
    return (
      <div className="jl-menu__cards">
        {section.cards.map((c, i) => <MenuCard key={i} card={c} />)}
      </div>
    );
  }
  return null;
}

/**
 * Módulo Menu (mega-menú) — overlay de navegación, contenedor a 100% de ancho.
 * Desktop: cabecera + un panel (Product = lista + imagen + destacado, o About =
 * fila de tarjetas) según `type`. Mobile: cabecera con cierre + acordeón de
 * secciones (al abrir muestra su contenido) + enlaces de cuenta/cesta + idioma.
 * Reutiliza Icon, BrandLogo, AspectRatio y ActionLink.
 */
export default function Menu({
  headerLinks = ['Tienda', 'Origen', 'Excelencia', 'Compromisos', 'Experiencia'],
  sections = SECTIONS,
  type = 'product',
  cards = ABOUT_CARDS,
  cartCount = 3,
  language = 'ENGLISH',
  defaultOpen = null,
  onClose,
  className = '',
  ...rest
}) {
  const [open, setOpen] = useState(defaultOpen);
  const toggle = (id) => setOpen((cur) => (cur === id ? null : id));

  /* Panel desktop: si type='about' usa `cards`, si no la sección product. */
  const desktopSection =
    type === 'about'
      ? { kind: 'about', cards }
      : sections.find((s) => s.kind === 'product') || { kind: 'product', product: PRODUCT };

  return (
    <div className={`jl-menu ${className}`} {...rest}>
      {/* ---------- Cabecera desktop ---------- */}
      <div className="jl-menu__header jl-menu__header--desktop">
        <nav className="jl-menu__nav ts-body-2">
          {headerLinks.map((l) => <a key={l} href="#" className="jl-menu__navlink">{l}</a>)}
        </nav>
        <div className="jl-menu__actions ts-body-2">
          <button type="button" className="jl-menu__action">
            <Icon name="MagnifyingGlass" size="S" />Buscar
          </button>
          <a href="#" className="jl-menu__action">Cuenta</a>
          <a href="#" className="jl-menu__action jl-menu__cart">Cesta <span>({cartCount})</span></a>
        </div>
        <a className="jl-menu__logo" href="#" aria-label="Joselito — inicio">
          <BrandLogo variant="horizontal" height={84} />
        </a>
      </div>

      {/* ---------- Panel desktop ---------- */}
      <div className="jl-menu__panel">
        <SectionContent section={desktopSection} />
      </div>

      {/* ---------- Cabecera mobile ---------- */}
      <div className="jl-menu__header jl-menu__header--mobile">
        <button type="button" className="jl-menu__iconbtn" aria-label="Cerrar menú" onClick={onClose}>
          <Icon name="X" size="M" />
        </button>
        <div className="jl-menu__mobile-right">
          <button type="button" className="jl-menu__iconbtn" aria-label="Buscar"><Icon name="MagnifyingGlass" size="M" /></button>
          <button type="button" className="jl-menu__iconbtn" aria-label="Cesta"><Icon name="Bag" size="M" /></button>
        </div>
        <a className="jl-menu__logo" href="#" aria-label="Joselito — inicio">
          <BrandLogo variant="horizontal" height={84} />
        </a>
      </div>

      {/* ---------- Cajón mobile ---------- */}
      <div className="jl-menu__drawer">
        <div className="jl-menu__accordion">
          {sections.map((s) => {
            const isOpen = open === s.id;
            const expandable = s.kind !== 'link';
            return (
              <div key={s.id} className="jl-menu__acc-item" data-open={isOpen ? 'true' : 'false'}>
                {expandable ? (
                  <button
                    type="button"
                    className="jl-menu__acc-head ts-body-2"
                    aria-expanded={isOpen}
                    onClick={() => toggle(s.id)}
                  >
                    <span>{s.label}</span>
                    <span className="jl-menu__acc-caret">
                      <Icon name={isOpen ? 'CaretUp' : 'CaretDown'} size="S" />
                    </span>
                  </button>
                ) : (
                  <a href={s.href} className="jl-menu__acc-head jl-menu__acc-head--link ts-body-2">
                    <span>{s.label}</span>
                    <span className="jl-menu__acc-caret"><Icon name="CaretDown" size="S" /></span>
                  </a>
                )}
                {expandable && isOpen && (
                  <div className="jl-menu__acc-body">
                    <SectionContent section={s} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Enlaces de cuenta/cesta + idioma */}
        <div className="jl-menu__foot">
          <div className="jl-menu__legal ts-body-2">
            <a href="#">CUENTA</a>
            <a href="#">CESTA</a>
          </div>
          <button type="button" className="jl-menu__lang ts-body-2">
            <span>{language}</span>
            <Icon name="CaretDown" size="S" />
          </button>
        </div>
      </div>
    </div>
  );
}
