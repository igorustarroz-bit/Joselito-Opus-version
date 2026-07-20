import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import './button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'terciary';
export type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs';

const TYPE_CLASS: Record<ButtonSize, string> = {
  xl: 'type-cta-xl',
  l: 'type-cta-l',
  m: 'type-cta-m',
  s: 'type-cta-s',
  xs: 'type-cta-xs',
};

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Jerarquía visual del botón. */
  variant?: ButtonVariant;
  /** Tamaño (Figma → Layout/Button). */
  size?: ButtonSize;
  /** Estado seleccionado (persistente). */
  selected?: boolean;
  /** Icono a la izquierda del texto. */
  iconLeft?: ReactNode;
  /** Icono a la derecha del texto. */
  iconRight?: ReactNode;
  /** Tipo nativo del botón. */
  htmlType?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

/**
 * Botón (UI02). Variantes Primary/Secondary/Terciary, tamaños XS–XL y estados
 * (default, hover, focus, selected, disabled). Colores desde tokens por tema.
 */
export function Button({
  variant = 'primary',
  size = 'l',
  selected = false,
  iconLeft,
  iconRight,
  htmlType = 'button',
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={htmlType}
      disabled={disabled}
      data-selected={selected || undefined}
      className={cn('btn', `btn--${variant}`, `btn--${size}`, TYPE_CLASS[size], className)}
      {...props}
    >
      {iconLeft && <span className="btn__icon" aria-hidden>{iconLeft}</span>}
      {children}
      {iconRight && <span className="btn__icon" aria-hidden>{iconRight}</span>}
    </button>
  );
}

export default Button;
