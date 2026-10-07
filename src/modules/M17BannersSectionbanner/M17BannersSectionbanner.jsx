import { useEffect, useRef, useState } from 'react';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import Tag from '../../components/Tag/Tag';
import chef from '../../assets/images/m17-banners-sectionbanner-2.webp';
import ham from '../../assets/images/m17-banners-sectionbanner.webp';
import './M17BannersSectionbanner.css';

export const TYPES = ['Borders', 'Full Screen', 'Animated - Product'];
export const STATUSES = ['Static', 'Animated'];

/**
 * Banner de sección. Borders: imagen 16:9 con márgenes y tarjeta blanca encima. Full Screen: imagen a
 * sangre con velo y texto al pie. Animated - Product: imagen enmarcada (Static) que se expande a pantalla
 * completa y muestra el producto (Animated); con `animateOnView` el cambio ocurre al entrar en pantalla.
 */
export default function M17BannersSectionbanner({
  type = 'Borders', status, animateOnView = false, showLabel = true, showBody = true, showPretitle = false,
  label = 'LOREM IPSUM', title, text, productTitle = 'Jamón Millésime',
  productText = 'Lorem ipsum dolor sit amet consectetur. Sit amet dui quis et diam lobortis in. Laoreet nulla etiam egestas arcu.',
  tags = ['100% NATURAL', '7 - 8 KG', 'AÑADA 2019'], price = 'Desde 280€', linkText = 'DESCUBRE MÁS', href = '#', image, imageAlt = '',
  theme, className = '', ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!animateOnView || type !== 'Animated - Product' || !ref.current || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= 0.6), { threshold: [0, 0.6, 1] });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [animateOnView, type]);
  const t = title ?? 'Lorem ipsum dolor sit amet consectetur.';
  const body = text ?? 'Lorem ipsum dolor sit amet consectetur. Adipiscing donec rhoncus sem sed tellus nisl at id. Mattis hendrerit nunc porttitor lobortis quis neque pulvinar.';
  const isProduct = type === 'Animated - Product';
  const animated = isProduct && (status ? status === 'Animated' : inView);
  const src = image ?? (isProduct ? ham : chef);
  const slug = type.toLowerCase().replace(/[^a-z]+/g, '-');
  const subtheme = theme ?? (type === 'Borders' ? 'light-white' : 'dark-black-neutral');
  const link = <ButtonActionLink size="L" text={linkText} href={href} />;
  return (
    <section ref={ref} className={['m17-banner', `m17-banner--${slug}`, animated ? 'is-animated' : '', className].filter(Boolean).join(' ')}
      data-theme={type === "Borders" ? subtheme : "light-white"} {...rest}>
      <div className="m17-banner__frame" data-theme={subtheme}>
        <AspectRatio className="m17-banner__media" size="Fill" src={src} alt={imageAlt} />
        {type !== 'Borders' && <div className="m17-banner__shade" aria-hidden="true" />}
        {type === 'Borders' && (
          <div className="m17-banner__card" data-theme="light-white">
            <div className="m17-banner__titles">
              {showLabel && <p className="m17-banner__label ts-labels-02">{label}</p>}
              <h2 className="m17-banner__title ts-title-02">{t}</h2>
              {showBody && <p className="m17-banner__text ts-body-03">{body}</p>}
            </div>
            {link}
          </div>
        )}
        {type === 'Full Screen' && (
          <div className="m17-banner__content">
            <div className="m17-banner__titles">
              {showLabel && <p className="m17-banner__label ts-labels-02">{label}</p>}
              <h2 className="m17-banner__title ts-title-04">{t}</h2>
              {showBody && <p className="m17-banner__text ts-body-04">{body}</p>}
            </div>
            {link}
          </div>
        )}
        {isProduct && (
          <div className="m17-banner__content m17-banner__content--product" aria-hidden={!animated}>
            <div className="m17-banner__titles">
              {showPretitle && <p className="m17-banner__label ts-labels-02">{label}</p>}
              <h2 className="m17-banner__title ts-title-04">{productTitle}</h2>
              {showBody && <p className="m17-banner__text ts-body-03">{productText}</p>}
              {tags?.length > 0 && <ul className="m17-banner__tags">{tags.map((g) => <li key={g}><Tag type="Aseptic" size="XS" text={g} /></li>)}</ul>}
              {price && <p className="m17-banner__price ts-body-03">{price}</p>}
            </div>
            {link}
          </div>
        )}
      </div>
    </section>
  );
}
