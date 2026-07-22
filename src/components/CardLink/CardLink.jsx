import './CardLink.css';
import AspectRatio from '../AspectRatio/AspectRatio.jsx';

/**
 * Card Link — tarjeta-enlace: imagen con proporción (3:4 por defecto) y título +
 * subtítulo superpuestos en la parte inferior. Título en SangBleu (Title/02).
 */
export default function CardLink({
  title = 'Jamón Gran Reserva',
  subtitle,
  image,
  imageAlt = '',
  href = '#',
  ratio = '3:4',
  as = 'a',
  className = '',
  ...rest
}) {
  const Tag = as;
  return (
    <Tag className={`jl-cardlink ${className}`} href={as === 'a' ? href : undefined} {...rest}>
      <div className="jl-cardlink__media">
        <AspectRatio ratio={ratio}>
          {image ? <img className="jl-cardlink__img" src={image} alt={imageAlt} /> : <div className="jl-cardlink__placeholder" />}
        </AspectRatio>
      </div>
      <div className="jl-cardlink__overlay">
        <p className="jl-cardlink__title ts-title-2">{title}</p>
        {subtitle && <p className="jl-cardlink__subtitle ts-body-2">{subtitle}</p>}
      </div>
    </Tag>
  );
}
