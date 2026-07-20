import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { ActionLink } from '@/components/ActionLink';
import { AspectRatio } from '@/components/AspectRatio';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface ShowcaseItem { image: ReactNode; title: ReactNode; description?: ReactNode; href?: string; }

export interface CardsShowcaseProps {
  heading?: ReactNode;
  featured: ShowcaseItem;
  items?: ShowcaseItem[];
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Cards / Showcase — un elemento destacado grande + una lista de
 * elementos de apoyo (7+5 columnas en desktop).
 */
export function CardsShowcase({ heading, featured, items = [], theme = 'light-white', className }: CardsShowcaseProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        {heading && <Title level={5} as="h2" className="mb-(--space-8)">{heading}</Title>}
        <div className="grid-12 gap-y-(--space-8)">
          <a href={featured.href ?? '#'} className="group col-span-full flex flex-col gap-fx-4 no-underline text-(--text-base) m:col-span-7">
            <AspectRatio ratio="4:3" className="bg-(--bg-neutral-1)">{featured.image}</AspectRatio>
            <Title level={3} as="h3" className="group-hover:text-(--text-hover)">{featured.title}</Title>
            {featured.description && <p className="type-body-4 m-0 text-(--text-neutral-1)">{featured.description}</p>}
            <ActionLink href={featured.href ?? '#'} iconRight={<Icon name="ArrowRight" size="s" />}>Ver más</ActionLink>
          </a>
          <div className="col-span-full flex flex-col gap-(--space-6) m:col-span-5">
            {items.map((it, i) => (
              <a key={i} href={it.href ?? '#'} className="group flex items-center gap-fx-4 no-underline text-(--text-base)">
                <div className="w-28 shrink-0"><AspectRatio ratio="1:1" className="bg-(--bg-neutral-1)">{it.image}</AspectRatio></div>
                <div className="flex flex-col gap-fx-1">
                  <span className="type-title-2 group-hover:text-(--text-hover)">{it.title}</span>
                  {it.description && <span className="type-body-3 text-(--text-neutral-1)">{it.description}</span>}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CardsShowcase;
