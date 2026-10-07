import Button from '../Button/Button';
import './RowButtons.css';

/**
 * Pareja (o grupo) de botones. Horizontal: botones a su ancho con separación FX-4. Vertical: botones
 * a ancho completo apilados con separación FX-2. Por defecto, Primary M + Secondary M como en Figma.
 */
export default function RowButtons({ vertical = false, children, primaryText = 'Button', secondaryText = 'Button', theme, className = '', ...rest }) {
  return (
    <div className={['row-buttons', vertical ? 'row-buttons--vertical' : '', className].filter(Boolean).join(' ')} data-theme={theme} {...rest}>
      {children ?? (
        <>
          <Button type="Primary" size="M" text={primaryText} />
          <Button type="Secondary" size="M" text={secondaryText} />
        </>
      )}
    </div>
  );
}
