import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import './input.css';

export type InputSize = 'm' | 'l';
export type InputState = 'default' | 'error' | 'validated' | 'disabled';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Etiqueta superior (label-out). */
  label?: ReactNode;
  /** Mensaje de ayuda/error bajo el campo. */
  message?: ReactNode;
  size?: InputSize;
  state?: InputState;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

/**
 * Input (UI06) — campo de texto con label, mensaje, iconos y estados
 * (default/error/validated/disabled), tamaños M y L. Colores desde tokens Forms.
 */
export function Input({ label, message, size = 'm', state = 'default', iconLeft, iconRight, id, className, disabled, ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const msgId = inputId + '-msg';
  const effState: InputState = disabled ? 'disabled' : state;
  return (
    <div className={cn('field', size === 'l' && 'field--l', className)} data-state={effState}>
      {label && <label htmlFor={inputId} className="field__label type-input-m-label-out">{label}</label>}
      <div className="field__control">
        {iconLeft && <span className="field__icon" aria-hidden>{iconLeft}</span>}
        <input
          id={inputId}
          disabled={effState === 'disabled'}
          aria-invalid={effState === 'error' || undefined}
          aria-describedby={message ? msgId : undefined}
          className={cn('field__input', size === 'l' ? 'type-input-m-text' : 'type-input-s-text')}
          {...props}
        />
        {iconRight && <span className="field__icon" aria-hidden>{iconRight}</span>}
      </div>
      {message && <span id={msgId} className="field__message type-input-m-message">{message}</span>}
    </div>
  );
}

export default Input;
