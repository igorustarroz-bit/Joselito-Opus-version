import { useRef, useState } from 'react';
import AddToList from '../../components/AddToList/AddToList';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import Button from '../../components/Button/Button';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import GoBack from '../../components/GoBack/GoBack';
import StepperForToast from '../../components/StepperForToast/StepperForToast';
import Tag from '../../components/Tag/Tag';
import M01Navigation from '../M01Navigation/M01Navigation';
import ham from '../../assets/images/m17-banners-sectionbanner.webp';
import ham2 from '../../assets/images/m16-hero-productdetail.webp';
import ham3 from '../../assets/images/m16-hero-productdetail-2.webp';
import tart from '../../assets/images/modal-lightbox.webp';
import './M16HeroProductdetail.css';

export const TYPES = ['Producto', 'Receta'];
const TAGS = ['SIN GLUTEN', 'SIN LACTOSA', '100% NATURAL'];
const PRESETS = {
  Producto: {
    back: 'PRODUCTOS', title: 'Jamón\nMillésime 2020', text: 'El Jamón Joselito Gran Reserva presenta un fino veteado de grasa que le da un bello aspecto marmóreo y le proporciona gran jugosidad.',
    images: [ham2, ham, ham3], current: 1, buttons: [{ text: 'ELIGE – 599,00 €' }],
    cols: [{ label: 'Curación', value: '72 meses' }, { label: 'Peso', value: '8,20 kg' }, { label: 'Precio/Kg', value: '92€' }, { label: 'Origen', value: 'Guijuelo' }],
    notes: ['Recíbelo entre 1 y 2 días laborables', 'Embalaje de regalo sin coste', 'Devolución garantizada 24h'],
  },
  Receta: {
    back: 'RECETAS', title: 'Tarta de manzana Joselito y helado de mantecado', images: [tart, tart, tart], current: 0,
    buttons: [{ text: 'VER VÍDEO' }, { text: 'IMPRIMIR RECETA' }, { text: 'COMPARTIR' }], author: { name: 'Nou Manolín', href: '#' },
  },
};

/**
 * Cabecera de ficha (producto o receta). Escritorio: galería a media pantalla con miniaturas y, a la
 * derecha, volver, título, texto, etiquetas, datos (hasta 4 columnas), botones y lista de deseos.
 * Móvil: título y datos arriba, galería deslizable con indicador y el resto debajo.
 */
export default function M16HeroProductdetail({ type = 'Producto', showCol2 = true, showCol3 = true, showCol4 = true, tags = TAGS,
  showNavigation = true, backHref = '#', onBack, theme = 'light-white', className = '', ...overrides }) {
  const p = { ...PRESETS[type] ?? PRESETS.Producto, ...Object.fromEntries(Object.entries(overrides).filter(([, v]) => v !== undefined)) };
  const { back, title, text, images, current: start = 0, buttons, cols, notes, author, ...rest } = p;
  const [current, setCurrent] = useState(start);
  const track = useRef(null);
  const visibleCols = (cols ?? []).filter((_, i) => [true, showCol2, showCol3, showCol4][i]);
  const onScroll = () => { const el = track.current; if (el) setCurrent(Math.round(el.scrollLeft / el.clientWidth)); };
  const isProduct = type === 'Producto';
  return (
    <section className={['m16-detail', `m16-detail--${type.toLowerCase()}`, className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {showNavigation && <M01Navigation className="m16-detail__nav" mode="Grey" />}
      <div className="m16-detail__gallery">
        <AspectRatio className="m16-detail__main" size="Fill" src={images[current]} alt="" />
        <ul className="m16-detail__thumbs">
          {images.map((src, i) => (
            <li key={i}>
              <button type="button" className={i === current ? 'is-active' : ''} aria-label={`Ver imagen ${i + 1}`} aria-pressed={i === current} onClick={() => setCurrent(i)}>
                <AspectRatio size="3:4" src={src} alt="" />
              </button>
            </li>
          ))}
        </ul>
        <div className="m16-detail__track" ref={track} onScroll={onScroll}>
          {images.map((src, i) => <AspectRatio key={i} className="m16-detail__slide" size="Fill" src={src} alt="" />)}
        </div>
        <StepperForToast className="m16-detail__stepper" progress={(current + 1) / images.length} />
      </div>
      <div className="m16-detail__info">
      <div className="m16-detail__head">
        <GoBack text={back} href={backHref} onClick={onBack} />
        <h1 className="m16-detail__title ts-title-04">{title}</h1>
        {visibleCols.length > 0 && (
          <dl className="m16-detail__cols">
            {visibleCols.map((c) => <div key={c.label}><dt className="ts-body-03">{c.label}</dt><dd className="ts-body-03">{c.value}</dd></div>)}
          </dl>
        )}
      </div>
      <div className="m16-detail__body">
        {text && <p className="m16-detail__text ts-body-03">{text}</p>}
        {tags?.length > 0 && <ul className="m16-detail__tags">{tags.map((t) => <li key={t}><Tag type="Aseptic" size="XS" text={t} /></li>)}</ul>}
        <div className="m16-detail__actions">
          <div className="m16-detail__buttons">
            {buttons.map((b, i) => <Button key={i} type={i === 0 ? 'Primary' : 'Secondary'} size="M" text={b.text} href={b.href} onClick={b.onClick} />)}
          </div>
          {isProduct && <AddToList />}
        </div>
        {notes?.length > 0 && <ul className="m16-detail__notes">{notes.map((n) => <li key={n} className="ts-labels-01">{n}</li>)}</ul>}
        {author && (
          <p className="m16-detail__author"><span className="ts-labels-01">BY</span> <ButtonActionLink size="M" text={author.name.toUpperCase()} href={author.href} /></p>
        )}
      </div>
      </div>
    </section>
  );
}
