import React from 'react';
import type { IconProps } from './icon-props-type.js';

/**
 * MoonIcon component, typically used to represent dark mode or night.
 * It renders an SVG moon symbol.
 */
export const MoonIcon = ({
  size = 24,
  className,
  stroke = "currentColor",
  strokeWidth = "2",
  fill = "none",
  style,
  ...rest
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);