import './PlaceholderText.css';

/** Texto genérico Body/02 (Texts/Base) que ocupa el ancho del contenedor; Figma lo usa como relleno en slots. */
export default function PlaceholderText({ text = 'Text', children, as: Tag = 'p', theme, className = '', ...rest }) {
  return <Tag className={['placeholder-text', 'ts-body-02', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>{children ?? text}</Tag>;
}
