import AspectRatio from '../AspectRatio/AspectRatio';
import Button from '../Button/Button';
import ButtonActionLink from '../ButtonActionLink/ButtonActionLink';
import InputQuantity from '../InputQuantity/InputQuantity';
import Tag from '../Tag/Tag';
import './CardProduct.css';

export const TYPES = ['Vertical', 'Horizontal'];

/**
 * Tarjeta de producto: foto 3:4 (con etiqueta y CTA rápido opcionales encima), nombre, precio y/o
 * peso, selector de cantidad opcional y enlace de acción. `Vertical` apila; `Horizontal` pone la
 * foto (140 px) a la izquierda. Ocupa el ancho de su contenedor (columna del grid).
 */
export default function CardProduct({
  type = 'Vertical',
  image,
  imageAlt = '',
  href,
  title = 'Jamón Gran Reserva',
  showDatas = true,
  showPrice = true,
  price = '380€',
  showData = false,
  data = '1.2kg',
  showLabel = false,
  label = 'LABEL',
  showQuickCTA = false,
  quickCTAText = 'Button',
  onQuickCTA,
  showQuantity = false,
  quantityProps,
  showButton = true,
  buttonText = 'añadir al carrito',
  onButton,
  theme,
  className = '',
  ...rest
}) {
  const horizontal = type === 'Horizontal';
  const name = href ? <a className="card-product__link" href={href}>{title}</a> : title;
  return (
    <article className={['card-product', `card-product--${type.toLowerCase()}`, className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="card-product__photo">
        <AspectRatio size="3:4" src={image} alt={imageAlt} />
        {showLabel && <Tag className="card-product__tag" type="Transaction" size="XS" text={label} />}
        {showQuickCTA && !horizontal && (
          <Button className="card-product__quick" type="Primary" size="S" text={quickCTAText} onClick={onQuickCTA} />
        )}
      </div>
      <div className="card-product__box">
        <div className="card-product__info">
          <h3 className="card-product__title ts-body-04">{name}</h3>
          {showDatas && (showPrice || showData) && (
            <p className="card-product__data ts-body-04">
              {showPrice && <span>{price}</span>}
              {showData && <span>{data}</span>}
            </p>
          )}
          {showQuantity && <div className="card-product__qty"><InputQuantity {...quantityProps} /></div>}
        </div>
        {showButton && <ButtonActionLink size="L" text={buttonText} onClick={onButton} />}
      </div>
    </article>
  );
}
