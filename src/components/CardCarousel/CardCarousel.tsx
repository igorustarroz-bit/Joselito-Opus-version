import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Icon } from '@/components/Icon';

export interface CardCarouselProps {
  /** Tarjetas (u otros elementos) a mostrar. */
  children: ReactNode;
  /** Ancho de cada slide (CSS). */
  itemWidth?: string;
  /** Mostrar controles de navegación. */
  controls?: boolean;
  ariaLabel?: string;
  className?: string;
}

/**
 * Card Carrusel — carrusel horizontal con scroll-snap y controles prev/next
 * (ButtonIcon). Acepta cualquier contenido (habitualmente CardProduct).
 */
export function CardCarousel({ children, itemWidth = '280px', controls = true, ariaLabel = 'Carrusel', className }: CardCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className={cn('flex flex-col gap-fx-4', className)} aria-label={ariaLabel} aria-roledescription="carousel">
      <div
        ref={trackRef}
        className="flex gap-fx-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
      >
        {(Array.isArray(children) ? children : [children]).map((child, i) => (
          <div key={i} className="snap-start shrink-0" style={{ width: itemWidth }}>
            {child}
          </div>
        ))}
      </div>
      {controls && (
        <div className="flex gap-fx-2">
          <ButtonIcon variant="secondary" size="s" label="Anterior" icon={<Icon name="ArrowLeft" size="s" />} onClick={() => scrollBy(-1)} />
          <ButtonIcon variant="secondary" size="s" label="Siguiente" icon={<Icon name="ArrowRight" size="s" />} onClick={() => scrollBy(1)} />
        </div>
      )}
    </section>
  );
}

export default CardCarousel;
