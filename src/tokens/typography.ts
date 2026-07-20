/**
 * Estilos de texto — fuente para documentación (Storybook).
 * Generado desde src/styles/tokens/typography.css (no editar a mano).
 * Origen: Figma → Responsive/Typography. Aplica con la clase indicada.
 */
export interface TypeGroup { group: string; classes: string[]; }
export const typeGroups: TypeGroup[] = [
  {
    "group": "Títulos",
    "classes": [
      "type-title-8",
      "type-title-7",
      "type-title-6",
      "type-title-5",
      "type-title-4",
      "type-title-3",
      "type-title-2",
      "type-title-1"
    ]
  },
  {
    "group": "Body",
    "classes": [
      "type-body-6",
      "type-body-5",
      "type-body-4",
      "type-body-3",
      "type-body-2",
      "type-body-1"
    ]
  },
  {
    "group": "Labels",
    "classes": [
      "type-label-2",
      "type-label-1"
    ]
  },
  {
    "group": "CTA",
    "classes": [
      "type-cta-xl",
      "type-cta-l",
      "type-cta-m",
      "type-cta-s",
      "type-cta-xs"
    ]
  },
  {
    "group": "Inputs",
    "classes": [
      "type-input-m-text",
      "type-input-m-label-in",
      "type-input-m-label-out",
      "type-input-m-message",
      "type-input-s-text",
      "type-input-s-label-in",
      "type-input-s-label-out",
      "type-input-s-message"
    ]
  }
];

export const fontFamilies = [
  { token: '--font-title', label: 'Título', value: 'SangBleu' },
  { token: '--font-body', label: 'Body / Label / CTA / Forms', value: 'Euclid Circular B' },
];

export const trackings = [
  { token: '--tracking-title', value: '-1.5px' },
  { token: '--tracking-body', value: '0' },
  { token: '--tracking-label', value: '0' },
  { token: '--tracking-cta', value: '0.5px' },
  { token: '--tracking-forms', value: '0' },
];
