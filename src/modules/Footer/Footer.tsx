import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import { Title } from '@/components/Title';
import type { ThemeName } from '@/modules/SectionHero';

export interface FooterColumn { title: ReactNode; links: { label: ReactNode; href?: string }[]; }
export interface FooterLink { label: ReactNode; href?: string; }

export interface FooterProps {
  /** Columnas de enlaces de la zona superior. */
  columns?: FooterColumn[];
  /** Newsletter: título grande + etiqueta del formulario. */
  newsletter?: { title: ReactNode; label?: ReactNode; placeholder?: string };
  /** Marca (isotipo) mostrada en el centro de la banda media. */
  brand?: ReactNode;
  /** Columnas secundarias de la banda media (Empresa, Contacto…). */
  secondaryColumns?: FooterColumn[];
  /** Iconos/enlaces sociales. */
  social?: ReactNode;
  /** Enlaces legales de la barra inferior (centro). */
  legal?: FooterLink[];
  copyright?: ReactNode;
  /** Selector de idioma (texto). */
  language?: ReactNode;
  theme?: ThemeName;
  className?: string;
}

function LinkColumn({ col }: { col: FooterColumn }) {
  return (
    <nav className="flex flex-col gap-fx-5" aria-label={typeof col.title === 'string' ? col.title : undefined}>
      <span className="type-body-2 uppercase text-(--text-base)">{col.title}</span>
      <ul className="flex flex-col gap-fx-3 m-0 p-0 list-none">
        {col.links.map((l, j) => (
          <li key={j}>
            <a href={l.href ?? '#'} className="type-body-3 no-underline text-(--text-neutral-1) hover:text-(--text-hover)">{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Módulo Navigation / Footer (fiel al master) — tres zonas: columnas de enlaces,
 * banda central (newsletter + isotipo + columnas + redes) y barra inferior
 * (copyright · legales · idioma). Fondo claro por defecto (como el master).
 */
export function Footer({ columns = [], newsletter, brand, secondaryColumns = [], social, legal = [], copyright, language, theme = 'light-white', className }: FooterProps) {
  return (
    <footer data-theme={theme} className={cn('w-full border-t border-(--stroke-neutral-4) bg-(--bg-base) text-(--text-base)', className)}>
      {/* Zona superior: columnas de enlaces */}
      {columns.length > 0 && (
        <div className="grid-wrapper grid grid-cols-2 gap-(--space-8) pt-(--space-13) pb-(--space-16) m:grid-cols-4">
          {columns.map((c, i) => <LinkColumn key={i} col={c} />)}
        </div>
      )}

      {/* Banda central: newsletter + isotipo + columnas secundarias + redes */}
      {(newsletter || brand || secondaryColumns.length > 0 || social) && (
        <div className="border-t border-(--stroke-neutral-4)">
          <div className="grid-wrapper grid-12 items-start gap-y-(--space-10) py-(--space-13)">
            {newsletter && (
              <div className="col-span-full flex flex-col gap-(--space-8) m:col-span-5">
                <Title level={3} as="p">{newsletter.title}</Title>
                <form className="flex flex-col gap-fx-3" onSubmit={(e) => e.preventDefault()}>
                  {newsletter.label && <label className="type-body-2 text-(--text-neutral-1)">{newsletter.label}</label>}
                  <div className="flex h-14 items-center border border-(--stroke-neutral-3) bg-(--bg-white)">
                    <input type="email" placeholder={newsletter.placeholder ?? 'Email'} className="type-input-s-text h-full flex-1 border-0 bg-transparent px-fx-4 text-(--form-default-text) outline-none" />
                    <button type="submit" aria-label="Suscribir" className="flex size-14 shrink-0 items-center justify-center bg-(--bg-neutral-3) text-(--text-always-white) cursor-pointer">
                      <Icon name="ArrowRight" size="s" />
                    </button>
                  </div>
                </form>
              </div>
            )}
            {brand && <div className="col-span-full flex justify-center text-(--text-base) m:col-span-3">{brand}</div>}
            {(secondaryColumns.length > 0 || social) && (
              <div className="col-span-full flex flex-col gap-(--space-8) m:col-span-4">
                {secondaryColumns.map((c, i) => <LinkColumn key={i} col={c} />)}
                {social && <div className="flex gap-fx-5 text-(--stroke-base)">{social}</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Barra inferior */}
      {(copyright || legal.length > 0 || language) && (
        <div className="border-t border-(--stroke-neutral-4)">
          <div className="grid-wrapper flex flex-wrap items-center justify-between gap-fx-4 py-fx-5">
            {copyright && <p className="type-body-2 m-0 text-(--text-neutral-1)">{copyright}</p>}
            {legal.length > 0 && (
              <ul className="flex flex-wrap gap-fx-8 m-0 p-0 list-none">
                {legal.map((l, i) => (
                  <li key={i}><a href={l.href ?? '#'} className="type-body-2 no-underline text-(--text-base) hover:text-(--text-hover)">{l.label}</a></li>
                ))}
              </ul>
            )}
            {language && (
              <button type="button" className="inline-flex items-center gap-fx-3 type-body-2 text-(--text-base) cursor-pointer">
                {language}<Icon name="CaretDown" size="xxs" />
              </button>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
