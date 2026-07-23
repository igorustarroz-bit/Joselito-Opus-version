import './ContentImageOnly.css';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';
import imgA from '../../assets/images/content-image-a.webp';
import imgB from '../../assets/images/content-image-b.webp';

/**
 * Módulo Content / Image only — bloque multimedia a 100% de ancho.
 * Variantes (máster Figma 58163:40001):
 *  - `count=1`: una imagen a sangre con botón de reproducción opcional (`video`).
 *  - `count=2`: dos imágenes contiguas (una menor + una mayor).
 * Reutiliza AspectRatio.
 *
 * Nota: el máster define el fondo de la variante de 1 imagen como color de acento
 * (se usa `--bg-accent-base` como fondo/placeholder). Las proporciones se toman
 * del máster (16:9 en "start", 9:16 en "end").
 */
export default function ContentImageOnly({
  count = 1,
  ratio = '16:9',
  video = false,
  image = imgA,
  image2 = imgB,
  alt = '',
  className = '',
  ...rest
}) {
  if (count === 2) {
    return (
      <section className={`jl-imgonly jl-imgonly--double ${className}`} {...rest}>
        <AspectRatio ratio="3:4" className="jl-imgonly__media jl-imgonly__media--small">
          {image ? <img src={image} alt={alt} /> : null}
        </AspectRatio>
        <AspectRatio ratio="3:4" className="jl-imgonly__media jl-imgonly__media--large">
          {image2 ? <img src={image2} alt={alt} /> : null}
        </AspectRatio>
      </section>
    );
  }

  return (
    <section className={`jl-imgonly jl-imgonly--single ${className}`} {...rest}>
      <AspectRatio ratio={ratio} className="jl-imgonly__media">
        {image ? <img src={image} alt={alt} /> : null}
      </AspectRatio>
      {video && (
        <button type="button" className="jl-imgonly__play" aria-label="Reproducir vídeo">
          <span className="jl-imgonly__play-icon" aria-hidden="true" />
        </button>
      )}
    </section>
  );
}
