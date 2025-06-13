import React from 'react';
import classNames from 'classnames';
import { Avatar } from '@infinity/design.content.avatar';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { ForumPost } from '@infinity/forums.entities.forum-post';
import { UserProfile } from '@infinity/people.entities.user-profile';
import { useGetUserProfile } from '@infinity/people.hooks.use-user-profile';
import styles from './forum-post-item.module.scss';

export type ForumPostItemProps = {
  /**
   * The forum post data to display.
   * This object contains all necessary information about the post itself,
   * including its content, creation date, and the ID of the author.
   */
  post: ForumPost;
  /**
   * Optional CSS class name to apply to the root element of the component.
   * Allows for custom styling overrides from parent components.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   * It is generally recommended to use `className` and SCSS modules for styling;
   * use `style` for dynamic styles or highly specific, non-reusable adjustments.
   */
  style?: React.CSSProperties;
  /**
   * Optional mock user profile data for the author of the post.
   * If provided, the component will use this data directly instead of fetching it.
   * This is particularly useful for testing, storybook compositions, or scenarios
   * where author data is already available (e.g., pre-fetched during Server-Side Rendering).
   */
  mockAuthorProfile?: UserProfile;
};

/**
 * ForumPostItem displays an individual forum post, including the author's information,
 * the post content, and the creation date. It fetches author details asynchronously
 * unless mock data is provided.
 */
export function ForumPostItem({
  post,
  className,
  style,
  mockAuthorProfile,
}: ForumPostItemProps) {
  const {
    userProfile: authorFromHook, // Renamed to avoid conflict with 'author' variable if it existed
    loading: authorLoading,
    error: authorError,
  } = useGetUserProfile({
    variables: { userId: post.userId },
    skip: !!mockAuthorProfile || !post.userId,
    mockData: mockAuthorProfile,
  });

  // Determine the author data to display: use mock if provided, otherwise use fetched data.
  const displayedAuthor = mockAuthorProfile || authorFromHook;

  const formattedDate = new Date(post.createdAt).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article
      className={classNames(styles.forumPostItem, className)}
      style={style}
    >
      <header className={styles.header}>
        <div className={styles.authorInfo}>
          {authorLoading && !displayedAuthor ? (
            <div className={styles.avatarPlaceholder} />
          ) : (
            <Avatar
              src={displayedAuthor?.imageUrl}
              alt={displayedAuthor?.name || 'Author avatar'}
              size="medium"
              shape="circle"
              className={styles.avatar}
            />
          )}
          <div className={styles.authorMeta}>
            {authorLoading && !displayedAuthor ? (
              <Paragraph
                className={classNames(styles.authorName, styles.loadingText)}
              >
                Loading author...
              </Paragraph>
            // eslint-disable-next-line no-nested-ternary
            ) : authorError && !displayedAuthor ? (
              <Paragraph
                className={classNames(styles.authorName, styles.errorText)}
              >
                Error loading author
              </Paragraph>
            ) : displayedAuthor ? (
              <Paragraph className={styles.authorName}>
                {displayedAuthor.name}
              </Paragraph>
            ) : (
              <Paragraph className={styles.authorName}>
                Author unavailable
              </Paragraph>
            )}
            <Paragraph className={styles.postDate}>{formattedDate}</Paragraph>
          </div>
        </div>
      </header>
      <section className={styles.contentSection}>
        <Paragraph className={styles.postContent}>{post.content}</Paragraph>
      </section>
    </article>
  );
}