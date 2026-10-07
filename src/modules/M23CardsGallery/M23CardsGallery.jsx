import { useEffect, useState } from 'react';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import CardSocialMedia from '../../components/CardSocialMedia/CardSocialMedia';
import Title from '../../components/Title/Title';
import g1 from '../../assets/images/m23-cards-gallery-3.webp';
import g2 from '../../assets/images/m23-cards-gallery-2.webp';
import g3 from '../../assets/images/m23-cards-gallery-6.webp';
import g4 from '../../assets/images/m23-cards-gallery-5.webp';
import g5 from '../../assets/images/card-social-media.webp';
import g6 from '../../assets/images/m23-cards-gallery.webp';
import g7 from '../../assets/images/m23-cards-gallery-4.webp';
import './M23CardsGallery.css';

export const TYPES = ['Carrousel', 'Carrousel - No text', 'Default'];
const ITEMS = [
  { image: g1, tag: '@jamonjoselito', vertical: true }, { image: g2, tag: '@autecuisine', vertical: false },
  { image: g3, tag: '@jamonjoselito', vertical: true }, { image: g4, tag: '@elbulli', vertical: false },
  { image: g5, tag: '@jamonjoselito', vertical: true }, { image: g6, tag: '@jamonjoselito', vertical: false },
  { image: g7, tag: '@jamonjoselito', vertical: true },
];

/** Visor de la galería (Type=Default): imagen actual 3:2 con las vecinas atenuadas, flechas, cierre, leyenda y contador. */
export function M23Lightbox({ items = ITEMS, index = 0, onIndex, onClose, caption = 'EGESTAS NULLA TORTOT PULVINAR', inline = false, className = '', ...rest }) {
  const n = items.length;
  const go = (d) => onIndex?.((index + d + n) % n);
  useEffect(() => {
    if (inline) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });
  const at = (d) => items[(index + d + n) % n];
  return (
    <div className={['m23-lightbox', inline ? 'is-inline' : '', className].filter(Boolean).join(' ')} role="dialog" aria-modal={!inline} aria-label="Galería" data-theme="light-white" {...rest}>
      <ButtonIcon className="m23-lightbox__close" type="Terciary" size="S" icon="x" label="Cerrar galería" onClick={onClose} />
      <div className="m23-lightbox__stage">
        <AspectRatio className="m23-lightbox__side" size="3:4" src={at(-1).image} alt="" aria-hidden="true" />
        <AspectRatio className="m23-lightbox__current" size="3:2" src={at(0).image} alt={at(0).alt ?? ''} />
        <AspectRatio className="m23-lightbox__side" size="3:4" src={at(1).image} alt="" aria-hidden="true" />
      </div>
      <div className="m23-lightbox__arrows">
        <ButtonIcon type="Primary" size="M" icon="arrow-left" label="Imagen anterior" onClick={() => go(-1)} />
        <ButtonIcon type="Primary" size="M" icon="arrow-right" label="Imagen siguiente" onClick={() => go(1)} />
      </div>
      <p className="m23-lightbox__caption">
        <span className="ts-labels-01">{at(0).caption ?? caption}</span>
        <span className="ts-labels-01" aria-live="polite">{index + 1} / {n}</span>
      </p>
    </div>
  );
}

/**
 * Galería de redes sociales: cabecera con "Ver todos", carrusel horizontal de Card-Social-media
 * (verticales y horizontales alternas, desplazable) y "Síguenos @usuario". Cada tarjeta abre el visor
 * (Type=Default). `Carrousel - No text` oculta las etiquetas de las tarjetas.
 */
export default function M23CardsGallery({
  type = 'Carrousel', showTitle = true, eyebrow = 'La dehesa en imágenes', linkText = 'Ver todos', href = '#', items = ITEMS,
  showInstagram = true, followLabel = 'SÍGUENOS', account = '@JAMONJOSELITO', accountHref = 'https://www.instagram.com/jamonjoselito/',
  openOnClick = true, theme, className = '', ...rest
}) {
  const [open, setOpen] = useState(type === 'Default' ? 0 : -1);
  if (type === 'Default') {
    return <M23Lightbox className={className} items={items} index={Math.max(open, 0)} onIndex={setOpen} inline data-theme={theme} {...rest} />;
  }
  const showTag = type !== 'Carrousel - No text';
  return (
    <section className={['m23-gallery', showTag ? '' : 'm23-gallery--no-text', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {showTitle && <Title className="m23-gallery__title" eyebrow={eyebrow} showTitle={false} showLink linkText={linkText} href={href} />}
      <ul className="m23-gallery__track">
        {items.map((it, i) => (
          <li key={i} className={it.vertical ? 'is-vertical' : 'is-horizontal'}>
            <CardSocialMedia vertical={it.vertical} image={it.image} imageAlt={it.alt ?? ''} tag={it.tag} showTag={showTag}
              {...(openOnClick ? { role: 'button', tabIndex: 0, 'aria-label': `Ver imagen ${i + 1}`, onClick: () => setOpen(i),
                onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(i); } } } : {})} />
          </li>
        ))}
      </ul>
      {showInstagram && (
        <p className="m23-gallery__follow ts-labels-02">
          <span>{followLabel}</span>
          <a href={accountHref} target="_blank" rel="noreferrer">{account}</a>
        </p>
      )}
      {open >= 0 && <M23Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(-1)} />}
    </section>
  );
}
