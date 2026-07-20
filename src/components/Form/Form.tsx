import type { FormHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

/** Form (UI11) — contenedor de formulario con espaciado vertical entre filas. */
export function Form({ className, children, ...props }: FormProps) {
  return (
    <form className={cn('flex flex-col gap-fx-6', className)} {...props}>
      {children}
    </form>
  );
}

export type FormRowColumns = 1 | 2 | 3;
const COLS: Record<FormRowColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 m:grid-cols-2',
  3: 'grid-cols-1 m:grid-cols-3',
};

export interface FormRowProps {
  /** Nº de columnas desde el breakpoint M (1 columna en móvil). */
  columns?: FormRowColumns;
  children?: ReactNode;
  className?: string;
}

/** FormRow (z_fragment_row_*) — fila de 1–3 campos, responsive con gutter. */
export function FormRow({ columns = 1, children, className }: FormRowProps) {
  return <div className={cn('grid gap-fx-4', COLS[columns], className)}>{children}</div>;
}

export default Form;
