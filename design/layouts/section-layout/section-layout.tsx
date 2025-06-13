import React from 'react';
import classNames from 'classnames';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import styles from './section-layout.module.scss';

export type SectionLayoutProps = {
  /**
   * Optional title for the section.
   * If a string is provided, it's rendered as an H2 heading.
   * Alternatively, a custom ReactNode can be passed for full control over the title's appearance.
   */
  title?: React.ReactNode;

  /**
   * Optional caption, usually displayed above the title for thematic context.
   * If a string is provided, it's rendered as a styled paragraph.
   * A custom ReactNode can also be used.
   */
  caption?: React.ReactNode;

  /**
   * Optional subtitle, displayed below the title to provide additional detail.
   * If a string is provided, it's rendered as a styled paragraph.
   * A custom ReactNode can be used for more complex subtitles.
   */
  subtitle?: React.ReactNode;

  /**
   * The main content of the section. This is where the primary information or components reside.
   */
  children: React.ReactNode;

  /**
   * An optional CSS class name to apply to the root section element.
   * Allows for custom styling and layout adjustments.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root section element.
   * Use sparingly; prefer `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};

/**
 * SectionLayout is a versatile component for structuring content on a page.
 * It provides a consistent layout for sections with optional titles, captions, subtitles,
 * and a main content area, designed to be visually appealing and adaptable.
 */
export function SectionLayout({
  title,
  caption,
  subtitle,
  children,
  className,
  style,
}: SectionLayoutProps): React.JSX.Element {
  const hasHeaderText = title || caption || subtitle;

  return (
    <section
      className={classNames(styles.sectionLayout, className)}
      style={style}
    >
      {hasHeaderText ? (
        <div className={styles.headerContainer}>
          {caption ? (
            typeof caption === 'string' ? (
              <Paragraph className={styles.caption}>{caption}</Paragraph>
            ) : (
              caption
            )
          ) : null}
          {title ? (
            typeof title === 'string' ? (
              <Heading level={2} className={styles.title}>
                {title}
              </Heading>
            ) : (
              title
            )
          ) : null}
          {subtitle ? (
            typeof subtitle === 'string' ? (
              <Paragraph className={styles.subtitle}>{subtitle}</Paragraph>
            ) : (
              subtitle
            )
          ) : null}
        </div>
      ) : null}
      <div className={styles.contentContainer}>{children}</div>
    </section>
  );
}