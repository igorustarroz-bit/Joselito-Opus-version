import './CardsAccordion.css';
import { useState, useRef } from 'react';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';
import Tag from '../../components/Tag/Tag.jsx';
import ActionLink from '../../components/ActionLink/ActionLink.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import fillerImg from '../../assets/images/generic-filler.webp';

/**
 * Módulo Cards / Accordion — component set `58512:9289`. Dos variantes vía prop `type`:
 *  - `type="accordion"` (por defecto): acordeón de producto (másters Desktop `58512:9287`
 *    / Mobile `58512:9288`). Un panel abierto + colapsados.
 *  - `type="carrousel"`: carril de fichas con scroll-snap + flechas prev/next (másters
 *    Desktop `58512:9285` / Mobile `58512:9286`). Reutiliza la misma ficha (`.jl-pacc__open`).
 *
 * Nomenclatura: en Figma este nodo se llama "Cards / Accordion" y este módulo lleva
 * el mismo nombre. La antigua banda tipográfica (máster `58182:24099`), que antes se
 * llamaba "Cards / Accordion" en Figma, es ahora "Cards / Big Titles" → módulo
 * `CardsBigTitles`.
 *
 * Estructura: cabecera (antetítulo `Body/04` + enlace "Ver todos" con CaretRight +
 * título SangBleu `Title/03`) y una fila/pila de paneles. UN panel abierto muestra la
 * ficha completa (imagen 3:4 + título + estrellas + cuerpo + tags + enlace "DESCUBRIR");
 * los colapsados muestran, en **desktop**, el título rotado 90° + el número, y en
 * **mobile**, el título centrado. Al pulsar un colapsado, ese se abre.
 *
 * Toggles del máster: `showStars`, `showBody`, `showLabels`, `showLink`.
 * Subtema claro por defecto; hereda del contenedor (colores por tokens).
 * Nota: anchos de panel (imagen 404 / detalle 315) y paddings (68/48/80) literales del
 * máster (no ligados a variable). El panel abierto abraza su contenido; los colapsados
 * reparten el resto.
 */
const DEFAULT_ITEMS = [
  {
    title: 'Joselito Gran Reserva',
    stars: 3,
    body:
      'Los jamones Gran Reserva representan la pureza del sabor Joselito en su forma más armoniosa: jugosos, suaves y de aromas delicados, en una experiencia gastronómica auténtica.',
    labels: ['Complejidad', 'Equilibrio', 'Dulzura'],
    cta: 'Descubrir',
    image: fillerImg,
  },
  { title: 'Joselito Vintage', stars: 3, body: 'Una añada excepcional, seleccionada entre las mejores piezas de la bodega.', labels: ['Intensidad', 'Carácter'], cta: 'Descubrir', image: fillerImg },
  { title: 'Joselito Millésime', stars: 3, body: 'La cima de la colección: curaciones largas y perfiles aromáticos únicos.', labels: ['Excepcional'], cta: 'Descubrir', image: fillerImg },
];

export default function CardsAccordion({
  eyebrow = 'Nuestra colección',
  link = 'Ver todos',
  linkHref = '#',
  title = 'Elige el jamón que mejor se adapte a tu celebración.',
  items = DEFAULT_ITEMS,
  type = 'accordion',
  defaultActive = 0,
  showStars = true,
  showBody = true,
  showLabels = true,
  showLink = true,
  theme,
  className = '',
  ...rest
}) {
  const [active, setActive] = useState(defaultActive);
  const trackRef = useRef(null);

  const header = (
    <div className="jl-pacc__header">
      <div className="jl-pacc__toprow">
        <span className="jl-pacc__eyebrow ts-body-4">{eyebrow}</span>
        {link && (
          <a className="jl-pacc__seeall" href={linkHref}>
            <span className="ts-body-3">{link}</span>
            <Icon name="CaretRight" size="M" />
          </a>
        )}
      </div>
      {title && <h2 className="jl-pacc__title ts-title-3">{title}</h2>}
    </div>
  );

  /* Contenido de una ficha (imagen 3:4 + detalle), compartido por acordeón y carrousel. */
  const cardInner = (it) => (
    <>
      {it.image && (
        <AspectRatio ratio="3:4" className="jl-pacc__media">
          <img src={it.image} alt={it.alt || ''} />
        </AspectRatio>
      )}
      <div className="jl-pacc__details">
        <div className="jl-pacc__group">
          <h3 className="jl-pacc__ptitle ts-title-3">{it.title}</h3>
          {showStars && it.stars > 0 && (
            <div className="jl-pacc__stars" aria-label={`${it.stars} de 3`}>
              {Array.from({ length: it.stars }).map((_, s) => (
                <Icon key={s} name="Star" size={18} />
              ))}
            </div>
          )}
          <div className="jl-pacc__bodywrap">
            {showBody && it.body && <p className="jl-pacc__body ts-body-3">{it.body}</p>}
            {showLabels && it.labels?.length > 0 && (
              <div className="jl-pacc__tags">
                {it.labels.map((l, k) => (
                  <Tag key={k} type="transaction" size="l">{l}</Tag>
                ))}
              </div>
            )}
          </div>
        </div>
        {showLink && it.cta && <ActionLink>{it.cta}</ActionLink>}
      </div>
    </>
  );

  /* ----------------------------- Variante Carrousel ----------------------------- */
  if (type === 'carrousel') {
    const step = (dir) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector('.jl-cacc-car__card');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
      const w = card ? card.offsetWidth : track.clientWidth * 0.8;
      track.scrollBy({ left: dir * (w + gap), behavior: 'smooth' });
    };
    return (
      <section className={`jl-pacc jl-cacc-car ${className}`.trim()} data-theme={theme || undefined} {...rest}>
        {header}
        <div className="jl-cacc-car__viewport" ref={trackRef}>
          {items.map((it, i) => (
            <article className="jl-pacc__open jl-cacc-car__card" key={it.title ?? i}>
              {cardInner(it)}
            </article>
          ))}
        </div>
        <div className="jl-cacc-car__arrows">
          <button type="button" className="jl-cacc-car__arrow" aria-label="Anterior" onClick={() => step(-1)}>
            <Icon name="ArrowLeft" size="L" />
          </button>
          <button type="button" className="jl-cacc-car__arrow" aria-label="Siguiente" onClick={() => step(1)}>
            <Icon name="ArrowRight" size="L" />
          </button>
        </div>
      </section>
    );
  }

  /* ----------------------------- Variante Accordion ----------------------------- */
  return (
    <section className={`jl-pacc ${className}`.trim()} data-theme={theme || undefined} {...rest}>
      {header}
      <div className="jl-pacc__row">
        {items.map((it, i) => {
          if (i === active) {
            return (
              <div className="jl-pacc__open" key={it.title ?? i}>
                {cardInner(it)}
              </div>
            );
          }
          return (
            <button
              type="button"
              className="jl-pacc__collapsed"
              key={it.title ?? i}
              aria-expanded="false"
              onClick={() => setActive(i)}
            >
              <span className="jl-pacc__vtitle ts-body-4">{it.title}</span>
              <span className="jl-pacc__num ts-body-4" aria-hidden="true">{i + 1}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
