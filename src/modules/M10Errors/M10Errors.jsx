import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import ErrorPicture, { TYPES } from '../../components/ErrorPicture/ErrorPicture';
import './M10Errors.css';

export { TYPES };

/**
 * Página de error a pantalla completa (subtema oscuro): ilustración 404_picture centrada y, abajo,
 * título, descripción y enlace para volver al inicio.
 */
export default function M10Errors({
  type = '404', title = 'Esta página no está aquí.', description = 'Es posible que haya sido movida o que la dirección no sea correcta.',
  linkText = 'VOLVER A INICIO', href = '/', theme = 'dark-black-neutral', className = '', ...rest
}) {
  return (
    <section className={['m10-errors', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="m10-errors__picture"><ErrorPicture type={type} /></div>
      <div className="m10-errors__content">
        <div className="m10-errors__texts">
          <h1 className="m10-errors__title ts-labels-02">{title}</h1>
          <p className="m10-errors__desc ts-body-03">{description}</p>
        </div>
        <ButtonActionLink size="L" text={linkText} href={href} />
      </div>
    </section>
  );
}
