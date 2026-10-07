import { useEffect, useId, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import ButtonActionLink from '../../components/ButtonActionLink/ButtonActionLink';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import './M26Buscador.css';

export const STATUSES = ['Default', 'Typing', 'Filled'];

/**
 * Panel de búsqueda: cierre arriba, campo grande (Title/04) con "BORRAR" cuando tiene texto y búsquedas
 * recientes pulsables. En escritorio un botón borra el historial; en móvil una flecha lanza la búsqueda.
 * `status` fuerza el estado de Figma (Typing muestra el cursor; Filled, texto completo).
 */
export default function M26Buscador({
  status, value, defaultValue = '', onChange, onSearch, onClose, placeholder = 'Buscar', showRecent = true,
  recent: recentProp, defaultRecent = ['JAMÓN', 'LONCHEADO', 'EMBUTIDO'], onRecentChange, recentLabel = 'Búsquedas recientes',
  autoFocus = false, theme, className = '', ...rest
}) {
  const id = useId();
  const forced = status === 'Typing' ? 'Embutid' : status === 'Filled' ? 'Jamón' : undefined;
  const [inner, setInner] = useState(defaultValue);
  const text = value ?? forced ?? inner;
  const set = (v) => { if (value === undefined && forced === undefined) setInner(v); onChange?.(v); };
  const [innerRecent, setInnerRecent] = useState(defaultRecent);
  const recent = recentProp ?? innerRecent;
  const setRecent = (l) => { if (recentProp === undefined) setInnerRecent(l); onRecentChange?.(l); };
  const input = useRef(null);
  useEffect(() => { if (autoFocus) input.current?.focus(); }, [autoFocus]);
  const submit = (q = text) => { if (q.trim()) onSearch?.(q.trim()); };
  return (
    <div className={['m26-search', status === 'Typing' ? 'is-typing' : '', className].filter(Boolean).join(' ')} role="search" data-theme={theme} {...rest}>
      <div className="m26-search__top">
        <ButtonIcon type="Terciary" size="XS" icon="x" label="Cerrar búsqueda" onClick={onClose} />
      </div>
      <form className="m26-search__field" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <label className="m26-search__sr" htmlFor={`${id}-q`}>{placeholder}</label>
        <input id={`${id}-q`} ref={input} className="m26-search__input ts-title-04" type="search" value={text} placeholder={placeholder}
          autoComplete="off" onChange={(e) => set(e.target.value)} />
        {text && <ButtonActionLink size="M" text="BORRAR" onClick={() => { set(''); input.current?.focus(); }} />}
      </form>
      {showRecent && (
        <div className="m26-search__recent">
          <div className="m26-search__list">
            <span className="m26-search__label ts-labels-01">{recentLabel}</span>
            {recent.map((r) => <ButtonActionLink key={r} size="M" text={r} onClick={() => { set(r); submit(r); }} />)}
          </div>
          <Button className="m26-search__clear" type="Terciary" size="XS" text="BORRAR" onClick={() => setRecent([])} />
          <ButtonIcon className="m26-search__go" type="Terciary" size="XS" icon="arrow-right" label="Buscar" onClick={() => submit()} />
        </div>
      )}
    </div>
  );
}
