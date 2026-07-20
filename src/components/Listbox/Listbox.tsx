import { useId, useRef, useState, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import '../Input/input.css';

export interface ListboxOption { value: string; label: ReactNode; disabled?: boolean; }
export type ListboxSize = 'm' | 'l';

export interface ListboxProps {
  options: ListboxOption[];
  label?: ReactNode;
  placeholder?: string;
  size?: ListboxSize;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

/**
 * Listbox (UI07) — desplegable de selección única. Disparador con estilo de
 * campo (tokens Forms) + panel de opciones. Accesible (role listbox/option).
 */
export function Listbox({ options, label, placeholder = 'Selecciona…', size = 'm', defaultValue, disabled, onChange, className }: ListboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const ref = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const pick = (v: string) => { setValue(v); setOpen(false); onChange?.(v); };

  return (
    <div className={cn('field', size === 'l' && 'field--l', className)} data-state={disabled ? 'disabled' : 'default'} ref={ref}>
      {label && <span className="field__label type-input-m-label-out">{label}</span>}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn('field__control w-full justify-between', size === 'l' ? 'type-input-m-text' : 'type-input-s-text')}
        >
          <span className={cn('truncate', !selected && 'text-(--form-default-label-in)')}>
            {selected ? selected.label : placeholder}
          </span>
          <Icon name="CaretDown" size="s" className={cn('field__icon transition-transform', open && 'rotate-180')} />
        </button>
        {open && (
          <ul
            role="listbox"
            id={`${baseId}-list`}
            className="absolute z-10 mt-fx-1 max-h-64 w-full overflow-auto border border-(--form-default-stroke) bg-(--bg-white) shadow-elevation-light-m"
          >
            {options.map((o) => {
              const isSel = o.value === value;
              return (
                <li
                  key={o.value}
                  role="option"
                  aria-selected={isSel}
                  aria-disabled={o.disabled || undefined}
                  onClick={() => !o.disabled && pick(o.value)}
                  className={cn(
                    'type-body-3 flex items-center justify-between gap-fx-2 px-fx-4 py-fx-3 text-(--text-base)',
                    o.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-(--bg-neutral-1)',
                    isSel && 'bg-(--bg-neutral-1)',
                  )}
                >
                  {o.label}
                  {isSel && <Icon name="Check" size="s" className="text-(--stroke-accent-base)" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Listbox;
