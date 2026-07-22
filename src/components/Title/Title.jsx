import './Title.css';
import Icon from '../Icon/Icon.jsx';

/**
 * Title — encabezado de sección: texto de título (Body/04) y, opcionalmente,
 * un enlace "ver todos" (Body/03) con chevron a la derecha.
 */
export default function Title({
  children = 'Nuestra colección',
  as = 'h2',
  showLink = false,
  linkText = 'Ver todos',
  href,
  onLinkClick,
  className = '',
  ...rest
}) {
  const Heading = as;
  return (
    <div className={`jl-title ${className}`} {...rest}>
      <Heading className="jl-title__text ts-body-4">{children}</Heading>
      {showLink && (
        href
          ? <a className="jl-title__link ts-body-3" href={href}>{linkText}<span className="jl-title__icon"><Icon name="CaretRight" size="XS" /></span></a>
          : <button type="button" className="jl-title__link ts-body-3" onClick={onLinkClick}>{linkText}<span className="jl-title__icon"><Icon name="CaretRight" size="XS" /></span></button>
      )}
    </div>
  );
}
