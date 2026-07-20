import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import { AspectRatio, type AspectRatioValue } from '@/components/AspectRatio';
import type { ThemeName } from '@/modules/SectionHero';

export interface ContentIntroProps {
  /** Antetítulo pequeño en mayúsculas (Body/02). */
  eyebrow?: ReactNode;
  /** Texto principal destacado (Title/03). */
  title: ReactNode;
  /** Imagen opcional centrada bajo el título. */
  image?: ReactNode;
  imageRatio?: AspectRatioValue;
  imageWidth?: number;
  /** Texto secundario opcional (Body/04). */
  content?: ReactNode;
  /** Botón opcional (terciario). */
  actionLabel?: string;
  onAction?: () => void;
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo Content / Intro text (fiel al master) — bloque CENTRADO: eyebrow
 * (Body/02) + texto grande (Title/03), con imagen, texto secundario y botón
 * terciario opcionales. Todo centrado con amplio padding vertical.
 */
export function ContentIntro({ eyebrow, title, image, imageRatio = '3:4', imageWidth = 150, content, actionLabel, onAction, theme = 'light-white', className }: ContentIntroProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper flex flex-col items-center gap-(--space-9) py-(--space-16) text-center">
        <div className="flex max-w-[1058px] flex-col items-center gap-fx-6">
          {eyebrow && <p className="type-body-2 m-0 uppercase text-(--text-neutral-2)">{eyebrow}</p>}
          <Title level={3} as="p" className="text-(--text-base)">{title}</Title>
        </div>
        {image && (
          <div style={{ width: imageWidth }}>
            <AspectRatio ratio={imageRatio} className="bg-(--bg-neutral-1)">{image}</AspectRatio>
          </div>
        )}
        {content && <p className="type-body-4 m-0 max-w-[628px] text-(--text-neutral-1)">{content}</p>}
        {actionLabel && <Button variant="terciary" size="m" onClick={onAction}>{actionLabel}</Button>}
      </div>
    </section>
  );
}

export default ContentIntro;
