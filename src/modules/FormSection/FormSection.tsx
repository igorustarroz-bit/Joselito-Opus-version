import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Form } from '@/components/Form';
import type { ThemeName } from '@/modules/SectionHero';

export interface FormSectionProps {
  heading?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Form — sección de formulario con encabezado e introducción, centrada
 * sobre el grid de 12 columnas. Envuelve el componente Form.
 */
export function FormSection({ heading, description, children, onSubmit, theme = 'light-white', className }: FormSectionProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        <div className="grid-12">
          <div className="col-span-full m:col-span-8 m:col-start-3 flex flex-col gap-(--space-8)">
            {(heading || description) && (
              <div className="flex flex-col gap-fx-3">
                {heading && <Title level={4} as="h2">{heading}</Title>}
                {description && <p className="type-body-4 m-0 text-(--text-neutral-1)">{description}</p>}
              </div>
            )}
            <Form onSubmit={onSubmit}>{children}</Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormSection;
