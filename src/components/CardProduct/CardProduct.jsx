import './CardProduct.css';
import AspectRatio from '../AspectRatio/AspectRatio.jsx';
import Button from '../Button/Button.jsx';
import ActionLink from '../ActionLink/ActionLink.jsx';
import Icon from '../Icon/Icon.jsx';

/**
 * Card Product — ficha de producto. Compone AspectRatio, un badge, título (SangBleu),
 * precio, dirección, chips de ubicación (Button secondary), estrellas y un Action-Link.
 */
export default function CardProduct({
  title = 'Jamón Gran Reserva',
  price = 'Desde 380€',
  address,
  badge,
  locations = [],
  stars = 0,
  cta = 'Descubrir',
  image,
  ratio = '3:4',
  className = '',
  ...rest
}) {
  return (
    <div className={`jl-cardproduct ${className}`} {...rest}>
      <div className="jl-cardproduct__media">
        <AspectRatio ratio={ratio}>
          {image ? <img className="jl-cardproduct__img" src={image} alt="" /> : <div className="jl-cardproduct__placeholder" />}
        </AspectRatio>
        {badge && <span className="jl-cardproduct__badge ts-body-1">{badge}</span>}
      </div>
      <div className="jl-cardproduct__body">
        <div className="jl-cardproduct__info">
          <div className="jl-cardproduct__titletext">
            <div className="jl-cardproduct__head">
              <p className="jl-cardproduct__title ts-title-2">{title}</p>
              {price && <p className="jl-cardproduct__price ts-body-2">{price}</p>}
            </div>
            {address && <p className="jl-cardproduct__address ts-body-3">{address}</p>}
          </div>
          {(locations.length > 0 || stars > 0) && (
            <div className="jl-cardproduct__meta">
              {locations.length > 0 && (
                <div className="jl-cardproduct__chips">
                  {locations.map((l, i) => <Button key={i} type="secondary" size="xs">{l}</Button>)}
                </div>
              )}
              {stars > 0 && (
                <div className="jl-cardproduct__stars">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} className="jl-cardproduct__star"><Icon name="Star" size={18} /></span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {cta && <ActionLink>{cta}</ActionLink>}
      </div>
    </div>
  );
}
