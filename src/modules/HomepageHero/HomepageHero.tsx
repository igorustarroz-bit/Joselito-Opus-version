import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';

export interface HomepageHeroAction { label: string; onClick?: () => void; variant?: 'primary' | 'secondary' | 'terciary'; }

export interface HomepageHeroProps {
  /** Imagen/vídeo de fondo (se coloca a pantalla completa). */
  background?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: HomepageHeroAction[];
  /** Altura mínima del hero. */
  minHeight?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Módulo Hero / Homepage hero — hero a pantalla completa con imagen de fondo,
 * overlay y contenido (título + CTA). Contenido siempre en tema claro forzado
 * sobre la imagen (texto blanco).
 */
export function HomepageHero({ background, eyebrow, title, description, actions = [], minHeight = '80vh', align = 'center', className }: HomepageHeroProps) {
  return (
    <section className={cn('relative w-full overflow-hidden', className)} style={{ minHeight }}>
      <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full [&>img]:object-cover [&>video]:object-cover">{background}</div>
      <div className="absolute inset-0 bg-(--bg-overlay)" />
      <div className="relative grid-wrapper flex items-center" style={{ minHeight }}>
        <div className={cn('flex w-full flex-col gap-fx-5 py-(--space-12) text-(--text-always-white)', align === 'center' ? 'items-center text-center m:max-w-3xl m:mx-auto' : 'items-start text-left m:max-w-2xl')}>
          {eyebrow && <span className="type-label-2 uppercase opacity-80">{eyebrow}</span>}
          <Title level={7} as="h1" className="text-(--text-always-white)">{title}</Title>
          {description && <p className="type-body-5 m-0 max-w-prose opacity-90">{description}</p>}
          {actions.length > 0 && (
            <div className={cn('mt-fx-3 flex flex-wrap gap-fx-3', align === 'center' && 'justify-center')}>
              {actions.map((a, i) => (
                <Button key={i} variant={a.variant ?? (i === 0 ? 'primary' : 'secondary')} size="l" onClick={a.onClick}>{a.label}</Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomepageHero;
