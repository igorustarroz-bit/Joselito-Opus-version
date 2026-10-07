import { useEffect, useId, useState } from 'react';
import Button from '../../components/Button/Button';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import ListboxItem from '../../components/ListboxItem/ListboxItem';
import Overlay from '../../components/Overlay/Overlay';
import Tag from '../../components/Tag/Tag';
import './M05FilterSecondaryMenu.css';

export const STATUSES = ['Default', 'Desplegado'];
const OPTIONS = ['50€ - 100€', '100€ - 200€', '200€ - 500 €', '500€ - 1000 €', '+ 2000€'];

/** Panel de filtro (Status=Desplegado): título, cierre, opciones con radio y pie con Borrar/Aplicar. */
export function M05FilterPanel({ title = 'Filtrar precio', options = OPTIONS, value, defaultValue = null, onChange, onApply, onClear, onClose,
  className = '', ...rest }) {
  const name = useId();
  const [inner, setInner] = useState(defaultValue);
  const current = value !== undefined ? value : inner;
  const set = (v) => { if (value === undefined) setInner(v); onChange?.(v); };
  const has = current !== null && current !== undefined;
  return (
    <div className={['m05-panel', className].filter(Boolean).join(' ')} role="dialog" aria-label={title} {...rest}>
      <div className="m05-panel__head">
        <span className="m05-panel__title ts-body-03">{title}</span>
        <ButtonIcon type="Terciary" size="XS" icon="arrow-right" label="Cerrar filtro" onClick={onClose} />
      </div>
      <div className="m05-panel__list" role="radiogroup" aria-label={title}>
        {options.map((o) => (
          <ListboxItem key={o} text={o} name={name} value={o} checked={current === o} onChange={() => set(o)} />
        ))}
      </div>
      <div className={['m05-panel__footer', has ? 'has-value' : ''].filter(Boolean).join(' ')}>
        {has && <Button type="Secondary" size="S" text="BORRAR" onClick={() => { set(null); onClear?.(); }} />}
        <Button type="Primary" size="S" text="APLICAR" disabled={!has} onClick={() => onApply?.(current)} />
      </div>
    </div>
  );
}

/**
 * Barra de filtros de un listado: número de productos, filtros aplicados (Tag XS con X) y Borrar,
 * y los accesos Filtrar y Ordenar (en color de enlace cuando hay filtros). Filtrar abre el panel como
 * cajón lateral. `status="Desplegado"` muestra solo el panel, como la variante de Figma.
 */
export default function M05FilterSecondaryMenu({
  status = 'Default', count = 84, countLabel = 'productos', applied, defaultApplied = [], onAppliedChange,
  title, options = OPTIONS, onSort, theme, className = '', ...rest
}) {
  const [innerApplied, setInnerApplied] = useState(defaultApplied);
  const list = applied ?? innerApplied;
  const setList = (l) => { if (applied === undefined) setInnerApplied(l); onAppliedChange?.(l); };
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return undefined; const p = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = p; }; }, [open]);

  if (status === 'Desplegado') {
    return <M05FilterPanel className={className} title={title} options={options} defaultValue={list[0] ?? null}
      data-theme={theme} onApply={(v) => setList([v])} onClear={() => setList([])} {...rest} />;
  }
  const active = list.length > 0;
  return (
    <div className={['m05-filter', active ? 'has-filters' : '', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      <div className="m05-filter__left">
        <span className="m05-filter__count ts-body-03">{count} {countLabel}</span>
        {active && (
          <div className="m05-filter__applied">
            <ul className="m05-filter__tags">
              {list.map((f) => <li key={f}><Tag type="Aseptic" size="XS" text={f} removable onRemove={() => setList(list.filter((x) => x !== f))} /></li>)}
            </ul>
            <ButtonActionLink size="S" text="BORRAR" onClick={() => setList([])} />
          </div>
        )}
      </div>
      <div className="m05-filter__actions">
        <button type="button" className="m05-filter__action ts-body-03" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>Filtrar</button>
        <button type="button" className="m05-filter__action ts-body-03" onClick={onSort}>Ordenar</button>
      </div>
      {open && (
        <>
          <Overlay onClose={() => setOpen(false)} onClick={() => setOpen(false)} />
          <M05FilterPanel className="m05-filter__drawer" title={title} options={options} defaultValue={list[0] ?? null}
            onClose={() => setOpen(false)} onApply={(v) => { setList([v]); setOpen(false); }} onClear={() => setList([])} />
        </>
      )}
    </div>
  );
}
