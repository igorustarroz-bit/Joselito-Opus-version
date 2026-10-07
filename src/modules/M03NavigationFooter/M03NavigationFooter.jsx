import { useState } from 'react';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import { Logo } from '../../components/BrandLogo/BrandLogo';
import CheckboxLabel from '../../components/CheckboxLabel/CheckboxLabel';
import Icon from '../../components/Icon/Icon';
import InputAndButton from '../../components/InputAndButton/InputAndButton';
import MobileMenuAccordion from '../../components/MobileMenuAccordion/MobileMenuAccordion';
import ekomi from '../../assets/images/m03-navigation-footer-ekomi-1.webp';
import leafPoster from '../../assets/images/video-hoja.webp';
import './M03NavigationFooter.css';

const COLUMNS = [
  [{ title: 'PRODUCTOS', links: ['Jamones de Gran Reserva', 'Paletas de Gran Reserva', 'Carne Fresca Joselito Nude', 'Embutidos y Elaborados', 'Loncheados',
    'Regalos y Selecciones Especiales', 'Añadas & Ediciones limitadas', 'Accesorios', 'Colecciones Premium'] }],
  [{ title: 'SOBRE JOSELITO', links: ['Nuestra historia', 'La Dehesa', 'Curación', 'Añadas', 'Manual de corte', 'Sostenibilidad y Medio Ambiente',
    'Los Animales', 'La Salud', 'Joselito Lab'] }],
  [{ title: 'RESTAURANTES Y TIENDAS', links: ['Joselito’s Velázquez', 'Joselito’s Las Rozas', 'Kiosko Joselito Las Rozas Village', 'Joselito’s Bernabeu'] },
    { title: 'EXPERIENCIAS Y EVENTOS', links: ['Eventos Privados y Bodas', 'Catas y maridajes exclusivos', 'Colaboraciones gastronómicas'] }],
  [{ title: 'ATENCIÓN AL CLIENTE', links: ['Envíos y Devoluciones', 'Seguimiento del Pedido', 'Preguntas frecuentes', 'Contacto y Soporte',
    'Privacidad y Protección de datos', 'Aviso legal', 'Política de cookies'] }],
];
const COMPANY = { title: 'EMPRESA', links: ['Prensa y noticias', 'Equipo y empleo', 'Investigación y patentes'] };
const CONTACT = { title: 'CONTACTO', phone: '(+ 34) 923 580 375', email: 'store@joselito.com' };
const SOCIAL = [{ icon: 'xlogo', label: 'X' }, { icon: 'facebook-logo', label: 'Facebook' }, { icon: 'instagram-logo', label: 'Instagram' }];
const LEGAL = ['Condiciones de compra', 'Uso del sitio', 'Calidad', 'Canal ético'];
const QUOTE = 'Historias, novedades\ny experiencias para disfrutar del universo Joselito.';

const text = (l) => (typeof l === 'string' ? l : l.text);
const href = (l) => (typeof l === 'string' ? '#' : l.href ?? '#');

function Group({ title, links }) {
  return (
    <div className="m03-footer__group">
      <h2 className="m03-footer__title ts-body-02">{title}</h2>
      <ul className="m03-footer__list">{links.map((l, i) => <li key={i}><a className="m03-footer__link ts-body-03" href={href(l)}>{text(l)}</a></li>)}</ul>
    </div>
  );
}

function Social({ items }) {
  return (
    <ul className="m03-footer__social">
      {items.map((s) => <li key={s.icon}><a className="m03-footer__icon" href={s.href ?? '#'} aria-label={s.label}><Icon name={s.icon} size="M" /></a></li>)}
    </ul>
  );
}

function Seals() {
  return (
    <ul className="m03-footer__seals">
      <li className="m03-footer__seal"><Logo name="pefc-mark" width={56} title="PEFC" /><span className="ts-body-02">Programme for the Endorsement of Forest Certification</span></li>
      <li className="m03-footer__seal"><Logo name="logo-junta-castilla-leon" width={56} title="Junta de Castilla y León" /><span className="ts-body-02">Subvencionado por la Junta de Castilla y León</span></li>
      <li className="m03-footer__seal m03-footer__seal--award"><span className="m03-footer__award"><img src={ekomi} alt="Ekomi" /></span><span className="ts-body-02">Ekomi Customer Award</span></li>
    </ul>
  );
}

/**
 * Pie de página. Escritorio (desde 1024 px): cuatro columnas de enlaces; newsletter con frase destacada,
 * hoja animada y empresa/contacto/redes; barra legal con idioma; sellos. Móvil: secciones en acordeón.
 * `media` = vídeo o imagen central (en Figma es un relleno de vídeo).
 */
export default function M03NavigationFooter({
  columns = COLUMNS, company = COMPANY, contact = CONTACT, social = SOCIAL, legal = LEGAL, quote = QUOTE,
  newsletterLabel = 'Date de alta en nuestra newsletter', privacyText = 'Acepto la política de privacidad',
  copyright = '© 1868 - 2026 Cárnicas Joselito S.A.', language = 'English', languages = ['Español', 'English'],
  media = { type: 'image', src: leafPoster }, onSubscribe, theme, className = '', ...rest
}) {
  const [email, setEmail] = useState('');
  const groups = columns.flat();
  const mediaEl = (
    <AspectRatio className="m03-footer__media" size="3:4" src={media?.type === 'video' ? undefined : media?.src} alt="">
      {media?.type === 'video' && <video className="aspect-ratio__media" src={media.src} poster={media.poster} autoPlay muted loop playsInline />}
    </AspectRatio>
  );
  const newsletter = (
    <form className="m03-footer__form" onSubmit={(e) => { e.preventDefault(); onSubscribe?.(email); }}>
      <p className="m03-footer__label ts-body-03">{newsletterLabel}</p>
      <div className="m03-footer__fields">
        <InputAndButton size="Small" label="Email" showInfo={false} onChange={(e) => setEmail(e.target.value)} onSubmit={() => onSubscribe?.(email)} />
        <CheckboxLabel size="Small" text={privacyText} />
      </div>
    </form>
  );
  return (
    <footer className={['m03-footer', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {/* Escritorio */}
      <div className="m03-footer__desktop">
        <div className="m03-footer__links">
          {columns.map((col, i) => <div key={i} className="m03-footer__col">{col.map((g) => <Group key={g.title} {...g} />)}</div>)}
        </div>
        <div className="m03-footer__newsletter">
          <div className="m03-footer__intro">
            <p className="m03-footer__quote ts-title-03">{quote}</p>
            {newsletter}
          </div>
          {mediaEl}
          <div className="m03-footer__contact">
            <Group {...company} />
            <Group title={contact.title} links={[{ text: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, '')}` }, { text: contact.email, href: `mailto:${contact.email}` }]} />
            <Social items={social} />
          </div>
        </div>
        <div className="m03-footer__bar">
          <span className="m03-footer__copy ts-body-02">{copyright}</span>
          <ul className="m03-footer__legal">{legal.map((l, i) => <li key={i}><a className="ts-body-02" href={href(l)}>{text(l)}</a></li>)}</ul>
          <label className="m03-footer__lang ts-body-02">
            <span className="m03-footer__sr">Idioma</span>
            <select defaultValue={language}>{languages.map((l) => <option key={l}>{l}</option>)}</select>
            <Icon name="caret-down" size="XXS" />
          </label>
        </div>
        <Seals />
      </div>

      {/* Móvil */}
      <div className="m03-footer__mobile">
        <div className="m03-footer__m-links">
          <div className="m03-footer__accordions">
            {[...groups, company].map((g) => <MobileMenuAccordion key={g.title} title={g.title} content="links" links={g.links} feature={null} />)}
            <MobileMenuAccordion title={contact.title} content="links" feature={null}
              links={[{ text: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, '')}` }, { text: contact.email, href: `mailto:${contact.email}` }]} />
          </div>
          <Social items={social} />
        </div>
        <div className="m03-footer__m-newsletter">
          <div className="m03-footer__m-intro">
            <p className="m03-footer__quote ts-title-03">{quote}</p>
            {newsletter}
          </div>
          {mediaEl}
          <div className="m03-footer__m-contact ts-body-02">
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
        <div className="m03-footer__m-legal">
          <div className="m03-footer__m-legal-links">
            <ul className="m03-footer__legal">{legal.map((l, i) => <li key={i}><a className="ts-body-02" href={href(l)}>{text(l)}</a></li>)}</ul>
            <span className="m03-footer__copy ts-body-02">{copyright}</span>
          </div>
          <MobileMenuAccordion title={language.toUpperCase()} content="links" links={languages.map((l) => l.toUpperCase())} feature={null} />
        </div>
        <Seals />
      </div>
    </footer>
  );
}
