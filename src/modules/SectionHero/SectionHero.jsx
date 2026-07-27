import './SectionHero.css';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';
import sectionHeroImg from '../../assets/images/section-hero.webp';

/**
 * Módulo Hero / Section hero — cabecera de sección a 100% de ancho.
 * Bloque de texto centrado (eyebrow Body/03 + título SangBleu Title/04) y una
 * imagen. Máster Figma 58508:35830 (6 variantes: Desktop/Mobile × Full bleed /
 * Margins / Small image).
 *
 * Variantes (prop `layout`):
 *  - `full-bleed`: imagen a sangre (ancho completo del viewport), sin borde.
 *     Ratio responsive 1:1 (mobile) → 16:9 (desktop). Texto arriba, imagen debajo.
 *  - `margins`: imagen dentro de los márgenes del wrapper + borde inferior.
 *     Ratio responsive 1:1 → 16:9. Texto arriba, imagen debajo.
 *  - `small-image`: imagen pequeña en proporción 3:4 (158px mobile / 180px desktop)
 *     ARRIBA, texto debajo + borde inferior. Reutiliza el foundation AspectRatio.
 *
 * El orden semántico del DOM es siempre título→imagen (imagen decorativa, alt="");
 * en `small-image` la imagen se coloca visualmente arriba con `order` en CSS.
 *
 * Notas de máster: gaps/paddings de 80/54px hardcodeados en el máster (valores
 * fijos). El gap del bloque de texto es 24px en mobile y 32px en desktop. La
 * variante `small-image` centra el contenido en un alto fijo (640px mobile / 786px
 * desktop). Los márgenes laterales usan el token `--grid-wrapper`.
 * Sin imagen: full-bleed/margins muestran un placeholder neutro (`--bg-neutral-2`);
 * en small-image el contenedor es transparente (la imagen suele ser un recorte PNG
 * que descansa sobre el fondo de la sección).
 */
export default function SectionHero({
  eyebrow = 'COLECCIONES JOSELITO',
  title = 'Selecciones exclusivas para los paladares más exigentes',
  layout = 'full-bleed',
  image = sectionHeroImg,
  alt = '',
  theme,
  className = '',
  ...rest
}) {
  const isSmall = layout === 'small-image';
  return (
    <section
      className={`jl-shero jl-shero--${layout} ${className}`.trim()}
      data-theme={theme || undefined}
      {...rest}
    >
      <div className="jl-shero__text">
        {eyebrow && <p className="jl-shero__eyebrow ts-body-3">{eyebrow}</p>}
        {title && <h2 className="jl-shero__title ts-title-4">{title}</h2>}
      </div>

      {isSmall ? (
        <div className="jl-shero__media jl-shero__media--small">
          <AspectRatio ratio="3:4" className="jl-shero__ar">
            {image ? <img src={image} alt={alt} /> : null}
          </AspectRatio>
        </div>
      ) : (
        <div className="jl-shero__media">
          {image ? <img src={image} alt={alt} /> : null}
        </div>
      )}
    </section>
  );
}
