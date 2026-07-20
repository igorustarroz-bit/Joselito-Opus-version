import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { CardCarousel } from '@/components/CardCarousel';
import type { ThemeName } from '@/modules/SectionHero';

export interface CardsProductCarouselProps {
  heading?: ReactNode;
  children: ReactNode;
  itemWidth?: string;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Cards / Product carousel — sección con título y un carrusel de tarjetas
 * de producto (usa el componente CardCarousel).
 */
export function CardsProductCarousel({ heading, children, itemWidth = '280px', theme = 'light-white', className }: CardsProductCarouselProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        {heading && <Title level={5} as="h2" className="mb-(--space-8)">{heading}</Title>}
        <CardCarousel itemWidth={itemWidth} ariaLabel={typeof heading === 'string' ? heading : 'Carrusel de productos'}>
          {children}
        </CardCarousel>
      </div>
    </section>
  );
}

export default CardsProductCarousel;
