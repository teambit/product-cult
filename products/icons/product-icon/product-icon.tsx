import React from 'react';
import classNames from 'classnames';
import { Icon } from '@infinity/design.content.icon';
import styles from './product-icon.module.scss';

/**
 * Props for the ProductIcon component.
 * Defines the properties accepted by the ProductIcon.
 */
export type ProductIconProps = {
  /**
   * The size (width and height) of the icon in pixels or any valid CSS size string.
   * @default 24
   */
  size?: number | string;
  /**
   * The fill color of the icon.
   * Defaults to 'currentColor', which inherits the color from the parent HTML element's text color.
   * @default 'currentColor'
   */
  color?: string;
  /**
   * Optional click event handler for the icon.
   * Triggered when the icon is clicked.
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /**
   * Additional CSS class name(s) to apply to the root SVG element of the icon.
   * Allows for custom styling.
   */
  className?: string;
  /**
   * Inline styles to apply to the root SVG element of the icon.
   * Use sparingly; prefer `className` for styling.
   */
  style?: React.CSSProperties;
  /**
   * A descriptive title for the icon, used for accessibility purposes.
   * If provided, an SVG <title> element will be rendered, making the icon non-decorative.
   * @default 'Product Icon'
   */
  title?: string;
};

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = `currentColor`;
const DEFAULT_TITLE = `Product Icon`;

/**
 * ProductIcon displays a standard icon representing a product.
 * It leverages the base Icon component for rendering the SVG, providing a specific product-related visual.
 * This component is designed to be easily integrated and customized through props.
 */
export function ProductIcon({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  className,
  style,
  onClick,
  title = DEFAULT_TITLE,
}: ProductIconProps): React.JSX.Element {
  // This SVG path is based on Material Design's "Inventory" or "Archive" icon,
  // which is visually suitable for representing a generic product or package.
  // It's designed as a filled path, working well with the `Icon` component's `color` prop (which controls fill).
  const productSvgPath = (
    <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z" />
  );

  return (
    <Icon
      size={size}
      color={color}
      className={classNames(styles.productIcon, className)}
      style={style}
      onClick={onClick}
      title={title}
      viewBox="0 0 24 24" // Standard viewBox for Material Design icons, fitting the chosen path.
    >
      {productSvgPath}
    </Icon>
  );
}