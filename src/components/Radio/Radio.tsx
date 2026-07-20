import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type RadioSize = 's' | 'm';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: ReactNode;
  size?: RadioSize;
}

const BOX: Record<RadioSize, string> = { s: 'size-4', m: 'size-5' };

/**
 * Radio (UI10) — botón de opción único accesible. Input nativo oculto + círculo
 * visual con tokens semánticos; punto interior al seleccionar.
 */
export function Radio({ label, size = 'm', id, className, disabled, ...props }: RadioProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <label
      htmlFor={inputId}
      className={cn('inline-flex items-center gap-fx-2 select-none', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer', className)}
    >
      <span className="relative inline-flex">
        <input id={inputId} type="radio" disabled={disabled} className="peer sr-only" {...props} />
        <span
          className={cn(
            BOX[size],
            'inline-flex items-center justify-center rounded-rounded border border-(--stroke-neutral-2) bg-(--bg-white) transition-colors',
            'peer-checked:border-(--bg-accent-base)',
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-(--stroke-accent-base) peer-focus-visible:outline-offset-2',
            "after:content-[''] after:rounded-rounded after:bg-(--bg-accent-base) after:transition-transform after:scale-0 peer-checked:after:scale-100",
            size === 's' ? 'after:size-2' : 'after:size-2.5',
          )}
        />
      </span>
      {label && <span className="type-body-3 text-(--text-base)">{label}</span>}
    </label>
  );
}

export default Radio;
