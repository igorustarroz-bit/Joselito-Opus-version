/**
 * Registro de iconos — Joselito Design System.
 * Origen: Figma → Brand Assets → Icons (set Phosphor). viewBox 0 0 32 32.
 * El color se hereda con `currentColor` (recoloreable por token/CSS).
 *
 * Para añadir más iconos: exporta el SVG desde Figma, sustituye
 * `stroke="black"`/`fill="black"` por `currentColor` y añade su contenido aquí.
 */
export const ICON_VIEWBOX = '0 0 32 32';

export const icons = {
  ArrowRight:
    '<path d="M6 16H26M17.8182 24L26 16L17.8182 8" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  ArrowLeft:
    '<path d="M26 16H6M14.1818 24L6 16L14.1818 8" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  ArrowUp:
    '<path d="M16 26V6M24 14.1818L16 6L8 14.1818" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  ArrowDown:
    '<path d="M16 6V26M24 17.8182L16 26L8 17.8182" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  CaretDown:
    '<path d="M26 12L16 22L6 12" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  CaretRight:
    '<path d="M12 6L22 16L12 26" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  Check:
    '<path d="M5 18L12 25L28 9" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  X:
    '<path d="M25 7L7 25M25 25L7 7" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  Plus:
    '<path d="M6 16H26M16 6V26" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  Minus:
    '<path d="M5 16H27" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  MagnifyingGlass:
    '<path d="M21.0713 21.0713L28 28M24 14C24 19.5228 19.5228 24 14 24C8.47715 24 4 19.5228 4 14C4 8.47715 8.47715 4 14 4C19.5228 4 24 8.47715 24 14Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  Star:
    '<path d="M16.0002 23.6363L22.8402 27.8426C23.0177 27.9503 23.2231 28.003 23.4305 27.994C23.6379 27.985 23.838 27.9148 24.0055 27.7921C24.173 27.6694 24.3004 27.4999 24.3715 27.3048C24.4427 27.1098 24.4544 26.898 24.4052 26.6963L22.5452 18.8476L28.6327 13.5976C28.7879 13.4613 28.8998 13.2825 28.9546 13.0834C29.0094 12.8842 29.0046 12.6734 28.941 12.4769C28.8773 12.2804 28.7575 12.1069 28.5963 11.9777C28.4351 11.8485 28.2396 11.7694 28.034 11.7501L20.0452 11.1001L16.9677 3.65007C16.8893 3.45787 16.7553 3.29339 16.583 3.17761C16.4107 3.06183 16.2078 3 16.0002 3C15.7926 3 15.5897 3.06183 15.4174 3.17761C15.2451 3.29339 15.1112 3.45787 15.0327 3.65007L11.9552 11.1001L3.96647 11.7501C3.75943 11.7683 3.56233 11.847 3.39981 11.9766C3.23728 12.1061 3.11654 12.2807 3.05265 12.4785C2.98877 12.6763 2.98459 12.8885 3.04062 13.0886C3.09666 13.2888 3.21043 13.468 3.36772 13.6038L9.45522 18.8538L7.59522 26.6963C7.54605 26.898 7.55777 27.1098 7.62891 27.3048C7.70005 27.4999 7.82742 27.6694 7.99491 27.7921C8.1624 27.9148 8.3625 27.985 8.56991 27.994C8.77733 28.003 8.98275 27.9503 9.16022 27.8426L16.0002 23.6363Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  Play:
    '<path d="M9 4.98485V27.0148C9.00327 27.1906 9.05282 27.3625 9.14368 27.513C9.23453 27.6635 9.36347 27.7875 9.51749 27.8723C9.67152 27.9571 9.84518 27.9998 10.021 27.9961C10.1967 27.9923 10.3684 27.9423 10.5188 27.8511L28.5287 16.8361C28.6726 16.749 28.7916 16.6263 28.8741 16.4798C28.9567 16.3333 29.0001 16.168 29.0001 15.9998C29.0001 15.8317 28.9567 15.6664 28.8741 15.5199C28.7916 15.3734 28.6726 15.2507 28.5287 15.1636L10.5188 4.1486C10.3684 4.05736 10.1967 4.00736 10.021 4.00364C9.84518 3.99993 9.67152 4.04262 9.51749 4.12743C9.36347 4.21224 9.23453 4.33616 9.14368 4.48669C9.05282 4.63722 9.00327 4.80905 9 4.98485Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>',
  Info:
    '<path d="M15 15C15.2652 15 15.5196 15.1054 15.7071 15.2929C15.8946 15.4804 16 15.7348 16 16V21C16 21.2652 16.1054 21.5196 16.2929 21.7071C16.4804 21.8946 16.7348 22 17 22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.5 11.5C16.0523 11.5 16.5 11.0523 16.5 10.5C16.5 9.94772 16.0523 9.5 15.5 9.5C14.9477 9.5 14.5 9.94772 14.5 10.5C14.5 11.0523 14.9477 11.5 15.5 11.5Z" fill="currentColor"/><path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>',
} as const;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];
