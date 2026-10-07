import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import './M12ContentIntrotext.css';

const BOXES = [
  { label: 'Email', value: 'reservas@joselito.com', href: 'mailto:reservas@joselito.com' },
  { label: 'Teléfono', value: '619 160 052', href: 'tel:+34619160052' },
];

/**
 * Introducción centrada de una sección: etiqueta, título destacado, párrafo, cajas de datos (p. ej.
 * contacto) y enlace. Cada bloque se puede ocultar.
 */
export default function M12ContentIntrotext({
  label = 'UN LEGADO ÚNICO', title = 'Seis generaciones y más de 150 años de historia han convertido el tiempo en el mayor valor de Joselito',
  body = 'Seis generaciones y más de 150 años de historia han convertido el tiempo en el mayor valor de Joselito. En la misma dehesa, tradición y saber hacer dan vida a un jamón único, fruto de aquello que nunca puede acelerarse.',
  boxes = BOXES, linkText = 'DESCUBRE MÁS', href = '#', showLabel = true, showTitle = true, showBody = true, showBoxes = true, showButton = true,
  theme, className = '', ...rest
}) {
  return (
    <section className={['m12-intro', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="m12-intro__inner">
        {showLabel && <p className="m12-intro__label ts-body-03">{label}</p>}
        <div className="m12-intro__content">
          {(showTitle || showBody) && (
            <div className="m12-intro__texts">
              {showTitle && <h2 className="m12-intro__title ts-title-03">{title}</h2>}
              {showBody && <p className="m12-intro__body ts-body-03">{body}</p>}
            </div>
          )}
          {showBoxes && boxes?.length > 0 && (
            <ul className="m12-intro__boxes">
              {boxes.map((b, i) => (
                <li key={i} className="m12-intro__box ts-body-04">
                  <span className="m12-intro__box-label">{b.label}</span>
                  {b.href ? <a href={b.href}>{b.value}</a> : <span>{b.value}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {showButton && <ButtonActionLink size="L" text={linkText} href={href} />}
    </section>
  );
}
