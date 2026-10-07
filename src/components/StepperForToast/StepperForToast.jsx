import './StepperForToast.css';

export const STATUSES = ['Not selected', 'In progress', 'Completed'];

/**
 * Indicador vertical de progreso del Toast (una barra por paso). `In progress` rellena parte de la
 * barra (por defecto 15/24, como en Figma; ajustable con `progress` de 0 a 1 para animarlo).
 */
export default function StepperForToast({ status = 'In progress', progress, className = '', ...rest }) {
  const value = status === 'Completed' ? 1 : status === 'Not selected' ? 0 : (progress ?? 15 / 24);
  return (
    <span className={['stepper-toast', className].filter(Boolean).join(' ')} role="progressbar" aria-valuemin={0} aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)} {...rest}>
      <span className="stepper-toast__fill" style={{ '--st-progress': value }} />
    </span>
  );
}
