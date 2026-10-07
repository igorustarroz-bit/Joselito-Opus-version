import AspectRatio from '../../components/AspectRatio/AspectRatio';
import { Logo } from '../../components/BrandLogo/BrandLogo';
import Button from '../../components/Button/Button';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import GoBack from '../../components/GoBack/GoBack';
import Toast from '../../components/Toast/Toast';
import imgExperience from '../../assets/images/m14-hero-sectionheader.webp';
import imgStore from '../../assets/images/m14-hero-sectionheader-2.webp';
import imgChef from '../../assets/images/m14-hero-sectionheader-4.webp';
import './M14HeroSectionheader.css';

export const PROPERTIES = ['Tiendas y Restaurantes', 'Experiencias', 'Cocinero'];

/** Contenido y subtema de cada Property de Figma. */
export const PRESETS = {
  'Tiendas y Restaurantes': {
    theme: 'dark-red-primary', back: 'TIENDAS Y RESTAURANTES', label: 'BOUTIQUE GASTRO DEL IBÉRICO', title: 'Joselito’s Velazquez',
    text: 'Calle Velázquez, 30. Barrio de Salamanca\n28001 Madrid', image: imgStore,
    links: [{ text: 'VER MAPA', href: '#' }, { text: '+34 917 274 762', href: 'tel:+34917274762' }],
    buttons: [{ text: 'RESERVAR' }, { text: 'CARTA' }, { text: 'VINOS' }],
  },
  Experiencias: {
    theme: 'dark-black-neutral', back: 'TIENDAS Y RESTAURANTES', title: 'Travellers Collection',
    text: 'Volutpat eget sit eget quis laoreet tortor laoreet. Enim arcu morbi mauris urna fusce.', image: imgExperience,
    buttons: [{ text: 'COMPRAR' }],
  },
  Cocinero: {
    theme: 'light-grey', back: 'JOSELITO LAB', title: 'Ferrán Adriá', signature: 'firma-ferran-adria',
    text: '« Joselito no hace jamones.\nHace los Dom Pérignon del ibérico »', image: imgChef, buttons: [{ text: 'COMPRAR' }],
  },
};

/**
 * Cabecera de sección a media pantalla: a la izquierda, volver, etiqueta, gran título (Title/07),
 * texto, enlaces y botones; a la derecha, imagen 3:4. Cada Property fija un subtema y un contenido
 * de ejemplo (tienda en rojo, experiencia en oscuro, cocinero en gris con firma). En móvil se apila.
 */
export default function M14HeroSectionheader({ property = 'Tiendas y Restaurantes', showLabels = true, showButton = true, showToast = false, toast = {},
  backHref = '#', onBack, imageAlt = '', className = '', ...overrides }) {
  const p = { ...(PRESETS[property] ?? PRESETS.Experiencias), ...Object.fromEntries(Object.entries(overrides).filter(([, v]) => v !== undefined)) };
  const { theme, back, label, title, text, image, links, buttons, signature, ...rest } = p;
  return (
    <section className={['m14-header', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="m14-header__main">
        <GoBack text={back} href={backHref} onClick={onBack} />
        <div className="m14-header__body">
          <div className="m14-header__content">
            {showLabels && label && <p className="m14-header__label ts-labels-02">{label}</p>}
            <div className="m14-header__heading">
              <h1 className="m14-header__title ts-title-07">{title}</h1>
              {signature && <Logo className="m14-header__signature" name={signature} title={`Firma de ${title}`} />}
            </div>
            {text && <p className="m14-header__text ts-body-03">{text}</p>}
            {links?.length > 0 && (
              <div className="m14-header__links">{links.map((l, i) => <ButtonActionLink key={i} size="L" text={l.text} href={l.href} onClick={l.onClick} />)}</div>
            )}
          </div>
          {showButton && buttons?.length > 0 && (
            <div className="m14-header__buttons">
              {buttons.map((b, i) => <Button key={i} type={i === 0 ? 'Primary' : 'Terciary'} size="M" text={b.text} href={b.href} onClick={b.onClick} />)}
            </div>
          )}
        </div>
      </div>
      <div className="m14-header__media">
        <AspectRatio size="3:4" src={image} alt={imageAlt} />
        {showToast && <div className="m14-header__toast"><Toast theme="light-white" {...toast} /></div>}
      </div>
    </section>
  );
}
