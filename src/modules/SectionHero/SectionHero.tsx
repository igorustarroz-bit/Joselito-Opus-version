import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';

export type ThemeName = 'light-white' | 'light-grey' | 'dark-red-primary' | 'dark-black-neutral' | 'light-yellow';

export interface SectionHeroProps {
  /** Antetítulo (eyebrow). */
  eyebrow?: ReactNode;
  /** Título principal. */
  title: ReactNode;
  /** Tema del módulo (data-theme). Por defecto el de marca (rojo). */
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Hero / Section hero (fiel al master de Figma) — sección a 100% del
 * viewport con fondo `--bg-base` y contenido CENTRADO: eyebrow (Body/06) +
 * título (Title/04), ancho de contenido ~540px. Sin imagen ni botones.
 */
export function SectionHero({ eyebrow, title, theme = 'dark-red-primary', className }: SectionHeroProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex min-h-[70vh] items-center justify-center py-(--space-14)">
        <div className="flex w-full max-w-[540px] flex-col items-center gap-fx-4 text-center">
          {eyebrow && <p className="type-body-6 m-0">{eyebrow}</p>}
          <Title level={4} as="h1" className="text-(--text-base)">{title}</Title>
        </div>
      </div>
    </section>
  );
}

export default SectionHero;
