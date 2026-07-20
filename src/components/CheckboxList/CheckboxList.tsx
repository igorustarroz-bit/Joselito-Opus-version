import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Checkbox, type CheckboxProps } from '@/components/Checkbox';

export interface CheckboxListOption extends Omit<CheckboxProps, 'label'> {
  value: string;
  label: ReactNode;
}

export interface CheckboxListProps {
  /** Título del grupo (legend). */
  legend?: ReactNode;
  options: CheckboxListOption[];
  /** Dirección de la lista. */
  direction?: 'vertical' | 'horizontal';
  name?: string;
  className?: string;
}

/**
 * Checkbox-List (UI08) — grupo de casillas con título (fieldset/legend).
 * Compone Checkbox en vertical u horizontal.
 */
export function CheckboxList({ legend, options, direction = 'vertical', name, className }: CheckboxListProps) {
  return (
    <fieldset className={cn('border-0 m-0 p-0', className)}>
      {legend && <legend className="type-input-m-label-out text-(--text-neutral-1) mb-fx-3">{legend}</legend>}
      <div className={cn('flex gap-fx-3', direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}>
        {options.map(({ value, label, ...rest }) => (
          <Checkbox key={value} value={value} name={name} label={label} {...rest} />
        ))}
      </div>
    </fieldset>
  );
}

export default CheckboxList;
