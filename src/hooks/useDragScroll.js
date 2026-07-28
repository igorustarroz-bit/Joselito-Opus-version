import { useEffect, useRef } from 'react';

/**
 * useDragScroll — arrastrar con el ratón un contenedor con scroll horizontal.
 *
 * Devuelve una `ref` que se asigna al track (el elemento con `overflow-x: auto`).
 * - Solo intercepta el **ratón** (`pointerType === 'mouse'`); en táctil/lápiz se deja el
 *   scroll nativo (que ya respeta el scroll-snap del sistema).
 * - Mientras se arrastra, pausa `scroll-snap-type` para un desplazamiento libre y lo
 *   restaura al soltar, de modo que el track "cae" (snap) a la slide más cercana.
 * - Si hubo arrastre real, cancela el `click` siguiente (para no navegar al soltar sobre
 *   una card enlazada).
 * - Añade la clase `is-dragging` al track (para `cursor: grabbing` y desactivar selección).
 */
export default function useDragScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let isDown = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    const onPointerDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      isDown = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      try { el.setPointerCapture(e.pointerId); } catch { /* noop */ }
      el.classList.add('is-dragging');
      el.style.scrollSnapType = 'none';
    };

    const onPointerMove = (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };

    const onPointerUp = (e) => {
      if (!isDown) return;
      isDown = false;
      try { el.releasePointerCapture(e.pointerId); } catch { /* noop */ }
      el.classList.remove('is-dragging');
      el.style.scrollSnapType = ''; // restaura el snap → cae a la slide más cercana
    };

    // Evita que el arrastre dispare el click de una card enlazada.
    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);
    el.addEventListener('click', onClickCapture, true);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      el.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return ref;
}
