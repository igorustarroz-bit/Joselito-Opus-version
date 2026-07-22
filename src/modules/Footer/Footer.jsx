import { useState } from 'react';
import './Footer.css';
import Icon from '../../components/Icon/Icon.jsx';
import Input from '../../components/Input/Input.jsx';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';

/* Contenido real del máster de Figma (Navigation / Footer, 58163:33397). */
const COLUMNS = [
  [
    {
      id: 'productos',
      title: 'Productos',
      links: [
        'Jamones de Gran Reserva',
        'Paletas de Gran Reserva',
        'Carne Fresca Joselito Nude',
        'Embutidos y Elaborados',
        'Loncheados',
        'Regalos y Selecciones Especiales',
        'Añadas & Ediciones limitadas',
        'Accesorios',
      ],
    },
  ],
  [
    {
      id: 'sobre-joselito',
      title: 'Sobre Joselito',
      links: [
        'Nuestra historia',
        'La Dehesa',
        'Curación',
        'Añadas',
        'Manual de corte',
        'Sostenibilidad y Medio Ambiente',
        'Los Animales',
        'La Salud',
        'Joselito Lab',
        'Colecciones Premium Joselito',
      ],
    },
  ],
  [
    {
      id: 'restaurantes',
      title: 'Restaurantes y tiendas',
      links: [
        'Joselito’s Velázquez',
        'Joselito’s Las Rozas',
        'Kiosko Joselito Las Rozas Village',
        'Joselito’s Bernabeu',
      ],
    },
    {
      id: 'experiencias',
      title: 'Experiencias y eventos',
      links: [
        'Eventos Privados y Bodas',
        'Catas y maridajes exclusivos',
        'Colaboraciones gastronómicas',
        'Joselito’s Bernabeu',
      ],
    },
  ],
  [
    {
      id: 'atencion',
      title: 'Atención al cliente',
      links: [
        'Envíos y Devoluciones',
        'Seguimiento del Pedido',
        'Preguntas frecuentes',
        'Preguntas frecuentes',
        'Contacto y Soporte',
        'Privacidad y Protección de datos',
        'Aviso legal',
        'La Salud',
        'Política de cookies',
      ],
    },
  ],
];

const SIDE_GROUPS = [
  { id: 'empresa', title: 'Empresa', links: ['Prensa y noticias', 'Equipo y empleo', 'Investigación y patentes'] },
  { id: 'contacto', title: 'Contacto', links: ['(+ 34) 923 580 375', 'store@joselito.com'] },
];

/** Grupo de enlaces: acordeón en mobile, columna estática en desktop. */
function FooterGroup({ group, open, onToggle }) {
  const isOpen = open.has(group.id);
  return (
    <div className="jl-footer__group" data-open={isOpen ? 'true' : 'false'}>
      <button
        type="button"
        className="jl-footer__group-head"
        aria-expanded={isOpen}
        onClick={() => onToggle(group.id)}
      >
        <span className="jl-footer__group-title ts-body-2">{group.title}</span>
        <span className="jl-footer__caret"><Icon name="CaretDown" size="S" /></span>
      </button>
      <div className="jl-footer__links ts-body-3">
        {group.links.map((l, i) => <a key={i} href="#">{l}</a>)}
      </div>
    </div>
  );
}

/**
 * Módulo Navigation / Footer — contenedor a 100% de ancho (grid 12 col).
 * Desktop: 4 columnas de enlaces + fila de newsletter (título + email +
 * ilustración + Empresa/Contacto/RRSS) + barra legal.
 * Mobile: acordeón de secciones + RRSS + newsletter + enlaces legales + idioma.
 * Reutiliza Icon, Input y AspectRatio.
 */
export default function Footer({
  columns = COLUMNS,
  sideGroups = SIDE_GROUPS,
  newsletterTitle = 'Historias, novedades y experiencias para disfrutar del universo Joselito.',
  newsletterNote = 'Sing up for our newsletter',
  social = ['XLogo', 'FacebookLogo', 'InstagramLogo'],
  phone = '(+ 34) 923 580 375',
  email = 'store@joselito.com',
  legalLinks = ['Condiciones de compra', 'Uso del sitio', 'Calidad', 'Canal ético'],
  copyright = '© 1868 - 2026 Cárnicas Joselito S.A.',
  language = 'English',
  className = '',
  ...rest
}) {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const socialLinks = (
    <>
      {social.map((s) => (
        <a key={s} href="#" aria-label={s}><Icon name={s} size={28} /></a>
      ))}
    </>
  );

  return (
    <footer className={`jl-footer ${className}`} {...rest}>
      {/* Bloque superior: columnas de enlaces (acordeón en mobile) + RRSS mobile */}
      <div className="jl-footer__top">
        <div className="jl-footer__cols">
          {columns.map((col, ci) => (
            <div className="jl-footer__col" key={ci}>
              {col.map((g) => <FooterGroup key={g.id} group={g} open={open} onToggle={toggle} />)}
            </div>
          ))}
          {/* Empresa y Contacto: en mobile son acordeones aquí; en desktop van al aside */}
          <div className="jl-footer__col jl-footer__col--mobile">
            {sideGroups.map((g) => <FooterGroup key={g.id} group={g} open={open} onToggle={toggle} />)}
          </div>
        </div>
        <div className="jl-footer__social jl-footer__social--mobile">{socialLinks}</div>
      </div>

      {/* Newsletter */}
      <div className="jl-footer__news">
        <div className="jl-footer__news-main">
          <p className="jl-footer__news-title ts-title-3">{newsletterTitle}</p>
          <div className="jl-footer__form">
            <p className="jl-footer__news-note ts-body-2">{newsletterNote}</p>
            <Input size="small" label="Email" actionIcon="ArrowRight" className="jl-footer__input" />
          </div>
        </div>

        <div className="jl-footer__media">
          <AspectRatio ratio="3:4" className="jl-footer__illus" aria-hidden="true" />
        </div>

        {/* Aside desktop: Empresa + Contacto + RRSS */}
        <div className="jl-footer__aside">
          {sideGroups.map((g) => <FooterGroup key={g.id} group={g} open={open} onToggle={toggle} />)}
          <div className="jl-footer__social jl-footer__social--desktop">{socialLinks}</div>
        </div>

        {/* Contacto mobile: teléfono | email */}
        <div className="jl-footer__contact ts-body-2">
          <span>{phone}</span>
          <span>{email}</span>
        </div>
      </div>

      {/* Barra legal */}
      <div className="jl-footer__legal">
        <div className="jl-footer__legal-main">
          <div className="jl-footer__legal-links ts-body-2">
            {legalLinks.map((l) => <a key={l} href="#">{l}</a>)}
          </div>
          <p className="jl-footer__copy ts-body-2">{copyright}</p>
        </div>
        <button type="button" className="jl-footer__lang ts-body-2">
          <span>{language}</span>
          <Icon name="CaretDown" size="S" className="jl-footer__lang-caret" />
        </button>
      </div>
    </footer>
  );
}
