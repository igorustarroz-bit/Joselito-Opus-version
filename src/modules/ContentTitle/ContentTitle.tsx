import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { ActionLink } from '@/components/ActionLink';
import type { ThemeName } from '@/modules/SectionHero';

export interface ContentTitleProps {
  /** Etiqueta superior (Body/06). */
  label?: ReactNode;
  /** Título (Title/04, a la izquierda). */
  title: ReactNode;
  /** Descripción (Body/05, a la derecha en desktop). */
  description?: ReactNode;
  /** Enlace de acción opcional a la derecha. */
  linkLabel?: ReactNode;
  linkHref?: string;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Content / Title (fiel al master) — etiqueta + fila con título grande a
 * la izquierda y descripción (+ enlace) a la derecha en desktop; apilado en móvil.
 */
export function ContentTitle({ label, title, description, linkLabel, linkHref = '#', theme = 'light-white', className }: ContentTitleProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex flex-col gap-fx-4 pt-(--space-14) pb-(--space-11)">
        {label && <p className="type-body-6 m-0">{label}</p>}
        <div className="grid-12 gap-y-(--space-6)">
          <Title level={4} as="h2" className="col-span-full m:col-span-6">{title}</Title>
          {(description || linkLabel) && (
            <div className="col-span-full flex flex-wrap items-start gap-x-fx-8 gap-y-fx-4 m:col-span-5 m:col-start-8">
              {description && <p className="type-body-5 m-0 flex-1 text-(--text-base)">{description}</p>}
              {linkLabel && <ActionLink href={linkHref} size="l" className="shrink-0">{linkLabel}</ActionLink>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContentTitle;
