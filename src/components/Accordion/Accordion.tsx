import { useState, useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/Icon';

export interface AccordionItemData {
  /** Identificador único del item. */
  id: string;
  /** Título visible en la cabecera. */
  title: ReactNode;
  /** Contenido que se muestra al abrir. */
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  /** Permitir varios items abiertos a la vez. */
  multiple?: boolean;
  /** Ids abiertos por defecto (no controlado). */
  defaultOpen?: string[];
  className?: string;
}

/**
 * Accordion (UI13) — lista de secciones plegables. Colores desde tokens
 * semánticos; el icono (Caret) gira al abrir. Accesible con `<button>` +
 * `aria-expanded`/`aria-controls`.
 */
export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const baseId = useId();

  const toggle = (id: string) => {
    setOpen((cur) => {
      const isOpen = cur.includes(id);
      if (multiple) return isOpen ? cur.filter((x) => x !== id) : [...cur, id];
      return isOpen ? [] : [id];
    });
  };

  return (
    <div className={cn('w-full', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        const btnId = `${baseId}-${item.id}-btn`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className="border-b border-(--stroke-neutral-3)">
            <h3 className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="type-title-1 flex w-full items-center justify-between gap-fx-4 py-fx-5 text-left text-(--text-base) cursor-pointer"
              >
                <span>{item.title}</span>
                <Icon
                  name="CaretDown"
                  size="s"
                  className={cn('transition-transform duration-200 text-(--stroke-base)', isOpen && 'rotate-180')}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="type-body-3 pb-fx-5 text-(--text-neutral-1)"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
