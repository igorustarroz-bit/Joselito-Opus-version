import './PreviousNext.css';
import Icon from '../../components/Icon/Icon.jsx';

/**
 * Módulo Navigation/PreviousNext — navegación anterior/siguiente a 100% de ancho.
 * Cada lado: botón-icono + etiqueta (Body/03) y título (SangBleu Title/03).
 * Desktop en fila con separador; mobile apilado.
 */
export default function PreviousNext({
  prevLabel = 'Anterior',
  prevTitle = 'Ara Malikian',
  prevHref,
  nextLabel = 'Siguiente',
  nextTitle = 'Swarovski Edition',
  nextHref,
  onPrev,
  onNext,
  className = '',
  ...rest
}) {
  return (
    <nav className={`jl-prevnext ${className}`} aria-label="Anterior y siguiente" {...rest}>
      <a className="jl-prevnext__half jl-prevnext__half--prev" href={prevHref} onClick={onPrev} style={{ textDecoration: 'none' }}>
        <span className="jl-prevnext__btn"><Icon name="ArrowLeft" size="M" /></span>
        <span className="jl-prevnext__text">
          <span className="jl-prevnext__label ts-body-3">{prevLabel}</span>
          <span className="jl-prevnext__title ts-title-3">{prevTitle}</span>
        </span>
      </a>
      <a className="jl-prevnext__half jl-prevnext__half--next" href={nextHref} onClick={onNext} style={{ textDecoration: 'none' }}>
        <span className="jl-prevnext__text">
          <span className="jl-prevnext__label ts-body-3">{nextLabel}</span>
          <span className="jl-prevnext__title ts-title-3">{nextTitle}</span>
        </span>
        <span className="jl-prevnext__btn"><Icon name="ArrowRight" size="M" /></span>
      </a>
    </nav>
  );
}
