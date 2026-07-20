import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import type { ThemeName } from '@/modules/SectionHero';

export interface TimelineItem { marker: ReactNode; title: ReactNode; description?: ReactNode; }

export interface ListTimelineProps {
  heading?: ReactNode;
  items: TimelineItem[];
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo List / Timeline — línea temporal vertical con hitos (marcador + título
 * + descripción) conectados por una línea.
 */
export function ListTimeline({ heading, items, theme = 'light-white', className }: ListTimelineProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        {heading && <Title level={5} as="h2" className="mb-(--space-8)">{heading}</Title>}
        <ol className="grid-12 m-0 p-0 list-none">
          <li className="col-span-full m:col-span-8 m:col-start-3">
            <div className="flex flex-col">
              {items.map((it, i) => (
                <div key={i} className="relative flex gap-fx-5 pb-(--space-9) last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <span className="z-10 mt-fx-1 size-3 shrink-0 rounded-rounded bg-(--bg-accent-base)" />
                    {i < items.length - 1 && <span className="absolute top-fx-1 h-full w-px bg-(--stroke-neutral-3)" />}
                  </div>
                  <div className="flex flex-col gap-fx-1 pb-fx-2">
                    <span className="type-title-3 text-(--text-accent-base)">{it.marker}</span>
                    <span className="type-title-2">{it.title}</span>
                    {it.description && <p className="type-body-3 m-0 text-(--text-neutral-1)">{it.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

export default ListTimeline;
