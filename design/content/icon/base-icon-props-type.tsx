import type React from 'react';

/**
 * Base properties for individual, semantic icon components (e.g., SearchIcon, UserIcon).
 * These components would typically use the generic `Icon` component internally.
 */
export type BaseIconProps = {
  /**
   * The size of the icon (width and height).
   * If not provided, the icon may use a default size (e.g., 24px) or inherit from the generic Icon component's default.
   */
  size?: number | string;

  /**
   * Additional CSS class name(s) to apply to the icon's root SVG element.
   */
  className?: string;

  /**
   * The color of the icon. This typically maps to the SVG 'fill' or 'stroke' attribute.
   * Defaults to 'currentColor' to inherit color from the surrounding text, if not overridden by the specific icon or the generic Icon component.
   * @default 'currentColor'
   */
  color?: string;

  /**
   * Optional click event handler for the icon.
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;

  /**
   * Inline styles to apply to the icon's root SVG element.
   */
  style?: React.CSSProperties;

  /**
   * A descriptive title for the icon, used for accessibility.
   * If provided, makes the icon non-decorative by rendering an SVG <title> element
   * and setting appropriate ARIA attributes via the generic Icon component.
   */
  title?: string;
};