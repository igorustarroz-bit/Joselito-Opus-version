import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';

export interface CheckboxLabelProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'title'> {
  /** Título principal. */
  title: ReactNode;
  /** Descripción secundaria opcional. */
  description?: ReactNode;
}

/**
 * Checkbox-Label (UI09) — casilla con título y descripción. Compone Checkbox
 * con un bloque de texto (título + descripción) alineado arriba.
 */
export function CheckboxLabel({ title, description, id, className, disabled, ...props }: CheckboxLabelProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <label
      htmlFor={inputId}
      className={cn('flex items-start gap-fx-3', disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer', className)}
    >
      <span className="relative inline-flex mt-fx-0">
        <input id={inputId} type="checkbox" disabled={disabled} className="peer sr-only" {...props} />
        <span className="size-5 inline-flex items-center justify-center rounded-xs border border-(--stroke-neutral-2) bg-(--bg-white) text-transparent transition-colors peer-checked:bg-(--bg-accent-base) peer-checked:border-(--bg-accent-base) peer-checked:text-(--text-always-white) peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-(--stroke-accent-base) peer-focus-visible:outline-offset-2">
          <Icon name="Check" size="xs" />
        </span>
      </span>
      <span className="flex flex-col gap-fx-1">
        <span className="type-title-1 text-(--text-base)">{title}</span>
        {description && <span className="type-body-3 text-(--text-neutral-1)">{description}</span>}
      </span>
    </label>
  );
}

export default CheckboxLabel;
