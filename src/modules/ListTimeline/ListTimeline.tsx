import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface TimelineEntry {
  /** Año / hito (se muestra en grande, serif). */
  year: ReactNode;
  /** Título de la tarjeta (Title/02). */
  title: ReactNode;
  /** Texto de la tarjeta (Body/03). */
  description?: ReactNode;
  /** Imagen del hito (foto en b/n, se muestra rotada). */
  image?: ReactNode;
}

export interface ListTimelineProps {
  /** Título de sección arriba a la izquierda (Body/04). */
  topTitle?: ReactNode;
  /** Enlace "Ver todos" arriba a la derecha. */
  seeAll?: { label: ReactNode; href?: string };
  entries: TimelineEntry[];
  /** Índice inicial destacado. */
  defaultIndex?: number;
  theme?: ThemeName;
  className?: string;
}

function NavButton({ dir, onClick, disabled }: { dir: 'left' | 'right'; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Anterior' : 'Siguiente'}
      className="flex size-10 shrink-0 items-center justify-center border border-(--stroke-neutral-2) text-(--text-base) transition-opacity disabled:opacity-30 hover:bg-(--bg-neutral-1) cursor-pointer disabled:cursor-default"
    >
      <Icon name={dir === 'left' ? 'CaretLeft' : 'CaretRight'} size="xs" />
    </button>
  );
}

/**
 * Módulo List / Timeline (fiel al master) — línea temporal sobre fondo de marca:
 * los años se muestran en grande (Title/08, serif) apilados a la derecha, el
 * activo en color de acento y el resto atenuados; una foto rotada del hito y una
 * tarjeta clara abajo-izquierda con título (Title/02), texto y botones prev/next.
 */
export function ListTimeline({ topTitle, seeAll, entries, defaultIndex = 0, theme = 'dark-red-primary', className }: ListTimelineProps) {
  const [i, setI] = useState(defaultIndex);
  const active = entries[i];
  if (!active) return null;

  return (
    <section data-theme={theme} className={cn('w-full overflow-hidden bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper relative flex min-h-[560px] flex-col py-(--space-11) m:min-h-[820px]">
        {/* Barra superior */}
        <div className="relative z-20 flex items-center justify-between gap-fx-4">
          {topTitle && <p className="type-body-4 m-0 text-(--text-base)">{topTitle}</p>}
          {seeAll && (
            <a href={seeAll.href ?? '#'} className="inline-flex items-center gap-fx-1 type-body-3 no-underline text-(--text-base) hover:text-(--text-hover)">
              {seeAll.label}<Icon name="CaretRight" size="s" />
            </a>
          )}
        </div>

        {/* Años en grande, apilados a la derecha */}
        <div className="pointer-events-none absolute inset-y-(--space-11) right-0 z-0 hidden w-[40%] flex-col items-center justify-center gap-fx-2 pr-(--space-8) m:flex">
          {entries.map((e, idx) => (
            <span
              key={idx}
              className={cn(
                'type-title-8 leading-none transition-opacity',
                idx === i ? 'text-(--text-accent-base) opacity-100' : 'text-(--text-inverted) opacity-20',
              )}
            >
              {e.year}
            </span>
          ))}
        </div>

        {/* Foto rotada del hito */}
        {active.image && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden w-[520px] max-w-[55%] -translate-x-1/2 -translate-y-1/2 -rotate-6 m:block">
            <div className="aspect-[3/2] w-full overflow-hidden [&>*]:h-full [&>*]:w-full [&>img]:object-cover">{active.image}</div>
          </div>
        )}

        {/* Versión móvil: año destacado + foto apilados */}
        <div className="relative z-10 flex flex-col items-center gap-fx-6 py-(--space-10) m:hidden">
          <span className="type-title-8 leading-none text-(--text-accent-base)">{active.year}</span>
          {active.image && (
            <div className="w-[280px] max-w-[80%] -rotate-6 overflow-hidden [&>*]:h-full [&>*]:w-full [&>img]:object-cover">
              <div className="aspect-[3/4] w-full">{active.image}</div>
            </div>
          )}
        </div>

        {/* Tarjeta */}
        <div
          data-theme="light-white"
          className="relative z-20 mt-auto flex w-full flex-col gap-(--space-10) bg-(--bg-base) p-fx-8 text-(--text-base) m:w-[405px]"
        >
          <div className="flex flex-col gap-fx-6">
            <p className="type-title-2 m-0 text-(--text-base)">{active.title}</p>
            {active.description && <p className="type-body-3 m-0 text-(--text-neutral-2)">{active.description}</p>}
          </div>
          <div className="flex gap-fx-2">
            <NavButton dir="left" onClick={() => setI((v) => Math.max(0, v - 1))} disabled={i === 0} />
            <NavButton dir="right" onClick={() => setI((v) => Math.min(entries.length - 1, v + 1))} disabled={i === entries.length - 1} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListTimeline;
