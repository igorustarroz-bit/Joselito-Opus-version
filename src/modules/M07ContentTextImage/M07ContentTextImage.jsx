import AspectRatio from '../../components/AspectRatio/AspectRatio';
import Divider from '../../components/Divider/Divider';
import photo from '../../assets/images/toast.webp';
import './M07ContentTextImage.css';

export const TYPES = ['Left', 'Right', 'Half-Left', 'Half-Right'];
export const FORMATS = ['Horizontal', 'Vertical'];

/**
 * Bloque de contenido con texto e imagen. `type` = lado de la imagen (Left/Right, con márgenes) o
 * Half-Left/Half-Right (imagen a sangre ocupando media pantalla). `imageFormat` = Horizontal (4:3, 6 columnas)
 * o Vertical (3:4, 5 columnas; Half siempre vertical). En móvil se apila en el orden del contenido.
 */
export default function M07ContentTextImage({
  type = 'Left', imageFormat = 'Horizontal', label = 'THIS IS A LABEL', title = 'Declarado el mejor jamón del mundo',
  text = 'Apasionados por la perfección en cada detalle del proceso: desde la cría del cerdo en libertad hasta la curación natural en bodegas centenarias. Joselito no solo conserva un legado, lo eleva a la categoría de arte gastronómico, reconocido en los cinco continentes.',
  note, image = photo, imageAlt = '', children, theme, className = '', ...rest
}) {
  const half = type.startsWith('Half');
  const format = half ? 'Vertical' : imageFormat;
  const right = type.endsWith('Right');
  const media = <AspectRatio className="m07-content__media" size={format === 'Vertical' ? '3:4' : '4:3'} src={image} alt={imageAlt} />;
  const copy = (
    <div className="m07-content__text">
      <div className="m07-content__slot">
        {children ?? (
          <>
            {label && <p className="m07-content__label ts-body-03">{label}</p>}
            {title && <h2 className="m07-content__title ts-title-03">{title}</h2>}
            {text && <p className="m07-content__body ts-body-03">{text}</p>}
          </>
        )}
      </div>
      {note && (
        <>
          <Divider />
          <p className="m07-content__note ts-body-02">{note}</p>
        </>
      )}
    </div>
  );
  const cls = ['m07-content', half ? 'm07-content--half' : `m07-content--${format.toLowerCase()}`, right ? 'is-right' : 'is-left', className];
  return (
    <section className={cls.filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {right ? <>{copy}{media}</> : <>{media}{copy}</>}
    </section>
  );
}
