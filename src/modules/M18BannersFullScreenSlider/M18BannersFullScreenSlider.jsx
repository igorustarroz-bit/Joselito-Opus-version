import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import AspectRatio from '../../components/AspectRatio/AspectRatio';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import Tag from '../../components/Tag/Tag';
import Title from '../../components/Title/Title';
import redWide from '../../assets/images/m17-banners-sectionbanner.webp';
import redTall from '../../assets/images/m18-banners-full-screen-slider-foto-1-3.webp';
import greenWide from '../../assets/images/m18-banners-full-screen-slider-foto-2.webp';
import greenTall from '../../assets/images/m18-banners-full-screen-slider-foto-2-4.webp';
import gen1948 from '../../assets/images/m18-banners-full-screen-slider-foto-1.webp';
import gen1965 from '../../assets/images/m18-banners-full-screen-slider-foto-2-3.webp';
import vintage2021 from '../../assets/images/m18-banners-full-screen-slider-foto-1-2.webp';
import vintage2022 from '../../assets/images/m18-banners-full-screen-slider-foto-2-2.webp';
import leaf from '../../assets/images/m18-banners-full-screen-slider.webp';
import './M18BannersFullScreenSlider.css';

export const KINDS = ['Producto', 'Origen', 'Añadas', 'Perfil Sensorial'];
const TXT1 = 'Massa placerat pretium risus sagittis habitant cras. A odio tristique cursus rutrum placerat odio sit morbi habitasse. Enim.';
const TXT2 = 'Lorem ipsum dolor sit amet consectetur. Neque pretium a ipsum venenatis dignissim quam lectus risus sagittis habitant ultrices volutpat.';
const SENSE = 'Avellana tostada, casi nuez.\nEl animal que comió encinas durante años. Aroma a bodega, a tiempo, a algo que ha esperado seis años.';

/** Contenido de ejemplo de cada Type de Figma (las variantes 1 y 2 son dos pasos del mismo slider). */
export const PRESETS = {
  Producto: { label: 'JAMÓN JOSELITO', start: 1, slides: [
    { word: 'Reserva', image: redWide, imageMobile: redTall, tags: ['+5 AÑOS', 'INTENSIDAD'], link: { text: 'DESCUBRIR', href: '#' } },
    { word: 'Millésime', image: redWide, imageMobile: redTall, tags: ['4-6 AÑOS', 'EQUILIBRIO', 'DULZURA'], link: { text: 'DESCUBRIR', href: '#' } },
    { word: 'Vintage', image: greenWide, imageMobile: greenTall, tags: ['+7 AÑOS', 'PROFUNDIDAD', 'LIMITADO'], link: { text: 'DESCUBRIR', href: '#' } },
  ] },
  Origen: { label: 'GENERACIÓN', start: 2, slides: [
    { word: '1820', label: 'GENERACIÓN I' }, { word: '1868', label: 'GENERACIÓN II' },
    { word: '1948', label: 'GENERACIÓN III', image: gen1948, text: TXT1 },
    { word: '1965', label: 'GENERACIÓN IV', image: gen1965, text: TXT2 },
    { word: '1989', label: 'GENERACIÓN V' },
  ] },
  Añadas: { label: 'AÑADA', start: 2, slides: [
    { word: '2019' }, { word: '2020' },
    { word: '2021', image: vintage2021, text: TXT1, tags: ['EQUILIBRIO', 'DULZURA'] },
    { word: '2022', image: vintage2022, text: TXT2, tags: ['PROFUNDIDAD', 'BELLOTA'] },
    { word: '2023' },
  ] },
  'Perfil Sensorial': { title: 'Perfil sensorial', start: 2, slides: [
    { word: 'Sabor', text: SENSE }, { word: 'Aspecto', text: SENSE }, { word: 'Aroma', text: SENSE },
    { word: 'Textura', text: SENSE },
  ] },
};

/**
 * Slider a pantalla completa con una palabra o fecha gigante por diapositiva: la actual en el centro y
 * las vecinas atenuadas (se pueden pulsar), imagen de fondo con velo, y debajo texto, etiquetas y enlace.
 * `Perfil Sensorial` es la versión clara: imagen pequeña centrada, palabras en gris y contador.
 * Flechas del teclado y gesto de deslizar cambian de diapositiva.
 */
export default function M18BannersFullScreenSlider({ kind = 'Producto', slides, label, title, start, index, onChange, theme, className = '', ...rest }) {
  const preset = PRESETS[kind] ?? PRESETS.Producto;
  const list = slides ?? preset.slides;
  const sensorial = kind === 'Perfil Sensorial';
  const [inner, setInner] = useState(start ?? preset.start ?? 0);
  const current = Math.min(Math.max(index ?? inner, 0), list.length - 1);
  const go = useCallback((i) => { const n = Math.min(Math.max(i, 0), list.length - 1); if (index === undefined) setInner(n); onChange?.(n); }, [index, list.length, onChange]);
  const track = useRef(null);
  const wrap = useRef(null);
  const [offset, setOffset] = useState(0);
  const measure = useCallback(() => {
    const el = track.current?.children[current]; const box = wrap.current;
    if (el && box) setOffset(box.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2));
  }, [current]);
  useLayoutEffect(measure, [measure, list]);
  useEffect(() => { window.addEventListener('resize', measure); document.fonts?.ready.then(measure); return () => window.removeEventListener('resize', measure); }, [measure]);
  const touch = useRef(null);
  const slide = list[current] ?? {};
  const bg = slide.image ?? list.slice(0, current).reverse().find((s) => s.image)?.image;
  const bgMobile = slide.imageMobile ?? slide.image ?? bg;
  return (
    <section className={['m18-slider', sensorial ? 'm18-slider--sensorial' : '', className].filter(Boolean).join(' ')}
      data-theme={theme ?? (sensorial ? 'light-grey' : 'dark-black-neutral')} aria-roledescription="carrusel" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'ArrowRight') go(current + 1); if (e.key === 'ArrowLeft') go(current - 1); }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - (touch.current ?? 0); if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1)); }}
      {...rest}>
      {!sensorial && (
        <div className="m18-slider__bg" aria-hidden="true">
          {list.map((s, i) => s.image && (
            <picture key={i} className={i === current || (!slide.image && s.image === bg) ? 'is-active' : ''}>
              {s.imageMobile && <source media="(max-width: 1023px)" srcSet={s.imageMobile} />}
              <img src={s.image} alt="" />
            </picture>
          ))}
          <span className="m18-slider__shade" />
        </div>
      )}
      {sensorial && <Title className="m18-slider__heading" eyebrow={title ?? preset.title} showTitle={false} showLink={false} />}
      {sensorial && <AspectRatio className="m18-slider__picture" size="3:4" src={slide.image ?? leaf} alt="" />}
      {!sensorial && <p className="m18-slider__label ts-body-03">{slide.label ?? label ?? preset.label}</p>}
      <div className="m18-slider__words" ref={wrap}>
        <ol className={`m18-slider__track ${sensorial ? 'ts-title-07' : 'ts-title-08'}`} ref={track} style={{ transform: `translateX(${offset}px)` }}>
          {list.map((s, i) => (
            <li key={i} className={i === current ? 'is-current' : ''}>
              {i === current ? <h2 className="m18-slider__word" aria-live="polite">{s.word}</h2>
                : <button type="button" className="m18-slider__word" onClick={() => go(i)} aria-label={`Ir a ${s.word}`}>{s.word}</button>}
            </li>
          ))}
        </ol>
      </div>
      <div className="m18-slider__content">
        {slide.text && <p className="m18-slider__text ts-body-03">{slide.text}</p>}
        {slide.tags?.length > 0 && <ul className="m18-slider__tags">{slide.tags.map((t) => <li key={t}><Tag type="Aseptic" size="XS" text={t} /></li>)}</ul>}
        {slide.link && <ButtonActionLink size="L" text={slide.link.text} href={slide.link.href} />}
        {sensorial && <p className="m18-slider__count ts-body-03">{current + 1} - {list.length}</p>}
      </div>
    </section>
  );
}
