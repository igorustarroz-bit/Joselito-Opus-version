import AspectRatio from '../AspectRatio/AspectRatio';
import img404 from '../../assets/images/404-picture-2.webp';
import img500 from '../../assets/images/404-picture.webp';
import './ErrorPicture.css';

export const TYPES = ['404', '500', '300'];
// Composición de Figma (Desktop): dígito · foto · dígito; la foto se superpone a los dígitos.
const DIGITS = { 404: ['4', '4'], 500: ['5', '0'], 300: ['3', '0'] };

/**
 * Ilustración de página de error: el código en cifras gigantes (familia de Title/08) con una foto
 * superpuesta en el centro (2:3; 1:1 en el 500). Escala con su contenedor (container query units).
 */
export default function ErrorPicture({ type = '404', image, imageAlt = '', theme, className = '', ...rest }) {
  const [a, b] = DIGITS[type] || DIGITS[404];
  const square = type === '500';
  return (
    <div className={['error-picture', square ? 'error-picture--square' : '', className].filter(Boolean).join(' ')} role="img" aria-label={`Error ${type}`} data-theme={theme} {...rest}>
      <span className="error-picture__digit error-picture__digit--a ts-title-08" aria-hidden="true">{a}</span>
      <span className="error-picture__digit error-picture__digit--b ts-title-08" aria-hidden="true">{b}</span>
      <AspectRatio className="error-picture__img" size={square ? '1:1' : '2:3'} src={image ?? (square ? img500 : img404)} alt={imageAlt} />
    </div>
  );
}
