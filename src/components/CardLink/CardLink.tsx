import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';
import { Title } from '@/components/Title';
import { Icon } from '@/components/Icon';

export interface CardLinkProps {
  href?: string;
  /** Imagen (elemento <img> o similar). */
  image?: ReactNode;
  ratio?: AspectRatioValue;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

/**
 * Card Link — tarjeta enlazable: imagen (AspectRatio) + contenido (eyebrow,
 * título, descripción) y flecha. Toda la tarjeta es un enlace.
 */
export function CardLink({ href = '#', image, ratio = '4:3', eyebrow, title, description, className }: CardLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'group flex flex-col gap-fx-4 bg-(--bg-base) text-(--text-base) no-underline',
        'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-(--stroke-accent-base) focus-visible:outline-offset-2',
        className,
      )}
    >
      {image && (
        <AspectRatio ratio={ratio} className="bg-(--bg-neutral-1)">
          {image}
        </AspectRatio>
      )}
      <div className="flex flex-col gap-fx-2">
        {eyebrow && <span className="type-label-2 uppercase text-(--text-neutral-1)">{eyebrow}</span>}
        <Title level={3} as="h3" className="transition-colors group-hover:text-(--text-hover)">{title}</Title>
        {description && <p className="type-body-3 m-0 text-(--text-neutral-1)">{description}</p>}
        <span className="mt-fx-2 inline-flex items-center gap-fx-2 type-cta-s uppercase text-(--text-base) transition-transform group-hover:translate-x-fx-1">
          Leer más <Icon name="ArrowRight" size="s" />
        </span>
      </div>
    </a>
  );
}

export default CardLink;
