import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import type { ThemeName } from '@/modules/SectionHero';

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Section Header — cabecera de sección (eyebrow + título + descripción)
 * centrada o alineada a la izquierda, sobre grid de 12 columnas.
 */
export function SectionHeader({ eyebrow, title, description, align = 'center', theme = 'light-white', className }: SectionHeaderProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        <div className="grid-12">
          <div className={cn('col-span-full flex flex-col gap-fx-4 m:col-span-8', align === 'center' ? 'items-center text-center m:col-start-3' : 'items-start text-left')}>
            {eyebrow && <span className="type-label-2 uppercase text-(--text-neutral-1)">{eyebrow}</span>}
            <Title level={5} as="h2">{title}</Title>
            {description && <p className="type-body-4 m-0 max-w-prose text-(--text-neutral-1)">{description}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionHeader;
