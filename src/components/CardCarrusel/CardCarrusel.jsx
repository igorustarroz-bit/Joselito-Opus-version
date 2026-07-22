import './CardCarrusel.css';
import AspectRatio from '../AspectRatio/AspectRatio.jsx';
import Tag from '../Tag/Tag.jsx';
import ActionLink from '../ActionLink/ActionLink.jsx';

/**
 * Card Carrusel — tarjeta de carrusel. Compone AspectRatio, Tag y Action-Link.
 * Orientación "horizontal" (imagen + texto al lado) o "vertical" (apilado).
 * Título en SangBleu (Title/04).
 */
export default function CardCarrusel({
  title = 'Joselitos Velázquez',
  body,
  tags = [],
  cta = 'Descubrir',
  image,
  orientation = 'horizontal',
  ratio = '3:2',
  className = '',
  ...rest
}) {
  const h = orientation === 'horizontal';
  return (
    <div className={`jl-carrusel jl-carrusel--${h ? 'h' : 'v'} ${className}`} {...rest}>
      <div className="jl-carrusel__media">
        <AspectRatio ratio={ratio}>
          {image ? <img className="jl-carrusel__img" src={image} alt="" /> : <div className="jl-carrusel__placeholder" />}
        </AspectRatio>
      </div>
      <div className="jl-carrusel__content">
        <div className="jl-carrusel__texts">
          <p className="jl-carrusel__title ts-title-4">{title}</p>
          {body && <p className="jl-carrusel__body ts-body-2">{body}</p>}
          {tags.length > 0 && (
            <div className="jl-carrusel__tags">
              {tags.map((t, i) => <Tag key={i} type="transaction" size="l">{t}</Tag>)}
            </div>
          )}
        </div>
        {cta && <ActionLink>{cta}</ActionLink>}
      </div>
    </div>
  );
}
