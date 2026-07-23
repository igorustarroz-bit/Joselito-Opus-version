import './Toast.css';
import AspectRatio from '../../components/AspectRatio/AspectRatio.jsx';
import toastImg from '../../assets/images/generic-filler.webp';

/**
 * Módulo Toast — aviso compacto: imagen cuadrada (76px) + título (Body/02) y
 * descripción (Body/02, neutral-2). Elevación ligera para flotar sobre el contenido.
 */
export default function Toast({ title = 'Jaime Hayon x Joselito', text = 'Descubre la nueva colección Joselito Premium', image = toastImg, className = '', ...rest }) {
  return (
    <div className={`jl-toast ${className}`} role="status" {...rest}>
      <div className="jl-toast__media">
        <AspectRatio ratio="1:1">
          {image ? <img className="jl-toast__img" src={image} alt="" /> : <div className="jl-toast__ph" />}
        </AspectRatio>
      </div>
      <div className="jl-toast__text">
        <p className="jl-toast__title ts-body-2">{title}</p>
        <p className="jl-toast__desc ts-body-2">{text}</p>
      </div>
    </div>
  );
}
