import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface BannerProps {
  /** Título de la sección (arriba a la izquierda). */
  sectionTitle?: ReactNode;
  /** Enlace "ver todos" (arriba a la derecha). */
  seeAll?: { label: ReactNode; href?: string };
  /** Imagen/vídeo de fondo (a sangre, con overlay). */
  image?: ReactNode;
  /** Título de la tarjeta superpuesta (Title/02). */
  title: ReactNode;
  /** Texto de la tarjeta (Body/03). */
  description?: ReactNode;
  ctaLabel?: string;
  onCta?: () => void;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Banners / Section banner (fiel al master) — cabecera (título + "ver
 * todos") y bloque de medios a sangre con overlay y una tarjeta blanca
 * superpuesta abajo a la derecha (título Title/02 + texto + botón terciario).
 */
export function Banner({ sectionTitle, seeAll, image, title, description, ctaLabel, onCta, theme = 'light-white', className }: BannerProps) {
  return (
    <section data-theme={theme} className={cn('w-full border-b border-(--stroke-neutral-3) bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex flex-col gap-(--space-9) pt-(--space-9) pb-(--space-13)">
        {(sectionTitle || seeAll) && (
          <div className="flex items-center justify-between gap-fx-4">
            {sectionTitle && <p className="type-body-4 m-0 text-(--text-base)">{sectionTitle}</p>}
            {seeAll && (
              <a href={seeAll.href ?? '#'} className="inline-flex items-center gap-fx-1 type-body-3 no-underline text-(--text-neutral-1) hover:text-(--text-hover)">
                {seeAll.label}<Icon name="CaretRight" size="s" />
              </a>
            )}
          </div>
        )}
        <div className="relative flex min-h-[520px] items-end justify-end overflow-hidden p-fx-8">
          <div className="absolute inset-0">
            <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full [&>img]:object-cover">{image}</div>
            <div className="absolute inset-0 bg-(--bg-overlay) opacity-30" />
          </div>
          <div data-theme="light-white" className="relative flex w-full max-w-[372px] flex-col justify-between gap-(--space-10) bg-(--bg-base) p-fx-8 text-(--text-base)">
            <div className="flex flex-col gap-fx-6">
              <Title level={2} as="h3">{title}</Title>
              {description && <p className="type-body-3 m-0 text-(--text-neutral-2)">{description}</p>}
            </div>
            {ctaLabel && <Button variant="terciary" size="m" className="self-start" onClick={onCta}>{ctaLabel}</Button>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
