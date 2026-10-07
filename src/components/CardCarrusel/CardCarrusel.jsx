import AspectRatio from '../AspectRatio/AspectRatio';
import Button from '../Button/Button';
import ButtonActionLink from '../ButtonActionLink/ButtonActionLink';
import photo from '../../assets/images/card-carrusel.webp';
import './CardCarrusel.css';

/**
 * Tarjeta de carrusel de tiendas / restaurantes. Se adapta a su propio ancho (container query):
 * estrecha (Mobile) = foto 3:2 arriba, texto, botones LLÁMANOS / VER EN MAPS y DESCUBRIR;
 * ancha (Desktop, desde 700 px) = foto a la izquierda y, a la derecha (5 columnas), texto, teléfono,
 * dirección y DESCUBRIR.
 */
export default function CardCarrusel({
  image = photo, imageAlt = '', title = 'Joselitos Velázquez', label = 'Label', showLabel = false,
  body = 'Lorem ipsum dolor sit amet consectetur. Purus neque sagittis ut risus vitae. Mattis duis turpis.', showBody = true,
  phone = '619 160 052', address = 'Calle Velázquez, 30. 28001 Madrid', showPhoneEmail = true, showBody2 = true,
  callHref, mapsHref, href = '#', showLink = true, theme, className = '', ...rest
}) {
  return (
    <article className={['card-carrusel', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="card-carrusel__inner">
        <AspectRatio className="card-carrusel__img" size="3:2" src={image} alt={imageAlt} />
        <div className="card-carrusel__content">
          <div className="card-carrusel__texts">
            <div className="card-carrusel__head">
              {showLabel && <p className="card-carrusel__label ts-body-02">{label}</p>}
              <h3 className="card-carrusel__title ts-title-03">{title}</h3>
              {showBody && <p className="card-carrusel__body ts-body-02">{body}</p>}
            </div>
            {showPhoneEmail && (
              <div className="card-carrusel__buttons">
                <Button type="Terciary" size="XS" text="LLÁMANOS" href={callHref ?? `tel:${phone.replace(/\s/g, '')}`} />
                <Button type="Terciary" size="XS" text="VER EN MAPS" href={mapsHref ?? '#'} />
              </div>
            )}
            {showBody2 && (
              <dl className="card-carrusel__info ts-body-02">
                <div><dt>Teléfono</dt><dd>{phone}</dd></div>
                <div><dt>Dirección</dt><dd>{address}</dd></div>
              </dl>
            )}
          </div>
          {showLink && <ButtonActionLink className="card-carrusel__link card-carrusel__link--s" size="S" text="DESCUBRIR" href={href} />}
          {showLink && <ButtonActionLink className="card-carrusel__link card-carrusel__link--l" size="L" text="DESCUBRIR" href={href} />}
        </div>
      </div>
    </article>
  );
}
