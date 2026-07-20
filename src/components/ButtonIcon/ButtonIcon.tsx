import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import '../Button/button.css';
import './buttonicon.css';
import type { ButtonVariant, ButtonSize } from '../Button/Button';

export interface ButtonIconProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Icono (componente Icon). */
  icon: ReactNode;
  /** Etiqueta accesible obligatoria (solo icono). */
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  selected?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

/**
 * Button-Icon (UI03) — botón cuadrado con solo icono. Reutiliza los tokens de
 * color de Button (Primary/Secondary/Terciary) por estado y tema.
 */
export function ButtonIcon({ icon, label, variant = 'primary', size = 'l', selected = false, htmlType = 'button', disabled, className, ...props }: ButtonIconProps) {
  return (
    <button
      type={htmlType}
      disabled={disabled}
      aria-label={label}
      data-selected={selected || undefined}
      className={cn('btn', 'btn--' + variant, 'btnicon', 'btnicon--' + size, className)}
      {...props}
    >
      <span className="btn__icon" aria-hidden>{icon}</span>
    </button>
  );
}

export default ButtonIcon;
