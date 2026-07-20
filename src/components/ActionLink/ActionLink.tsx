import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ActionLinkSize = 'l' | 'm' | 's';
const TYPE_CLASS: Record<ActionLinkSize, string> = { l: 'type-cta-l', m: 'type-cta-m', s: 'type-cta-s' };

export interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: ActionLinkSize;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
}

/**
 * Button-Action-Link (UI04) — enlace de acción con subrayado. Color desde
 * tokens semánticos de texto (default/hover/disabled), adaptable por tema.
 */
export function ActionLink({ size = 'm', iconLeft, iconRight, disabled, className, children, href, ...props }: ActionLinkProps) {
  return (
    <a
      href={disabled ? undefined : href}
      aria-disabled={disabled || undefined}
      className={cn(
        'inline-flex items-center gap-fx-2 uppercase underline underline-offset-4 cursor-pointer',
        'text-(--text-base) hover:text-(--text-hover) focus-visible:text-(--text-hover) outline-none',
        disabled && 'text-(--text-disabled) no-underline pointer-events-none cursor-not-allowed',
        TYPE_CLASS[size],
        className,
      )}
      {...props}
    >
      {iconLeft && <span className="inline-flex shrink-0" aria-hidden>{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex shrink-0" aria-hidden>{iconRight}</span>}
    </a>
  );
}

export default ActionLink;
