import React from 'react';
import styles from './spinner.module.scss';

/**
 * Defines the available sizes for the Spinner component.
 */
export type SpinnerSize = 'small' | 'medium' | 'large' | 'x-large';

/**
 * Props for the Spinner component.
 */
export type SpinnerProps = {
  /**
   * The size of the spinner.
   * @default 'medium'
   */
  size?: SpinnerSize;

  /**
   * The color of the spinner. Can be any valid CSS color string or a CSS variable.
   * If not provided, it defaults to the theme's primary color (`--colors-primary-default`) via CSS.
   */
  color?: string;

  /**
   * The thickness of the spinner's border in pixels.
   * @default 3
   */
  thickness?: number;

  /**
   * Optional custom CSS class name to apply to the spinner's root element.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the spinner's root element.
   * Prefer using `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;

  /**
   * Aria-label for accessibility. Defaults to "Loading...".
   * @default 'Loading...'
   */
  ariaLabel?: string;
};

/**
 * A visually appealing and subtle spinner component for indicating loading states.
 * It features a circular design with customizable size, color, and thickness.
 */
export function Spinner({
  size = 'medium',
  thickness = 3,
  color,
  className,
  style,
  ariaLabel = 'Loading...',
}: SpinnerProps): React.JSX.Element {
  const spinnerStyle: React.CSSProperties = {
    borderWidth: `${thickness}px`,
    ...style, // Allows user style to override borderWidth if necessary
  };

  if (color) {
    // Sets the color for the visible parts of the border, keeping one side transparent for the spinning effect.
    spinnerStyle.borderColor = `${color} ${color} ${color} transparent`;
  }

  const combinedClassName = [
    styles.spinner,
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={combinedClassName}
      style={spinnerStyle}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    />
  );
}