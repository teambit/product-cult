import React from 'react';
import classNames from 'classnames';
import styles from './heading.module.scss';

/**
 * Defines the possible semantic and visual levels for a heading.
 * Represents h1 through h6.
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Props for the Heading component.
 */
export type HeadingProps = {
  /**
   * The content to be displayed within the heading.
   * This can be any valid React node, such as text or other elements.
   */
  children: React.ReactNode;

  /**
   * The semantic heading level (e.g., 1 for <h1>, 2 for <h2>).
   * This determines the HTML tag used for the heading, which is important for SEO and accessibility.
   */
  level: HeadingLevel;

  /**
   * The visual styling level for the heading.
   * If not provided, it defaults to the semantic `level`.
   * This allows decoupling the semantic structure (e.g., an <h2>) from its visual presentation (e.g., styled like an <h4>).
   */
  visualLevel?: HeadingLevel;

  /**
   * Optional custom CSS class name to apply to the root heading element.
   * This allows for additional styling or overrides.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root heading element.
   * Use sparingly; prefer `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};

/**
 * Renders a semantic heading element (h1-h6) with consistent styling.
 * It allows decoupling of semantic level from visual presentation.
 */
export function Heading({
  children,
  level,
  visualLevel: visualLevelProp,
  className,
  style,
}: HeadingProps): React.JSX.Element {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const actualVisualLevel = visualLevelProp ?? level;

  const headingClasses = classNames(
    styles.headingBase,
    styles[`h${actualVisualLevel}`],
    className
  );

  return (
    <Tag className={headingClasses} style={style}>
      {children}
    </Tag>
  );
}