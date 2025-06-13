import type React from 'react';

/**
 * Defines the common properties accepted by icon components used within the ThemeToggler.
 * This allows for consistent styling and sizing of custom icons if provided.
 */
export type IconProps = {
  /**
   * The size of the icon. This will be applied to both width and height.
   * Can be a number (interpreted as pixels) or a string (e.g., '2em', '24px').
   * @default 24 (or as specified by the consuming component like ThemeToggler)
   */
  size?: string | number;
  /**
   * Optional CSS class name to apply to the root SVG element of the icon.
   * This allows for custom styling via CSS.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root SVG element of the icon.
   * While available, using `className` for styling is generally preferred.
   */
  style?: React.CSSProperties;
  /**
   * The fill color of the SVG icon.
   * @default "none" (for outline icons)
   */
  fill?: string;
  /**
   * The stroke color of the SVG icon.
   * @default "currentColor" (inherits text color)
   */
  stroke?: string;
  /**
   * The stroke width of the SVG icon.
   * @default "2"
   */
  strokeWidth?: string | number;
} & Omit<React.SVGAttributes<SVGSVGElement>, 'fill' | 'stroke' | 'strokeWidth'>;