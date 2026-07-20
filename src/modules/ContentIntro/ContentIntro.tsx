import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { ThemeName } from '@/modules/SectionHero';

export interface ContentIntroProps { eyebrow?: ReactNode; children: ReactNode; theme?: ThemeName; className?: string; }

/** Módulo Content / Intro text — párrafo introductorio destacado. */
export function ContentIntro({ eyebrow, children, theme = 'light-white', className }: ContentIntroProps) {
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-11)">
        <div className="grid-12">
          <div className="col-span-full flex flex-col gap-fx-4 m:col-span-8">
            {eyebrow && <span className="type-label-2 uppercase text-(--text-neutral-1)">{eyebrow}</span>}
            <div className="type-body-6 text-(--text-base)">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContentIntro;
