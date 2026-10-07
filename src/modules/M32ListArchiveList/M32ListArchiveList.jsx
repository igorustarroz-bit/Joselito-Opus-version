import { useState } from 'react';
import Title from '../../components/Title/Title';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import BlockArchiveList from '../../components/BlockArchiveList/BlockArchiveList';
import violin from '../../assets/images/m32-list-archive-list-2.webp';
import artist from '../../assets/images/m32-list-archive-list.webp';
import './M32ListArchiveList.css';

const NAMES = ['Colección FSC', 'Fernando Bellver', 'Etsuro Sotoo', 'Colección Argollas', 'Pequeño Deseo', 'Ara Malikian',
  'Colección FSC', 'Rafael Monco', 'Andrés Sardá', 'Colección Argollas', 'Dom Pérignon'];
const DEFAULT_ITEMS = NAMES.map((title) => ({ label: 'Collection 2008', title, href: '#' }));
const DEFAULT_IMAGES = [{ src: violin, alt: '' }, { src: artist, alt: '' }];

/**
 * Archivo de colecciones pasadas. Escritorio: lista centrada de nombres grandes en gris que alterna la
 * etiqueta a izquierda y derecha; el elemento activo (hover/foco) pasa a negro y muestra sus dos fotos a los
 * lados. Móvil: lista apilada con separadores y sin fotos.
 */
export default function M32ListArchiveList({
  heading = 'Colecciones pasadas', items = DEFAULT_ITEMS, images = DEFAULT_IMAGES, initialActive = 5,
  theme, className = '', ...rest
}) {
  const [active, setActive] = useState(initialActive);
  const pics = (items[active] && items[active].images) || images;
  return (
    <section className={['m32-archive', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="m32-archive__inner">
        <Title className="m32-archive__heading" eyebrow={heading} showTitle={false} showLink={false} />
        {pics?.[0] && <AspectRatio className="m32-archive__pic m32-archive__pic--a" size="3:4" src={pics[0].src} alt={pics[0].alt ?? ''} />}
        {pics?.[1] && <AspectRatio className="m32-archive__pic m32-archive__pic--b" size="3:4" src={pics[1].src} alt={pics[1].alt ?? ''} />}
        <ul className="m32-archive__list">
          {items.map((it, i) => (
            <li key={i} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
              <BlockArchiveList type={i % 2 ? 'Right' : 'Left'} label={it.label} title={it.title} href={it.href} active={i === active} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
