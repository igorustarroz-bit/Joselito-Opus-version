import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';
import type { ThemeName } from '@/modules/SectionHero';

export interface ArchiveRow { cells: ReactNode[]; href?: string; }

export interface ListArchiveTableProps {
  columns: ReactNode[];
  rows: ArchiveRow[];
  /** Muestra icono de descarga/enlace al final de cada fila. */
  action?: 'download' | 'link' | 'none';
  theme?: ThemeName;
  className?: string;
}

/**
 * Módulo List / Archive table — tabla de archivo (documentos, añadas…) con
 * cabecera, filas enlazables y acción opcional (descarga/enlace).
 */
export function ListArchiveTable({ columns, rows, action = 'download', theme = 'light-white', className }: ListArchiveTableProps) {
  const actionIcon = action === 'download' ? 'ArrowLineDown' : 'ArrowSquareOut';
  return (
    <section data-theme={theme} className={cn('w-full bg-(--bg-base) text-(--text-base)', className)}>
      <div className="grid-wrapper py-(--space-12)">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-(--stroke-base)">
              {columns.map((c, i) => (
                <th key={i} className="type-label-2 uppercase pb-fx-3 pr-fx-4 text-(--text-neutral-1) font-normal">{c}</th>
              ))}
              {action !== 'none' && <th className="pb-fx-3" aria-hidden />}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className="border-b border-(--stroke-neutral-3) hover:bg-(--bg-neutral-1)">
                {r.cells.map((cell, ci) => (
                  <td key={ci} className="type-body-3 py-fx-4 pr-fx-4 align-middle">
                    {ci === 0 && r.href ? <a href={r.href} className="text-(--text-base) no-underline hover:text-(--text-hover)">{cell}</a> : cell}
                  </td>
                ))}
                {action !== 'none' && (
                  <td className="py-fx-4 text-right align-middle">
                    <a href={r.href ?? '#'} aria-label={action === 'download' ? 'Descargar' : 'Abrir'} className="inline-flex text-(--stroke-base) hover:text-(--text-hover)">
                      <Icon name={actionIcon} size="s" />
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ListArchiveTable;
