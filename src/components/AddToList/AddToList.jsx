import { useState } from 'react';
import ButtonActionLink from '../ButtonActionLink/ButtonActionLink';
import './AddToList.css';

/**
 * Añadir a la lista de deseos. Sin añadir: enlace "AÑADIR A LA LISTA DE DESEOS". Añadido: texto de
 * confirmación (Labels/01) + enlace "quitar". Controlado (`added` + `onChange`) o no (`defaultAdded`).
 */
export default function AddToList({
  added, defaultAdded = false, onChange, addText = 'AÑADIR A LA LISTA DE DESEOS', addedText = 'AÑADIDO A LA LISTA DE DESEOS',
  removeText = 'quitar', theme, className = '', ...rest
}) {
  const [inner, setInner] = useState(defaultAdded);
  const isAdded = added ?? inner;
  const set = (v) => { if (added === undefined) setInner(v); onChange?.(v); };
  return (
    <div className={['add-to-list', className].filter(Boolean).join(' ')} aria-live="polite" data-theme={theme} {...rest}>
      {isAdded ? (
        <>
          <span className="add-to-list__text ts-labels-01">{addedText}</span>
          <ButtonActionLink size="M" text={removeText} onClick={() => set(false)} />
        </>
      ) : (
        <ButtonActionLink size="M" text={addText} onClick={() => set(true)} />
      )}
    </div>
  );
}
