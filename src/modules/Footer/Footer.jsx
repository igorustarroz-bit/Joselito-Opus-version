import { useState } from 'react';
import './Footer.css';
import Icon from '../../components/Icon/Icon.jsx';
import Input from '../../components/Input/Input.jsx';
import BrandLogo from '../../components/BrandLogo/BrandLogo.jsx';

const DEFAULT_COLUMNS = [
  { title: 'Productos', links: ['Jamones de Gran Reserva', 'Paletas de Gran Reserva', 'Carne Fresca', 'Embutidos', 'Loncheados', 'Accesorios'] },
  { title: 'Sobre Joselito', links: ['Nuestra historia', 'La Dehesa', 'Curación', 'Añadas', 'Manual de corte', 'Sostenibilidad'] },
  { title: 'Restaurantes y tiendas', links: ["Joselito's Velázquez", "Joselito's Las Rozas", "Joselito's Bernabeu"] },
  { title: 'Atención al cliente', links: ['Envíos y Devoluciones', 'Seguimiento del Pedido', 'Preguntas frecuentes', 'Contacto y Soporte', 'Aviso legal'] },
];

const DEFAULT_LEGAL = ['Condiciones de compra', 'Uso del sitio', 'Calidad', 'Canal ético'];

/**
 * Módulo Navigation/Footer — a 100% de ancho. Columnas de enlaces (acordeón en
 * mobile, columnas en desktop), bloque newsletter (SangBleu + email + isotipo + redes)
 * y barra legal. Reutiliza Input, Icon y BrandLogo.
 */
export default function Footer({
  columns = DEFAULT_COLUMNS,
  newsletterTitle = 'Historias, novedades y experiencias para disfrutar del universo Joselito.',
  newsletterNote = 'Suscríbete a nuestra newsletter',
  social = ['XLogo', 'FacebookLogo', 'InstagramLogo'],
  phone = '(+ 34) 923 580 375',
  email = 'store@joselito.com',
  legalLinks = DEFAULT_LEGAL,
  copyright = '© 1868 - 2026 Cárnicas Joselito S.A.',
  language = 'Español',
  className = '',
  ...rest
}) {
  const [open, setOpen] = useState(-1);
  return (
    <footer className={`jl-footer ${className}`} {...rest}>
      <div className="jl-footer__cols">
        {columns.map((col, i) => (
          <div className="jl-footer__col" key={i} data-open={open === i ? 'true' : 'false'}>
            <button type="button" className="jl-footer__colhead ts-body-2" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{col.title}</span>
              <span className="jl-footer__caret"><Icon name="CaretDown" size="S" /></span>
            </button>
            <div className="jl-footer__links ts-body-3">
              {col.links.map((l, j) => <a key={j} href="#">{typeof l === 'string' ? l : l.label}</a>)}
            </div>
          </div>
        ))}
      </div>

      <div className="jl-footer__news">
        <div className="jl-footer__news-inner">
          <p className="jl-footer__news-title ts-title-3">{newsletterTitle}</p>
          <div>
            <p className="jl-footer__news-note ts-body-2">{newsletterNote}</p>
            <Input size="small" label="Email" actionIcon="ArrowRight" />
          </div>
          <div className="jl-footer__contact ts-body-2">
            <span>{phone}</span>
            <span>{email}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
          <BrandLogo variant="isotipo" height={120} className="jl-footer__isotipo" />
          <div className="jl-footer__social">
            {social.map((s) => <a key={s} href="#" aria-label={s}><Icon name={s} size="M" /></a>)}
          </div>
        </div>
      </div>

      <div className="jl-footer__legal ts-body-2">
        <div className="jl-footer__legal-links">
          {legalLinks.map((l) => <a key={l} href="#">{l}</a>)}
        </div>
        <span className="jl-footer__copy">{copyright}</span>
        <button type="button" className="jl-footer__lang">
          {language}<Icon name="CaretDown" size="XS" />
        </button>
      </div>
    </footer>
  );
}
