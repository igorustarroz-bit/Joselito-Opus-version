import './SectionBanner.css';
import Title from '../../components/Title/Title.jsx';
import Button from '../../components/Button/Button.jsx';
import bannerImg from '../../assets/images/banner-section.webp';

/**
 * Módulo Banners / Section banner — máster Figma `58182:4380`
 * (Desktop `58182:4378` / Mobile `58182:4379`).
 *
 * Cabecera de sección (componente `Title`: antetítulo Body/04 + enlace "Ver todos")
 * seguida de un banner destacado: una imagen a sangre con una tarjeta blanca
 * superpuesta (título SangBleu `Title/02` + cuerpo `Body/03` + botón terciary).
 *
 * - **Desktop (≥768px):** banner de 720px de alto; imagen de fondo con velo oscuro
 *   y tarjeta flotante a la derecha (372px, padding 32, contenido repartido
 *   arriba/abajo).
 * - **Mobile:** apilado — imagen 4:3, después título + cuerpo + botón (sin tarjeta).
 *
 * Reutiliza `Title`, `Button` (UI02). Hereda el subtema del contenedor; prop
 * opcional `theme` para fijarlo en producción.
 *
 * Nota de máster: alto del banner (720px), ancho de la tarjeta (372px), paddings
 * (40 del banner, 32 de la tarjeta) y velo `rgba(0,0,0,0.2)` van literales en el
 * máster (no ligados a variable). Márgenes laterales vía `--grid-wrapper`.
 */
const DEFAULT_BODY =
  "Joselito's te ofrece la esencia y todo el sabor del Jamón Joselito de la mano de un auténtico maestro cortador para convertir tu celebración en una experiencia inolvidable.";

export default function SectionBanner({
  eyebrow = 'Experiencias y eventos',
  linkText = 'Ver todos',
  href,
  onLinkClick,
  title = 'Eventos Privados\ny Bodas',
  body = DEFAULT_BODY,
  ctaText = 'SABER MÁS',
  onCtaClick,
  image = bannerImg,
  alt = '',
  theme,
  className = '',
  ...rest
}) {
  return (
    <section
      className={`jl-section-banner ${className}`.trim()}
      data-theme={theme}
      {...rest}
    >
      {eyebrow && (
        <div className="jl-section-banner__head">
          <Title
            showLink={!!linkText}
            linkText={linkText}
            href={href}
            onLinkClick={onLinkClick}
          >
            {eyebrow}
          </Title>
        </div>
      )}

      <div className="jl-section-banner__banner">
        <div className="jl-section-banner__media" aria-hidden="true">
          {image ? <img src={image} alt={alt} /> : null}
          <span className="jl-section-banner__overlay" />
        </div>

        <div className="jl-section-banner__card">
          <div className="jl-section-banner__text">
            <h3 className="jl-section-banner__title ts-title-2">{title}</h3>
            <p className="jl-section-banner__body ts-body-3">{body}</p>
          </div>
          {ctaText && (
            <Button
              type="terciary"
              size="m"
              className="jl-section-banner__cta"
              onClick={onCtaClick}
            >
              {ctaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
