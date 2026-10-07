import { Logo } from '../../components/BrandLogo/BrandLogo';
import M01Navigation from '../M01Navigation/M01Navigation';
import dish from '../../assets/images/m30-hero-joselito-lab.webp';
import tart from '../../assets/images/modal-lightbox.webp';
import chef from '../../assets/images/m30-hero-joselito-lab-3.webp';
import chef2 from '../../assets/images/m30-hero-joselito-lab-2.webp';
import './M30HeroJoselitoLab.css';

const TILES = [
  { image: dish, area: 'dish' }, { image: tart, area: 'tart' }, { image: chef, area: 'chef' }, { image: chef2, area: 'chef2' },
];

/**
 * Hero de Joselito Lab: retícula de cuadrados con líneas finas, fotos que ocupan algunas celdas y,
 * en el centro, el sello de la marca sobre un cuadrado rojo. Cabecera M01 (Grey) superpuesta.
 */
export default function M30HeroJoselitoLab({ tiles = TILES, showNavigation = true, homeHref = '/', title = 'Joselito Lab', theme = 'light-white', className = '', ...rest }) {
  return (
    <section className={['m30-lab', className].filter(Boolean).join(' ')} data-theme={theme} aria-label={title} {...rest}>
      <div className="m30-lab__grid" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => <span key={i} className="m30-lab__cell" />)}
        {tiles.map((t, i) => <img key={i} className={`m30-lab__tile m30-lab__tile--${t.area}`} src={t.image} alt="" loading="lazy" />)}
      </div>
      {showNavigation && <M01Navigation className="m30-lab__nav" mode="Grey" />}
      <a className="m30-lab__seal" href={homeHref} data-theme="dark-red-primary" aria-label={title}><Logo name="brand-logo-mark" title={title} /></a>
    </section>
  );
}
