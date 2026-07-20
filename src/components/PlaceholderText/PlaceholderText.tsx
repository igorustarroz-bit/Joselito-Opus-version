import { cn } from '@/lib/cn';

export interface PlaceholderTextProps {
  /** Número de líneas. */
  lines?: number;
  /** Ancho de la última línea (para simular párrafo). */
  lastLineWidth?: string;
  className?: string;
}

/**
 * Placeholder-Text (UI14) — marcador de carga para bloques de texto (skeleton).
 * Usa tokens de fondo neutro; anímalo con utilidades de Tailwind si se desea.
 */
export function PlaceholderText({ lines = 3, lastLineWidth = '60%', className }: PlaceholderTextProps) {
  return (
    <div className={cn('flex w-full flex-col gap-fx-3', className)} aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <span
          key={i}
          className="block h-fx-4 rounded-xs bg-(--bg-neutral-2) animate-pulse"
          style={{ width: i === lines - 1 ? lastLineWidth : '100%' }}
        />
      ))}
    </div>
  );
}

export default PlaceholderText;
