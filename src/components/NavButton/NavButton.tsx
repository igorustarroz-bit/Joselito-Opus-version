import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import './nav-button.css';

export interface NavButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Estado seleccionado (item activo de navegación). */
  selected?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

/**
 * Nav-Button (UI01) — botón de navegación con estados default/hover/focus/
 * selected/disabled. Colores desde tokens Button/Nav (por tema).
 */
export function NavButton({ selected = false, iconLeft, iconRight, htmlType = 'button', disabled, className, children, ...props }: NavButtonProps) {
  return (
    <button
      type={htmlType}
      disabled={disabled}
      data-selected={selected || undefined}
      className={cn('navbtn type-cta-m', className)}
      {...props}
    >
      {iconLeft && <span className="navbtn__icon" aria-hidden>{iconLeft}</span>}
      {children}
      {iconRight && <span className="navbtn__icon" aria-hidden>{iconRight}</span>}
    </button>
  );
}

export default NavButton;
