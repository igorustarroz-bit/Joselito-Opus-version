import './SectionHero.css';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';

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
 * Notas de máster: los gaps y paddings de 80px/54px están hardcodeados en el
 * máster (no ligados a variables Responsive), así que se replican como valores
 * fijos. Los márgenes laterales sí usan el token `--grid-wrapper`.
 * Sin imagen, el área multimedia muestra un placeholder (`--bg-accent-base`).
 */
export default function SectionHero({
  eyebrow = 'COLECCIONES JOSELITO',
  title = 'Selecciones exclusivas para los paladares más exigentes',
  layout = 'full-bleed',
  image,
  alt = '',
  className = '',
  ...rest
}) {
  const isSmall = layout === 'small-image';
  return (
    <section className={`jl-shero jl-shero--${layout} ${className}`.trim()} {...rest}>
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
