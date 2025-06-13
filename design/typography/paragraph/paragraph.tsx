import React from 'react';
import classNames from 'classnames';
import styles from './paragraph.module.scss';

/**
 * Defines the properties for the Paragraph component.
 */
export type ParagraphProps = {
  /**
   * The HTML element to render as the paragraph.
   * This allows for semantic flexibility (e.g., 'p', 'span', 'div').
   * Defaults to 'p'.
   */
  element?: keyof React.JSX.IntrinsicElements;

  /**
   * The content to be displayed within the paragraph.
   * Can be a string, number, or any valid React node.
   */
  children: React.ReactNode;

  /**
   * Optional CSS class name(s) to apply to the paragraph element.
   * Useful for custom styling or extending component styles.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the paragraph element.
   * Prefer using `className` and SCSS modules for styling; use `style` for dynamic or highly specific cases.
   */
  style?: React.CSSProperties;
};

/**
 * Paragraph is a versatile and accessible component for rendering text content.
 * It prioritizes readability and consistent typography using theme variables.
 * It can render as different HTML elements for semantic correctness.
 */
export function Paragraph({
  element: Component = 'p',
  children,
  className,
  style,
}: ParagraphProps): React.JSX.Element {
  return (
    <Component
      className={classNames(styles.paragraph, className)}
      style={style}
    >
      {children}
    </Component>
  );
}