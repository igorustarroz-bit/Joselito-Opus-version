import Icon from '../../components/Icon/Icon';
import Toast from '../../components/Toast/Toast';
import M01Navigation from '../M01Navigation/M01Navigation';
import sunsetPoster from '../../assets/images/video-dehesa-atardecer.webp';
import './M13HeroHomepagehero.css';

/**
 * Hero de portada a pantalla completa sobre vídeo o imagen (subtema oscuro): cabecera M01 (Dark)
 * superpuesta, etiqueta, gran titular, flecha para bajar y, opcionalmente, un Toast destacado.
 * Con Toast el titular va centrado; sin él, al pie.
 */
export default function M13HeroHomepagehero({
  label = 'LUJO DEL TIEMPO', title = 'Nada excepcional ocurre deprisa', showToast = true, toast = {}, media = { type: 'image', src: sunsetPoster },
  showNavigation = true, scrollTarget, onScroll, theme = 'dark-black-neutral', className = '', ...rest
}) {
  const scroll = () => {
    if (onScroll) return onScroll();
    const el = scrollTarget && document.querySelector(scrollTarget);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className={['m13-hero', showToast ? 'has-toast' : '', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="m13-hero__media" aria-hidden="true">
        {media?.type === 'video' && <video src={media.src} poster={media.poster} autoPlay muted loop playsInline />}
        {media?.type === 'image' && <img src={media.src} alt="" />}
      </div>
      <div className="m13-hero__shade" aria-hidden="true" />
      {showNavigation && <M01Navigation className="m13-hero__nav" mode="Dark" />}
      <div className="m13-hero__content">
        <div className="m13-hero__texts">
          <p className="m13-hero__label ts-body-03">{label}</p>
          <h1 className="m13-hero__title ts-title-05">{title}</h1>
        </div>
        <button type="button" className="m13-hero__down" aria-label="Bajar al contenido" onClick={scroll}><Icon name="arrow-down" size="L" /></button>
      </div>
      {showToast && <div className="m13-hero__toast"><Toast theme="light-white" {...toast} /></div>}
    </section>
  );
}
