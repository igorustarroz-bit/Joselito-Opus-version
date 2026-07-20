import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';

export type CheckboxSize = 's' | 'm';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  size?: CheckboxSize;
}

const BOX: Record<CheckboxSize, string> = { s: 'size-4', m: 'size-5' };

/**
 * Checkbox (UI10) — casilla de verificación accesible. Input nativo oculto +
 * caja visual con tokens semánticos; marca con el icono Check.
 */
export function Checkbox({ label, size = 'm', id, className, disabled, ...props }: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <label
      htmlFor={inputId}
      className={cn('inline-flex items-center gap-fx-2 select-none', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer', className)}
    >
      <span className="relative inline-flex">
        <input id={inputId} type="checkbox" disabled={disabled} className="peer sr-only" {...props} />
        <span
          className={cn(
            BOX[size],
            'inline-flex items-center justify-center rounded-xs border border-(--stroke-neutral-2) bg-(--bg-white) text-transparent transition-colors',
            'peer-checked:bg-(--bg-accent-base) peer-checked:border-(--bg-accent-base) peer-checked:text-(--text-always-white)',
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-(--stroke-accent-base) peer-focus-visible:outline-offset-2',
          )}
        >
          <Icon name="Check" size={size === 's' ? 'xxs' : 'xs'} />
        </span>
      </span>
      {label && <span className="type-body-3 text-(--text-base)">{label}</span>}
    </label>
  );
}

export default Checkbox;
