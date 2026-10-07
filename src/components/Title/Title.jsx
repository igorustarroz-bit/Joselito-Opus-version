import Icon from '../Icon/Icon';
import './Title.css';

/**
 * Cabecera de sección: antetítulo (Body/04) con enlace "Ver todos" opcional a la derecha y, debajo,
 * el título (Title/03). Ocupa el ancho completo del contenedor. `as` fija el nivel del título (h2 por defecto).
 */
export default function Title({
  eyebrow = 'Nuestra colección',
  title = 'Lorem ipsum dolor sit amet cucuster',
  showTitle = true,
  showLink = true,
  linkText = 'Ver todos',
  href = '#',
  as: Heading = 'h2',
  theme,
  className = '',
  ...rest
}) {
  return (
    <div className={['title-block', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="title-block__row">
        <p className="title-block__eyebrow ts-body-04">{eyebrow}</p>
        {showLink && (
          <a className="title-block__link ts-body-03" href={href}>
            <span>{linkText}</span>
            <Icon name="caret-right" size="S" />
          </a>
        )}
      </div>
      {showTitle && <Heading className="title-block__title ts-title-03">{title}</Heading>}
    </div>
  );
}
