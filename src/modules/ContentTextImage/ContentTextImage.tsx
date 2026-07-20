import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { ActionLink } from '@/components/ActionLink';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface ContentTextImageProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  linkLabel?: string;
  linkHref?: string;
  image?: ReactNode;
  imageRatio?: AspectRatioValue;
  /** Imagen a la izquierda. */
  reverse?: boolean;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Content / Text + Image — bloque de texto junto a una imagen (6+6 en
 * desktop, apilado en móvil), reversible y con tema propio.
 */
export function ContentTextImage({ eyebrow, title, body, linkLabel, linkHref = '#', image, imageRatio = '4:3', reverse = false, theme = 'light-white', className }: ContentTextImageProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        <div className="grid-12 items-center gap-y-(--space-8)">
          <div className={cn('col-span-full flex flex-col gap-fx-4 m:col-span-6', reverse ? 'm:order-2 m:col-start-7' : 'm:col-start-1')}>
            {eyebrow && <span className="type-label-2 uppercase text-(--text-neutral-1)">{eyebrow}</span>}
            <Title level={4} as="h2">{title}</Title>
            {body && <div className="type-body-4 flex flex-col gap-fx-3 text-(--text-neutral-1)">{body}</div>}
            {linkLabel && <ActionLink href={linkHref} className="mt-fx-2" iconRight={<Icon name="ArrowRight" size="s" />}>{linkLabel}</ActionLink>}
          </div>
          {image && (
            <div className={cn('col-span-full m:col-span-6', reverse ? 'm:order-1 m:col-start-1' : 'm:col-start-7')}>
              <AspectRatio ratio={imageRatio} className="bg-(--bg-neutral-1)">{image}</AspectRatio>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContentTextImage;
