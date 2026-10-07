import ButtonIcon from '../ButtonIcon/ButtonIcon';
import './GoBack.css';

/**
 * Volver atrás: Button-Icon Terciary con flecha a la izquierda + texto de la sección anterior (Body/02).
 * Escritorio: botón S y separación FX-6; móvil (<768 px): botón XS y separación FX-5.
 */
export default function GoBack({ text = 'TIENDAS Y RESTAURANTES', href = '#', label = 'Volver', onClick, theme, className = '', ...rest }) {
  return (
    <div className={['go-back', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <ButtonIcon type="Terciary" size="S" icon="arrow-left" label={`${label}: ${text}`} href={href} onClick={onClick} />
      <span className="go-back__text ts-body-02">{text}</span>
    </div>
  );
}
