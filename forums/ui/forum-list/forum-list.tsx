import React from 'react';
import classNames from 'classnames';
import { Link } from '@infinity/design.navigation.link';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { useListForums, type ListForumsOptions } from '@infinity/forums.hooks.use-forums';
import type { Forum } from '@infinity/forums.entities.forum';

import styles from './forum-list.module.scss';

/**
 * Props for the ForumList component.
 */
export type ForumListProps = {
  /**
   * Optional CSS class name to apply to the root forum list container.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root forum list container.
   */
  style?: React.CSSProperties;
  /**
   * Options to pass to the useListForums hook for fetching forums.
   * Allows for pagination (offset, limit) and searching.
   */
  listOptions?: ListForumsOptions;
  /**
   * Optional mock data for forums. If provided, the component will use this data
   * instead of fetching from the backend. Useful for testing or development.
   */
  mockForumsData?: Forum[];
};

/**
 * ForumList component displays a list of forums.
 * Each forum item shows its name, description, and an optional image,
 * and links to the respective forum's page.
 */
export function ForumList({
  className,
  style,
  listOptions,
  mockForumsData,
}: ForumListProps): React.JSX.Element {
  const { forums, loading, error } = useListForums({
    queryOptions: listOptions,
    mockData: mockForumsData,
  });

  if (loading) {
    return (
      <div className={classNames(styles.messageContainer, className)} style={style}>
        <Paragraph>Loading forums...</Paragraph>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(styles.messageContainer, className)} style={style}>
        <Paragraph>Error loading forums: {error.message}</Paragraph>
      </div>
    );
  }

  if (!forums || forums.length === 0) {
    return (
      <div className={classNames(styles.messageContainer, className)} style={style}>
        <Paragraph>No forums found.</Paragraph>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.forumListContainer, className)}
      style={style}
    >
      {forums.map((forum) => (
        <Link
          key={forum.id}
          href={`/forums/${forum.id}`}
          className={styles.forumItemLink}
        >
          <article className={styles.forumItemCard}>
            {forum.imageUrl && (
              <img
                src={forum.imageUrl}
                alt={`Visual representation for ${forum.name}`}
                className={styles.forumImage}
              />
            )}
            <div className={styles.forumContent}>
              <Heading level={3} className={styles.forumName}>
                {forum.name}
              </Heading>
              <Paragraph className={styles.forumDescription}>
                {forum.description}
              </Paragraph>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}