import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import type { ThemeName } from '@/modules/SectionHero';

export interface BannerAction { label: string; onClick?: () => void; variant?: 'primary' | 'secondary' | 'terciary'; }

export interface BannerProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: BannerAction[];
  /** Tema del banner (por defecto marca/rojo). */
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Banner — franja de llamada a la acción a 100% del viewport, con título,
 * texto y botones. Por defecto usa el tema de marca (dark-red-primary).
 */
export function Banner({ title, description, actions = [], theme = 'dark-red-primary', className }: BannerProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        <div className="grid-12">
          <div className="col-span-full flex flex-col items-center gap-fx-5 text-center m:col-span-8 m:col-start-3">
            <Title level={4} as="h2">{title}</Title>
            {description && <p className="type-body-4 m-0 max-w-prose text-(--text-neutral-1)">{description}</p>}
            {actions.length > 0 && (
              <div className="flex flex-wrap justify-center gap-fx-3">
                {actions.map((a, i) => (
                  <Button key={i} variant={a.variant ?? (i === 0 ? 'primary' : 'secondary')} size="l" onClick={a.onClick}>{a.label}</Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
