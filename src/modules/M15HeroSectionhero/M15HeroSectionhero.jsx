import AspectRatio from '../../components/AspectRatio/AspectRatio';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import GoBack from '../../components/GoBack/GoBack';
import M01Navigation from '../M01Navigation/M01Navigation';
import './M15HeroSectionhero.css';

export const IMAGES = ['Horizontal', 'Vertical', 'None - Producto', 'None'];
export const STATUSES = ['Default', 'Scroll Down'];

function Media({ media, size, className }) {
  return (
    <AspectRatio className={className} size={size} src={media?.type === 'video' ? undefined : media?.src} alt={media?.alt ?? ''}>
      {media?.type === 'video' && <video className="aspect-ratio__media" src={media.src} poster={media.poster} autoPlay muted loop playsInline />}
    </AspectRatio>
  );
}

/**
 * Cabecera de sección (hero). `image` Horizontal (4:3) o Vertical (3:4): en `Default` el medio es
 * pequeño y centrado sobre fondo claro; en `Scroll Down` (al hacer scroll) se expande a pantalla
 * completa con velo oscuro y la cabecera M01 pasa a Dark. `None - Producto`: solo título.
 * `None`: etiqueta, título y enlace sin medio.
 */
export default function M15HeroSectionhero({
  image = 'Horizontal', status = 'Default', title = 'Seis Generaciones de Excelencia', subtitle = 'COLECCIONES JOSELITO',
  showLink = true, linkText = 'DESCUBRIR', href = '#', showBody = false, body = 'Seis generaciones dedicadas a criar, curar y seleccionar cada pieza con paciencia.',
  showBack = false, backText = 'VOLVER', backHref = '#', media, showNavigation = true, theme, className = '', ...rest
}) {
  const hasMedia = image === 'Horizontal' || image === 'Vertical';
  const expanded = hasMedia && status === 'Scroll Down';
  const subtheme = theme ?? (expanded ? 'dark-black-neutral' : 'light-white');
  const slug = image.toLowerCase().replace(/[^a-z]+/g, '-');
  const content = (
    <div className="m15-hero__content">
      {showBack && <GoBack text={backText} href={backHref} />}
      <div className="m15-hero__titles">
        {image !== 'None - Producto' && subtitle && <p className="m15-hero__subtitle ts-cta-03">{subtitle}</p>}
        <h1 className="m15-hero__title ts-title-04">{title}</h1>
        {showBody && <p className="m15-hero__body ts-body-03">{body}</p>}
      </div>
      {showLink && image !== 'None - Producto' && <ButtonActionLink size="L" text={linkText} href={href} />}
    </div>
  );
  return (
    <section className={['m15-hero', `m15-hero--${slug}`, hasMedia ? 'has-media' : '', expanded ? 'is-expanded' : '', className].filter(Boolean).join(' ')}
      data-theme={subtheme} {...rest}>
      {hasMedia && expanded && (
        <>
          <Media className="m15-hero__bg" media={media} size="Fill" />
          <div className="m15-hero__shade" aria-hidden="true" />
        </>
      )}
      {hasMedia && showNavigation && <M01Navigation className="m15-hero__nav" mode={expanded ? 'Dark' : 'Light'} />}
      {hasMedia && !expanded && (
        <div className="m15-hero__stage">
          <Media className="m15-hero__media" media={media} size={image === 'Vertical' ? '3:4' : '4:3'} />
        </div>
      )}
      {content}
    </section>
  );
}
