import { useEffect } from 'react';
import './Overlay.css';

/**
 * Capa oscura a pantalla completa bajo modales y menús (Backgrounds/Overlay). Con `onClose`, un clic
 * en la capa o Esc la cierran. `fixed=false` la pinta dentro de su contenedor (documentación).
 */
export default function Overlay({ open = true, onClose, fixed = true, children, theme, className = '', ...rest }) {
  useEffect(() => {
    if (!open || !onClose) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className={['overlay', fixed ? 'overlay--fixed' : '', className].filter(Boolean).join(' ')} data-theme={theme}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }} {...rest}>
      {children}
    </div>
  );
}
