import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface SectionHeaderProps {
  /** Etiqueta del enlace "sección anterior" (barra superior). Si se omite, no se muestra la barra. */
  backLabel?: ReactNode;
  backHref?: string;
  /** Título de sección (grande, a la izquierda). */
  title: ReactNode;
  /** Texto descriptivo (a la derecha en desktop). */
  description?: ReactNode;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Hero / Section header (fiel al master de Figma) — barra superior con
 * enlace "sección anterior" + bloque de cabecera sobre fondo neutro: título
 * grande (Title/05) a la izquierda y párrafo (Body/05) a la derecha en desktop.
 */
export function SectionHeader({ backLabel, backHref = '#', title, description, theme = 'light-white', className }: SectionHeaderProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-neutral-1) text-(--text-base)', className)}>
      {backLabel && (
        <div className="grid-wrapper flex h-20 items-center">
          <a href={backHref} className="group inline-flex items-center gap-fx-2 no-underline text-(--text-base)">
            <Icon name="ArrowLeft" size="m" className="transition-transform group-hover:-translate-x-fx-1" />
            <span className="type-body-3">{backLabel}</span>
          </a>
        </div>
      )}
      <div className="grid-wrapper pt-(--space-14) pb-(--space-13)">
        <div className="grid-12 gap-y-(--space-6)">
          <Title level={5} as="h2" className="col-span-full m:col-span-6">{title}</Title>
          {description && (
            <p className="type-body-5 m-0 col-span-full text-(--text-base) m:col-span-5 m:col-start-8">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SectionHeader;
