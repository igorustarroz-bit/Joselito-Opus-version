import AspectRatio from '../AspectRatio/AspectRatio';
import StepperForToast from '../StepperForToast/StepperForToast';
import photo from '../../assets/images/toast.webp';
import './Toast.css';

/**
 * Aviso flotante con foto (1:1, 80 px), título, texto y un indicador de pasos vertical a la derecha
 * (Stepper_for_toast). `steps` = número de avisos y `current` = el que se muestra.
 */
export default function Toast({ image = photo, imageAlt = '', title = 'Jaime Hayon x Joselito', text = 'Descubre la nueva colección Joselito Premium',
  href, steps = 3, current = 0, theme, className = '', ...rest }) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag className={['toast', className].filter(Boolean).join(' ')} href={href} role="status" data-theme={theme} {...rest}>
      <AspectRatio className="toast__img" size="1:1" src={image} alt={imageAlt} />
      <span className="toast__texts">
        <span className="toast__title ts-body-02">{title}</span>
        <span className="toast__text ts-body-02">{text}</span>
      </span>
      {steps > 1 && (
        <span className="toast__steps" aria-label={`Aviso ${current + 1} de ${steps}`}>
          {Array.from({ length: steps }, (_, i) => <StepperForToast key={i} status={i < current ? 'Completed' : i === current ? 'In progress' : 'Not selected'} aria-hidden="true" />)}
        </span>
      )}
    </Tag>
  );
}
