import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import type { ThemeName } from '@/modules/SectionHero';

export type ContentTextVariant = 'split' | '1-column' | '2-column';

export interface ContentTextProps {
  /** Etiqueta superior (Body/06). */
  label?: ReactNode;
  /** Título (Title/04). */
  title?: ReactNode;
  /** Cuerpo (Body/05). */
  children: ReactNode;
  /** Disposición (fiel a las variantes de Figma). */
  variant?: ContentTextVariant;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Content / Text only (fiel al master) — etiqueta + título + cuerpo.
 * Variantes: `split` (título izquierda / cuerpo derecha), `1-column` (apilado)
 * y `2-column` (cuerpo a dos columnas). Body en Body/05, título en Title/04.
 */
export function ContentText({ label, title, children, variant = 'split', theme = 'light-white', className }: ContentTextProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex flex-col gap-fx-4 py-(--space-14)">
        {label && <p className="type-body-6 m-0">{label}</p>}

        {variant === 'split' ? (
          <div className="grid-12 gap-y-(--space-6)">
            {title && <Title level={4} as="h2" className="col-span-full m:col-span-6">{title}</Title>}
            <div className="type-body-5 col-span-full flex flex-col gap-fx-8 text-(--text-base) m:col-span-5 m:col-start-8">
              {children}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-(--space-6)">
            {title && <Title level={4} as="h2">{title}</Title>}
            <div
              className={cn(
                'type-body-5 text-(--text-base)',
                variant === '2-column'
                  ? 'm:columns-2 m:gap-(--grid-gutter) [&>*]:mb-fx-4'
                  : 'flex max-w-[820px] flex-col gap-fx-4',
              )}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ContentText;
