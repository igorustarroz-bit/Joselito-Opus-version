import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';

export type ThemeName = 'light-white' | 'light-grey' | 'dark-red-primary' | 'dark-black-neutral' | 'light-yellow';

export interface SectionHeroAction { label: string; href?: string; onClick?: () => void; variant?: 'primary' | 'secondary' | 'terciary'; }

export interface SectionHeroProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: SectionHeroAction[];
  /** Imagen del hero (lado derecho en desktop). */
  image?: ReactNode;
  imageRatio?: AspectRatioValue;
  /** Tema del módulo (data-theme). */
  theme?: ThemeName;
  /** Invierte el orden (imagen a la izquierda). */
  reverse?: boolean;
  className?: string;
}

/**
 * Módulo Section Hero — sección a 100% del viewport con grid de 12 columnas.
 * En móvil apila (texto + imagen); desde M usa 2 columnas. Soporta tema propio
 * vía [data-theme]. Compone Title, Button y AspectRatio.
 */
export function SectionHero({ eyebrow, title, description, actions = [], image, imageRatio = '4:3', theme = 'light-white', reverse = false, className }: SectionHeroProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        <div className="grid-12 items-center gap-y-(--space-8)">
          <div className={cn('col-span-full flex flex-col gap-fx-4 m:col-span-6', reverse && 'm:order-2')}>
            {eyebrow && <span className="type-label-2 uppercase text-(--text-neutral-1)">{eyebrow}</span>}
            <Title level={6} as="h1">{title}</Title>
            {description && <p className="type-body-4 m-0 max-w-prose text-(--text-neutral-1)">{description}</p>}
            {actions.length > 0 && (
              <div className="mt-fx-4 flex flex-wrap gap-fx-3">
                {actions.map((a, i) => (
                  <Button key={i} variant={a.variant ?? (i === 0 ? 'primary' : 'secondary')} size="l" onClick={a.onClick}>
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {image && (
            <div className={cn('col-span-full m:col-span-6', reverse && 'm:order-1')}>
              <AspectRatio ratio={imageRatio} className="bg-(--bg-neutral-1)">{image}</AspectRatio>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SectionHero;
