import React from 'react';
import classNames from 'classnames';
import { SectionLayout } from '@infinity/design.layouts.section-layout';
import { Link } from '@infinity/design.navigation.link';
import { Paragraph } from '@infinity/design.typography.paragraph';
import type { TrendingSearchItem } from './trending-search-item-type.js';
import styles from './trending-searches.module.scss';

const DEFAULT_TITLE = `Trending Searches`;
const DEFAULT_ITEMS: readonly TrendingSearchItem[] = [
  { term: `AI Tools` },
  { term: `Developer Productivity` },
  { term: `No-Code Platforms` },
  { term: `Web3 Innovations` },
  { term: `Sustainable Tech` },
  { term: `SaaS Solutions` },
  { term: `Fintech` },
  { term: `Creator Economy` },
];

/**
 * Props for the TrendingSearches component.
 */
export type TrendingSearchesProps = {
  /**
   * Optional title for the trending searches section.
   * This title is displayed prominently at the top of the section.
   * @default "Trending Searches"
   */
  title?: string;

  /**
   * An array of trending search items to display.
   * Each item is an object with a 'term' property, representing the search query.
   * If not provided, a default list of trending searches will be used.
   */
  items?: readonly TrendingSearchItem[];

  /**
   * Optional subtitle for the section, displayed below the main title.
   * Provides additional context or a brief description for the trending searches.
   */
  subtitle?: string;

  /**
   * Optional CSS class name to apply to the root element of the component.
   * Allows for custom styling overrides or additions.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root element of the component.
   * Use sparingly; prefer `className` for styling.
   */
  style?: React.CSSProperties;
};

/**
 * TrendingSearches component displays a list of current trending search terms as interactive links.
 * It is designed to be used as a section on a homepage or similar discovery-focused page,
 * encouraging users to explore popular topics.
 */
export function TrendingSearches({
  title = DEFAULT_TITLE,
  items = DEFAULT_ITEMS,
  subtitle,
  className,
  style,
}: TrendingSearchesProps): React.JSX.Element {
  return (
    <SectionLayout
      title={title}
      subtitle={subtitle}
      className={classNames(styles.trendingSearchesSection, className)}
      style={style}
    >
      {items.length > 0 ? (
        <div className={styles.itemsContainer}>
          {items.map((item) => (
            <Link
              key={item.term}
              href={`/search?query=${encodeURIComponent(item.term)}`}
              className={styles.trendingItemLink}
            >
              {item.term}
            </Link>
          ))}
        </div>
      ) : (
        <Paragraph className={styles.noItemsMessage}>
          No trending searches to display at the moment. Check back soon!
        </Paragraph>
      )}
    </SectionLayout>
  );
}