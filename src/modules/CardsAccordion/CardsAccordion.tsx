import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Accordion, type AccordionItemData } from '@/components/Accordion';
import type { ThemeName } from '@/modules/SectionHero';

export interface CardsAccordionProps {
  heading?: ReactNode;
  items: AccordionItemData[];
  multiple?: boolean;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Cards / Accordion — sección de preguntas frecuentes o contenido
 * plegable (usa el componente Accordion) sobre grid de 12 columnas.
 */
export function CardsAccordion({ heading, items, multiple, theme = 'light-white', className }: CardsAccordionProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        <div className="grid-12">
          <div className="col-span-full m:col-span-8 m:col-start-3 flex flex-col gap-(--space-6)">
            {heading && <Title level={5} as="h2">{heading}</Title>}
            <Accordion items={items} multiple={multiple} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardsAccordion;
