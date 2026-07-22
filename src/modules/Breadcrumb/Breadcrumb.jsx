import './Breadcrumb.css';
import Icon from '../../components/Icon/Icon.jsx';

/**
 * Módulo Navigation/Breadcrumb — enlace "volver" a 100% de ancho.
 * Flecha izquierda + etiqueta (Body/03). Responsive: alto 60 (mobile) / 80 (desktop).
 */
export default function Breadcrumb({ label = 'Jamones Gran Reserva', href, onClick, className = '', ...rest }) {
  const Tag = href ? 'a' : 'button';
  const tagProps = href ? { href } : { type: 'button', onClick };
  return (
    <nav className={`jl-breadcrumb ${className}`} aria-label="Migas de pan" {...rest}>
      <Tag className="jl-breadcrumb__link" {...tagProps}>
        <span className="jl-breadcrumb__icon"><Icon name="ArrowLeft" size="M" /></span>
        <span className="jl-breadcrumb__label ts-body-3">{label}</span>
      </Tag>
    </nav>
  );
}
