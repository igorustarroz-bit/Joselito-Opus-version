import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';
import { Tag } from '@/components/Tag';
import { Button } from '@/components/Button';

export interface CardProductProps {
  image?: ReactNode;
  ratio?: AspectRatioValue;
  /** Badge superior (p. ej. "Nuevo"). */
  badge?: ReactNode;
  category?: ReactNode;
  name: ReactNode;
  price?: ReactNode;
  onAdd?: () => void;
  addLabel?: string;
  className?: string;
}

/**
 * Card Product — tarjeta de producto: imagen con badge, categoría, nombre,
 * precio y acción de compra (Button). Compone AspectRatio, Tag y Button.
 */
export function CardProduct({ image, ratio = '1:1', badge, category, name, price, onAdd, addLabel = 'Añadir', className }: CardProductProps) {
  return (
    <div className={cn('flex flex-col gap-fx-3 bg-(--bg-base) text-(--text-base)', className)}>
      <div className="relative">
        <AspectRatio ratio={ratio} className="bg-(--bg-neutral-1)">{image}</AspectRatio>
        {badge && <div className="absolute left-fx-3 top-fx-3"><Tag type="new" size="xs">{badge}</Tag></div>}
      </div>
      <div className="flex flex-col gap-fx-1">
        {category && <span className="type-label-2 uppercase text-(--text-neutral-1)">{category}</span>}
        <span className="type-title-2">{name}</span>
        {price && <span className="type-body-4 text-(--text-base)">{price}</span>}
      </div>
      {onAdd && <Button size="m" onClick={onAdd} className="mt-fx-2 w-full">{addLabel}</Button>}
    </div>
  );
}

export default CardProduct;
