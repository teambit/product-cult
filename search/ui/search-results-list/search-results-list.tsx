import React from 'react';
import classNames from 'classnames';
import { Card } from '@infinity/design.content.card';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Link } from '@infinity/design.navigation.link';
import type { PlainSearchResult } from '@infinity/search.entities.search-result';
import styles from './search-results-list.module.scss';

/**
 * Props for the SearchResultsList component.
 */
export type SearchResultsListProps = {
  /**
   * An array of search result objects to display.
   * Each object should conform to the PlainSearchResult interface.
   */
  results?: PlainSearchResult[];
  /**
   * Optional CSS class name to apply to the root element of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   */
  style?: React.CSSProperties;
  /**
   * Optional callback function that is triggered when a search result item's title link is clicked.
   * Receives the clicked search result object as an argument.
   */
  onItemLinkClick?: (result: PlainSearchResult) => void;
};

const defaultResults: PlainSearchResult[] = [];

/**
 * Determines the appropriate URL for a search result item.
 * It prioritizes `data.url`, then constructs URLs based on `type` and `id`.
 * @param result The search result object.
 * @returns A string representing the URL for the search result.
 */
const determineLink = (result: PlainSearchResult): string => {
  if (result.data?.url && typeof result.data.url === 'string') {
    return result.data.url;
  }
  switch (result.type?.toLowerCase()) {
    case 'product':
      return `/products/${result.id}`;
    case 'launch':
      return `/launches/${result.id}`;
    case 'news':
      return `/news/${result.id}`;
    case 'forum_topic': // Example type, adjust as per actual search types
    case 'topic':
      return `/forums/${result.id}`;
    case 'review':
      if (result.data?.productId && typeof result.data.productId === 'string') {
        return `/products/${result.data.productId}`; // Link to product if review is associated
      }
      // Fallback for reviews, potentially to a generic reviews page or section
      return `/reviews`; // A generic review page or section if exists
    default:
      // Fallback for unknown types, perhaps a generic detail page or back to search
      return `/search?itemId=${result.id}&type=${result.type}`;
  }
};

/**
 * SearchResultsList component displays a list of search results using Card components.
 * Each card shows the result's title (as a link), description, and an optional image.
 */
export function SearchResultsList({
  results = defaultResults,
  className,
  style,
  onItemLinkClick,
}: SearchResultsListProps): React.JSX.Element {
  if (!results || results.length === 0) {
    return (
      <div className={classNames(styles.emptyState, className)} style={style}>
        <Paragraph>No results found. Try refining your search.</Paragraph>
      </div>
    );
  }

  return (
    <ul
      className={classNames(styles.searchResultsList, className)}
      style={style}
    >
      {results.map((result) => {
        const handleLinkClick = (
          event: React.MouseEvent<HTMLAnchorElement>
        ) => {
          if (onItemLinkClick) {
            onItemLinkClick(result);
          }
          // Allow default link navigation to proceed
        };

        return (
          <li key={result.id} className={styles.searchResultItem}>
            <Card
              interactive
              image={result.imageUrl}
              imageAlt={result.title} // Default alt text, consider more specific if available
              className={styles.searchResultCard}
            >
              <Link
                href={determineLink(result)}
                className={styles.resultTitleLink}
                onClick={handleLinkClick}
              >
                <Heading
                  level={3}
                  visualLevel={4}
                  className={styles.resultTitle}
                >
                  {result.title}
                </Heading>
              </Link>
              <Paragraph className={styles.resultDescription}>
                {result.description}
              </Paragraph>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}