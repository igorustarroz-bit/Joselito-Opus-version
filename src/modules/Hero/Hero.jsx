import './Hero.css';
import Navigation from '../Navigation/Navigation.jsx';
import Button from '../../components/Button/Button.jsx';
import Toast from '../Toast/Toast.jsx';
import heroBg from '../../assets/images/feature-portrait.webp';
import toastImg from '../../assets/images/generic-filler.webp';

/**
 * Módulo Hero / Homepage hero — contenedor a 100% de ancho y alto grande.
 * Imagen a sangre + Navigation (subtema oscuro, transparente) + bloque central
 * (eyebrow + título SangBleu + botón) + Toast flotante. Desktop: Toast abajo a la
 * derecha. Mobile: degradado inferior, Toast + puntos de paginación centrados.
 * El bloque de copy usa `data-theme="dark-black-neutral"` (texto blanco por
 * tokens); el Toast queda fuera del subtema (tarjeta clara). Reutiliza
 * Navigation, Button y Toast. Máster Figma 58182:4353.
 */
export default function Hero({
  eyebrow = 'DICTUM CRAS ERAT',
  title = 'Lorem ipsum dolor sit amet consectetur',
  cta = 'LOREM IPSUM',
  image = heroBg,
  toast = {
    title: 'Jaime Hayon x Joselito',
    text: 'Descubre la nueva colección Joselito Premium',
    image: toastImg,
  },
  dots = 3,
  activeDot = 0,
  navLinks,
  cartCount = 3,
  className = '',
  ...rest
}) {
  return (
    <section className={`jl-hero ${className}`} {...rest}>
      <div className="jl-hero__bg">{image ? <img src={image} alt="" /> : null}</div>
      <div className="jl-hero__overlay" aria-hidden="true" />

      <Navigation
        mode="dark"
        className="jl-hero__nav"
        {...(navLinks ? { links: navLinks } : {})}
        cartCount={cartCount}
      />

      <div className="jl-hero__content" data-theme="dark-black-neutral">
        {eyebrow && <p className="jl-hero__eyebrow ts-body-2">{eyebrow}</p>}
        <h1 className="jl-hero__title ts-title-5">{title}</h1>
        {cta && <Button type="primary" size="m">{cta}</Button>}
      </div>

      <div className="jl-hero__foot">
        {toast && (
          <Toast
            title={toast.title}
            text={toast.text}
            image={toast.image}
            className="jl-hero__toast"
          />
        )}
        {dots > 0 && (
          <div className="jl-hero__dots" role="tablist" aria-label="Diapositivas">
            {Array.from({ length: dots }).map((_, i) => (
              <span
                key={i}
                className={`jl-hero__dot${i === activeDot ? ' jl-hero__dot--active' : ''}`}
                role="tab"
                aria-selected={i === activeDot}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
