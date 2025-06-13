import React from 'react';

/**
 * DefaultLogoProps are the standard SVG element attributes.
 * The component expects `width` and `height` to be passed by its parent.
 */
type DefaultLogoProps = {
  width?: number|string;
  height?: number|string;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

/**
 * DefaultLogo is the Product Hunt styled logo displayed by default.
 * It's a stylized 'P' resembling a cat, rendered in Product Hunt's brand orange.
 */
export const DefaultLogo: React.FC<DefaultLogoProps> = ({ width, height, className, ...rest }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 48 48" // Using a 48x48 viewBox for the design
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true" // Decorative, as Link provides aria-label
    {...rest}
  >
    {/* Background shape - rounded rectangle */}
    <rect width="48" height="48" rx="12" fill="#DA552F"/> {/* Product Hunt Orange */}
    {/* Stylized 'P' shape */}
    <path
      d="M17 14H25.5C29.0899 14 32 16.9101 32 20.5C32 24.0899 29.0899 27 25.5 27H21V34H17V14ZM21 23H25.5C26.8807 23 28 21.8807 28 20.5C28 19.1193 26.8807 18 25.5 18H21V23Z"
      fill="white" // White 'P' on orange background
    />
  </svg>
);
