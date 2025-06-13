import React from 'react';
import classNames from 'classnames';
import styles from './icon.module.scss';

/**
 * Props for the generic Icon component.
 * This component serves as a base wrapper for rendering SVG icons.
 */
export type IconProps = {
  /**
   * The SVG content (e.g., <path>, <circle>) to render inside the icon.
   * Typically provided by specific icon components that use this generic wrapper.
   */
  children?: React.ReactNode;

  /**
   * The size (width and height) of the icon in pixels.
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
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;

  /**
   * Additional CSS class name(s) to apply to the root SVG element.
   */
  className?: string;

  /**
   * Inline styles to apply to the root SVG element.
   */
  style?: React.CSSProperties;

  /**
   * The viewBox attribute for the SVG element. Defines the position and dimension,
   * in user space, of an SVG viewport.
   * It's recommended that specific icon components provide their own appropriate viewBox.
   * @default '0 0 24 24'
   */
  viewBox?: string;

  /**
   * A descriptive title for the icon, used for accessibility.
   * If provided, an SVG <title> element will be rendered, and relevant ARIA attributes set.
   * If not provided, the icon is treated as decorative (`aria-hidden="true"`).
   */
  title?: string;
} & Omit<
  React.SVGProps<SVGSVGElement>,
  'width' | 'height' | 'onClick' | 'className' | 'style' | 'color' | 'children' | 'title'
>;

/**
 * A generic Icon component for creating consistent SVG icons.
 * It handles common properties like size, color, and accessibility.
 * Specific icon components should use this as a base, providing their SVG paths as children.
 * @param props The properties for the Icon component.
 */
export function Icon({
  children,
  size = 24,
  color = 'currentColor',
  className,
  style,
  onClick,
  viewBox = '0 0 24 24',
  title,
  ...restSvgProps
}: IconProps): React.JSX.Element {
  const svgStyle: React.CSSProperties = {
    ...style,
  };

  const accessibilityProps = title
    ? { 'aria-label': title, role: 'img' as React.AriaRole }
    : { 'aria-hidden': true as boolean, focusable: false as boolean };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill={color}
      className={classNames(styles.icon, className)}
      style={svgStyle}
      onClick={onClick}
      {...accessibilityProps}
      {...restSvgProps}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}