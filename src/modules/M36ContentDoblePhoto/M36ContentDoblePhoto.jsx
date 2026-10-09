import AspectRatio from '../../components/AspectRatio/AspectRatio';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import photoVertical from '../../assets/images/m23-cards-gallery-6.webp';
import photoHorizontal from '../../assets/images/m32-list-archive-list.webp';
import './M36ContentDoblePhoto.css';

/**
 * M36 · Contenido con doble foto. Título con enlace de acción a la derecha, una foto vertical (2:3),
 * un párrafo y una foto horizontal que sale a sangre por la derecha y se apoya en el borde inferior del módulo.
 * Escritorio (desde 960 px): rejilla de 12 columnas — título 1–6 · enlace al final de la fila · foto vertical 2–4 ·
 * texto 6–9 · foto horizontal desde la 8 hasta el borde. Móvil y tablet: apilado en orden visual
 * (título → enlace → foto vertical → texto → foto horizontal a 2/3 a sangre).
 */
export default function M36ContentDoblePhoto({
  title = 'Lorem ipsum dolor sit amet',
  text = 'Joselito ofrece, a través de sus Entidades Emisoras, una amplia gama de tarjetas que van acompañadas de las marcas internacionales de mayor aceptación. Los beneficios añadidos a las tarjetas Joselito, las convierten en uno de los medios de pago más útiles del mercado.',
  linkText = 'Siguente', linkHref,
  imageVertical = photoVertical, imageVerticalAlt = '',
  imageHorizontal = photoHorizontal, imageHorizontalAlt = '',
  theme, className = '', ...rest
}) {
  return (
    <section className={['m36-doble', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {title && <h2 className="m36-doble__title ts-title-04">{title}</h2>}
      {linkText && (
        <ButtonActionLink className="m36-doble__link" text={linkText} href={linkHref} showIconRight />
      )}
      <AspectRatio className="m36-doble__photo-v" size="2:3" src={imageVertical} alt={imageVerticalAlt} />
      {text && <p className="m36-doble__text ts-body-02">{text}</p>}
      <AspectRatio className="m36-doble__photo-h" size="Fill" src={imageHorizontal} alt={imageHorizontalAlt} />
    </section>
  );
}
