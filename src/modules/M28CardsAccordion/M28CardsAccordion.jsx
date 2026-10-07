import { useCallback, useEffect, useRef, useState } from 'react';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import Button from '../../components/Button/Button';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import Icon from '../../components/Icon/Icon';
import Tag from '../../components/Tag/Tag';
import Title from '../../components/Title/Title';
import chef from '../../assets/images/m28-cards-accordion-2.webp';
import ham from '../../assets/images/m28-cards-accordion.webp';
import './M28CardsAccordion.css';

export const TYPES = ['Carrousel', 'Accordion'];
const TEXT = 'Lorem ipsum dolor sit amet consectetur. Nisl nisi tellus ut non. Blandit vitae fermentum morbi mi suscipit vitae turpis amet. Auctor nulla mi nisl. Caraterísticas.';
const CAROUSEL = Array.from({ length: 4 }, () => ({ title: 'Joselito Gran Reserva', image: chef, text: TEXT, tags: ['LABEL', 'LABEL', 'LABEL'], links: [{ text: 'DESCUBRIR', href: '#' }] }));
const ACCORDION = [
  { title: 'Joselito Gran Reserva', short: 'Gran Reserva', image: ham, address: 'Calle Velázquez, 30. Barrio de Salamanca\n28001 Madrid', phone: '+34 917 274 762',
    text: 'Los jamones Gran Reserva representan la pureza del sabor Joselito en su forma más armoniosa. Una añada donde la jugosidad, la suavidad y los aromas delicados se combinan en una experiencia gastronómica auténtica y accesible.',
    tags: ['LABEL', 'LABEL', 'LABEL'], links: [{ text: 'DESCUBRIR', href: '#' }, { text: 'DESCUBRIR', href: '#' }] },
  { title: 'Joselito Millésime', short: 'Millésime', image: ham, text: TEXT, tags: ['LABEL', 'LABEL'], links: [{ text: 'DESCUBRIR', href: '#' }] },
  { title: 'Joselito Vintage', short: 'Vintage', image: ham, text: TEXT, tags: ['LABEL', 'LABEL'], links: [{ text: 'DESCUBRIR', href: '#' }] },
];

function Stars({ count = 3 }) {
  return <span className="m28-card__stars" role="img" aria-label={`${count} estrellas`}>{Array.from({ length: count }, (_, i) => <Icon key={i} name="star" size="XS" />)}</span>;
}

/** Tarjeta desplegada: imagen 3:4 y, al lado, título, estrellas, dirección, texto, etiquetas y enlaces. */
function Card({ item, compact = false }) {
  const tel = item.phone && `tel:${item.phone.replace(/[^+\d]/g, '')}`;
  return (
    <article className="m28-card">
      <AspectRatio className="m28-card__img" size="3:4" src={item.image} alt={item.alt ?? ''} />
      <div className="m28-card__body">
        <div className="m28-card__texts">
          <h3 className="m28-card__title ts-title-03">{compact && item.short ? item.short : item.title}</h3>
          {item.stars !== 0 && <Stars count={item.stars ?? 3} />}
          {item.address && (
            <div className="m28-card__contact">
              <p className="m28-card__address ts-body-03">{item.address}</p>
              <div className="m28-card__contact-links">
                <ButtonActionLink size="M" text="VER MAPA" href={item.mapHref ?? '#'} />
                {item.phone && <ButtonActionLink size="M" text={item.phone} href={tel} />}
              </div>
              <div className="m28-card__contact-buttons">
                <Button type="Terciary" size="XS" text="LLÁMANOS" href={tel ?? '#'} />
                <Button type="Terciary" size="XS" text="VER EN MAPS" href={item.mapHref ?? '#'} />
              </div>
            </div>
          )}
          {item.text && <p className="m28-card__text ts-body-03">{item.text}</p>}
          {item.tags?.length > 0 && <ul className="m28-card__tags">{item.tags.map((t, i) => <li key={i}><Tag type="Aseptic" size="XS" text={t} /></li>)}</ul>}
        </div>
        {item.links?.length > 0 && (
          <div className="m28-card__links">{item.links.map((l, i) => <ButtonActionLink key={i} size="L" text={l.text} href={l.href} />)}</div>
        )}
      </div>
    </article>
  );
}

/**
 * Colección destacada con cabecera (Title con título). `Carrousel` (subtema oscuro): tarjetas de 8 columnas
 * centradas con las vecinas asomando y flechas. `Accordion` (claro): una tarjeta abierta y las demás
 * como pestañas verticales (filas en móvil) que se abren al pulsarlas.
 */
export default function M28CardsAccordion({
  type = 'Carrousel', eyebrow = 'Nuestra colección', title = 'Elige el jamón que mejor se adapte a tu celebración.', linkText = 'Ver todos', href = '#',
  items, defaultOpen = 0, theme, className = '', ...rest
}) {
  const accordion = type === 'Accordion';
  const list = items ?? (accordion ? ACCORDION : CAROUSEL);
  const [open, setOpen] = useState(defaultOpen);
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const update = useCallback(() => { const el = track.current; if (el) setEdges({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 }); }, []);
  useEffect(() => { update(); }, [update, list]);
  const move = (dir) => { const el = track.current; const card = el?.firstElementChild; if (el && card) el.scrollBy({ left: dir * (card.getBoundingClientRect().width + (parseFloat(getComputedStyle(el).columnGap) || 0)), behavior: 'smooth' }); };
  return (
    <section className={['m28-cards', `m28-cards--${type.toLowerCase()}`, className].filter(Boolean).join(' ')}
      data-theme={theme ?? (accordion ? 'light-white' : 'dark-black-neutral')} {...rest}>
      <Title className="m28-cards__title" eyebrow={eyebrow} title={title} showLink linkText={linkText} href={href} />
      {accordion ? (
        <ul className="m28-cards__accordion">
          {list.map((it, i) => (
            <li key={i} className={i === open ? 'is-open' : ''}>
              {i === open ? <Card item={it} compact /> : (
                <button type="button" className="m28-cards__tab" aria-expanded="false" onClick={() => setOpen(i)}>
                  <span className="m28-cards__tab-name ts-body-04">{it.short ?? it.title}</span>
                  <span className="m28-cards__tab-index ts-body-04" aria-hidden="true">{i + 1}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ul className="m28-cards__track" ref={track} onScroll={update} tabIndex={0} aria-label={eyebrow}>
            {list.map((it, i) => <li key={i}><Card item={it} /></li>)}
          </ul>
          <div className="m28-cards__arrows">
            <ButtonIcon type="Terciary" size="M" icon="arrow-left" label="Anterior" disabled={edges.start} onClick={() => move(-1)} />
            <ButtonIcon type="Terciary" size="M" icon="arrow-right" label="Siguiente" disabled={edges.end} onClick={() => move(1)} />
          </div>
        </>
      )}
    </section>
  );
}
