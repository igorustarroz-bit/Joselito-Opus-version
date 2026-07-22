import './Form.css';
import Button from '../Button/Button.jsx';

/**
 * UI11-Form — contenedor de formulario. Cabecera opcional (título SangBleu +
 * descripción), los campos (children) y una fila de acciones (Cancel/Accept).
 */
export default function Form({
  title,
  description,
  children,
  primaryLabel = 'Aceptar',
  secondaryLabel = 'Cancelar',
  showActions = true,
  onSubmit,
  onCancel,
  className = '',
  ...rest
}) {
  return (
    <form
      className={`jl-form ${className}`}
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(e); }}
      {...rest}
    >
      {(title || description) && (
        <div className="jl-form__header">
          {title && <p className="jl-form__title ts-title-1">{title}</p>}
          {description && <p className="jl-form__desc ts-body-3">{description}</p>}
        </div>
      )}
      <div className="jl-form__fields">{children}</div>
      {showActions && (
        <div className="jl-form__actions">
          {secondaryLabel && <Button type="terciary" size="s" onClick={onCancel}>{secondaryLabel}</Button>}
          <Button type="primary" size="s" onClick={onSubmit}>{primaryLabel}</Button>
        </div>
      )}
    </form>
  );
}
