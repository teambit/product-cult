import React from 'react';
import classNames from 'classnames';
import { Link } from '@infinity/design.navigation.link';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import type { SearchResult } from '@infinity/search.entities.search-result';

import styles from './forum-topic-search-result-item.module.scss';

/**
 * Props for the ForumTopicSearchResultItem component.
 * These properties allow customization of the search result item's appearance and behavior.
 */
export type ForumTopicSearchResultItemProps = {
  /**
   * The search result object containing data for the forum topic.
   * This object includes the topic's ID, title, description, and other relevant information
   * necessary to display the item and link to the correct forum topic page.
   * It should contain a `data` object with an `originalUrl` property for the link,
   * or the link will be constructed using the topic's ID.
   */
  searchResult: SearchResult;
  /**
   * Optional custom CSS class name to apply to the root element of the component.
   * This allows for further style customization or overrides via external CSS.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   * While available, using `className` for styling is generally preferred for better
   * maintainability and separation of concerns.
   */
  style?: React.CSSProperties;
};

/**
 * ForumTopicSearchResultItem renders an individual forum topic item for display in search results.
 * It showcases the topic's title and a brief excerpt, linking directly to the full topic page.
 * The component is designed with a modern aesthetic, featuring subtle interactions and clear typography
 * to enhance user experience and integrate seamlessly into the search results interface.
 * It aims for a "wow" effect through clean design, responsive behavior, and engaging hover states.
 */
export const ForumTopicSearchResultItem: React.FC<ForumTopicSearchResultItemProps> = ({
  searchResult,
  className,
  style,
}) => {
  // Prefer originalUrl from data if available, otherwise construct from ID.
  const topicLink = searchResult.data?.originalUrl || `/forums/${searchResult.id}`;

  return (
    <Link
      href={topicLink}
      className={classNames(styles.forumTopicSearchResultItem, className)}
      style={style}
    >
      <Heading level={3} visualLevel={5} className={styles.title}>
        {searchResult.title}
      </Heading>
      <Paragraph className={styles.description}>
        {searchResult.description}
      </Paragraph>
    </Link>
  );
};