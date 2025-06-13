import React from 'react';

/**
 * Props for the SearchIcon component.
 */
export type SearchIconProps = {
  /**
   * Optional custom CSS class name to apply to the SVG icon.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the SVG icon.
   */
  style?: React.CSSProperties;
};

/**
 * Renders a search (magnifying glass) icon.
 */
export const SearchIcon = ({
  className,
  style,
}: SearchIconProps): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
    width="1em"
    height="1em"
    aria-hidden="true" // Icon is decorative
    focusable="false" // Icon is not focusable
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);