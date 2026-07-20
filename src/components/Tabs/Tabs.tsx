import { useState, useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import './tabs.css';

export type TabsType = 'primary' | 'secondary';
export interface TabItem { id: string; label: ReactNode; content?: ReactNode; disabled?: boolean; }

export interface TabsProps {
  items: TabItem[];
  type?: TabsType;
  /** Id activo por defecto (no controlado). */
  defaultActive?: string;
  className?: string;
}

/**
 * Tabs (UI05) — navegación por pestañas (Primary/Secondary). Colores desde
 * tokens Button/Tab por estado y tema. Accesible (role tablist/tab/tabpanel).
 */
export function Tabs({ items, type = 'primary', defaultActive, className }: TabsProps) {
  const [active, setActive] = useState(defaultActive ?? items[0]?.id);
  const baseId = useId();
  const activeItem = items.find((i) => i.id === active);

  return (
    <div className={className}>
      <div role="tablist" className="tabs">
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`${baseId}-${item.id}-tab`}
              aria-selected={selected}
              aria-controls={`${baseId}-${item.id}-panel`}
              disabled={item.disabled}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              className={cn('tab', 'tab--' + type, 'type-cta-s')}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem?.content !== undefined && (
        <div
          role="tabpanel"
          id={`${baseId}-${active}-panel`}
          aria-labelledby={`${baseId}-${active}-tab`}
          className="type-body-3 pt-fx-4 text-(--text-base)"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}

export default Tabs;
