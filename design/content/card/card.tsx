import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './card.module.scss';

/**
 * Props for the Card component.
 * Defines the available properties to customize the card's appearance and content.
 */
export type CardProps = {
  /**
   * The main content of the card. This can be any valid React node,
   * allowing for flexible composition of text, components, or other elements.
   */
  children?: ReactNode;
  /**
   * Optional title for the card. Displayed prominently within the card's body section.
   * If provided, it will be rendered as an `<h3>` element.
   */
  title?: string;
  /**
   * Specifies the visual style (variant) of the card.
   * - 'primary': Standard card with a primary surface background, typically used for main content blocks.
   * - 'secondary': Card with a secondary surface background, often used for less emphasized content or auxiliary information.
   * - 'ghost': Card with a transparent background and minimal styling, suitable for subtle emphasis or blending into the page.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost';
  /**
   * Optional content to be displayed in the header section of the card.
   * This can be any valid React node, suitable for titles, actions, or metadata.
   */
  header?: ReactNode;
  /**
   * Optional content to be displayed in the footer section of the card.
   * This can be any valid React node, typically used for supplementary actions, links, or information.
   */
  footer?: ReactNode;
  /**
   * Optional URL for an image to be displayed at the top of the card.
   * The image will span the full width of the card.
   */
  image?: string;
  /**
   * Alternative text for the image, crucial for accessibility.
   * If an `image` is provided and `imageAlt` is not, the component will attempt to use the `title` prop as alt text.
   * If `title` is also unavailable, a generic fallback alt text ("Card visual content") will be used.
   */
  imageAlt?: string;
  /**
   * If true, the card will exhibit interactive behaviors on hover, such as scaling and shadow changes.
   * This is useful for cards that represent clickable items or links.
   * @default false
   */
  interactive?: boolean;
  /**
   * Optional custom CSS class name to apply to the card's root element.
   * This allows for further styling and customization via external CSS.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the card's root element.
   * While available, it's generally recommended to use `className` and SCSS modules for styling to maintain consistency and separation of concerns.
   */
  style?: React.CSSProperties;
};

const DEFAULT_VARIANT = 'primary';
const DEFAULT_INTERACTIVE = false;

/**
 * Card is a versatile and visually engaging component designed to serve as a flexible
 * container for various types of content. It supports optional header and footer sections,
 * an image display, different visual variants, and interactive states, making it suitable
 * for a wide range of UI applications such as product displays, articles summaries, or user profiles.
 */
export function Card({
  children,
  title,
  variant = DEFAULT_VARIANT,
  header,
  footer,
  image,
  imageAlt,
  interactive = DEFAULT_INTERACTIVE,
  className,
  style,
}: CardProps): React.JSX.Element {
  const cardClasses = classNames(
    styles.card,
    styles[variant],
    { [styles.interactive]: interactive },
    className
  );

  const effectiveImageAlt = image ? (imageAlt || title || 'Card visual content') : undefined;

  return (
    <article className={cardClasses} style={style}>
      {image && effectiveImageAlt ? (
        <div className={styles.cardImageContainer}>
          <img src={image} alt={effectiveImageAlt} className={styles.cardImage} />
        </div>
      ) : null}
      {header ? <header className={styles.cardHeader}>{header}</header> : null}
      <div className={styles.cardBody}>
        {title ? <h3 className={styles.cardTitle}>{title}</h3> : null}
        {children}
      </div>
      {footer ? <footer className={styles.cardFooter}>{footer}</footer> : null}
    </article>
  );
}