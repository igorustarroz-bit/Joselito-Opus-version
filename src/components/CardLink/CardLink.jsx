import AspectRatio from '../AspectRatio/AspectRatio';
import photo from '../../assets/images/card-link.webp';
import './CardLink.css';

/** Tarjeta enlace: foto 3:4 a sangre con el título (Title/02) y el precio (Body/02) superpuestos abajo. */
export default function CardLink({ image = photo, imageAlt = '', title = 'Jamón Gran Reserva', text = 'Desde 380€', href = '#', theme, className = '', ...rest }) {
  return (
    <a className={['card-link', className].filter(Boolean).join(' ')} href={href} data-theme={theme} {...rest}>
      <AspectRatio size="3:4" src={image} alt={imageAlt} />
      <span className="card-link__texts">
        <span className="card-link__title ts-title-02">{title}</span>
        <span className="ts-body-02">{text}</span>
      </span>
    </a>
  );
}
