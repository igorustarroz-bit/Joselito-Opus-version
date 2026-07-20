import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from '@/components/Icon';
import { ButtonIcon } from '@/components/ButtonIcon';

export type ToastVariant = 'info' | 'success' | 'error' | 'warning';

const VARIANT: Record<ToastVariant, { icon: IconName; bg: string; stroke: string; text: string }> = {
  info: { icon: 'Info', bg: 'bg-(--bg-neutral-1)', stroke: 'border-(--stroke-neutral-2)', text: 'text-(--text-base)' },
  success: { icon: 'Check', bg: 'bg-(--bg-success-1)', stroke: 'border-(--stroke-success-1)', text: 'text-(--text-success)' },
  error: { icon: 'ExclamationMark', bg: 'bg-(--bg-error-1)', stroke: 'border-(--stroke-error-1)', text: 'text-(--text-error)' },
  warning: { icon: 'Info', bg: 'bg-(--bg-warning-1)', stroke: 'border-(--stroke-warning-1)', text: 'text-(--text-warning)' },
};

export interface ToastProps {
  variant?: ToastVariant;
  title?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}

/**
 * Toast — notificación breve con icono, mensaje y cierre. Variantes info,
 * success, error y warning con tokens semánticos de sistema.
 */
export function Toast({ variant = 'info', title, children, onClose, className }: ToastProps) {
  const v = VARIANT[variant];
  return (
    <div role="status" aria-live="polite" className={cn('flex items-start gap-fx-3 border p-fx-4 text-(--text-base)', v.bg, v.stroke, className)}>
      <span className={cn('mt-fx-0 shrink-0', v.text)}><Icon name={v.icon} size="s" title={variant} /></span>
      <div className="flex flex-1 flex-col gap-fx-1">
        {title && <span className="type-title-1">{title}</span>}
        {children && <span className="type-body-3 text-(--text-neutral-1)">{children}</span>}
      </div>
      {onClose && <ButtonIcon variant="terciary" size="xs" label="Cerrar" icon={<Icon name="X" size="xs" />} onClick={onClose} />}
    </div>
  );
}

export default Toast;
