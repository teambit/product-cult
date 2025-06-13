import React from 'react';
import classNames from 'classnames';
import { Card } from '@infinity/design.content.card';
import { Avatar } from '@infinity/design.content.avatar';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Link } from '@infinity/design.navigation.link';
import { ForumTopic } from '@infinity/forums.entities.forum-topic';
import { useGetUserProfile } from '@infinity/people.hooks.use-user-profile';
import { UserProfile } from '@infinity/people.entities.user-profile';

import styles from './forum-topic-card.module.scss';

/**
 * Creates a truncated excerpt from a given text.
 * @param text - The input string.
 * @param maxLength - The maximum length of the excerpt. Defaults to 150.
 * @returns The truncated string with an ellipsis if it exceeds maxLength.
 */
const createExcerpt = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) {
    return text;
  }
  // Try to break at the last space before maxLength
  const trimmedText = text.substring(0, maxLength);
  const lastSpaceIndex = trimmedText.lastIndexOf(' ');
  if (lastSpaceIndex > 0 && lastSpaceIndex > maxLength / 2) { // Ensure last space is reasonably far
    return `${trimmedText.substring(0, lastSpaceIndex)}...`;
  }
  return `${trimmedText}...`; // Fallback if no good space is found or text is short
};

/**
 * Formats an ISO date string into a more readable format (e.g., "January 1, 2023").
 * @param dateString - The ISO date string.
 * @returns The formatted date string.
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export type ForumTopicCardProps = {
  /**
   * The forum topic data to display.
   * This object contains all necessary information about the topic,
   * such as title, content, author ID, and creation date.
   */
  topic: ForumTopic;
  /**
   * Optional custom CSS class name to apply to the card's root link element.
   * This allows for further styling and customization via external CSS.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the card's root link element.
   * While available, it's generally recommended to use `className` for styling.
   */
  style?: React.CSSProperties;
  /**
   * Optional mock user profile for the author.
   * If provided, this data will be used instead of fetching the author's profile.
   * Useful for testing, storybook compositions, or scenarios where author data is pre-loaded.
   */
  mockAuthorProfile?: UserProfile;
};

/**
 * ForumTopicCard displays a summary of a forum topic, including its title, author,
 * a short excerpt, and creation date. It is designed to be engaging and link to the full topic.
 */
export function ForumTopicCard({
  topic,
  className,
  style,
  mockAuthorProfile,
}: ForumTopicCardProps): React.JSX.Element {
  const { userProfile, loading: authorLoading } = useGetUserProfile({
    variables: { userId: topic.userId },
    skip: !!mockAuthorProfile, // Skip fetch if mock data is provided
    mockData: mockAuthorProfile,
  });

  const author = mockAuthorProfile || userProfile;
  const topicUrl = `/forums/${topic.id}`;

  return (
    <Link href={topicUrl} className={classNames(styles.forumTopicCardLink, className)} style={style}>
      <Card
        variant="primary"
        interactive // Card component handles hover effects like scaling
        className={styles.cardInner}
        header={
          <div className={styles.headerContent}>
            <div className={styles.authorInfo}>
              {authorLoading && !author ? (
                <>
                  <div className={styles.avatarPlaceholder} />
                  <div className={styles.authorNamePlaceholder} />
                </>
              ) : author ? (
                <>
                  <Avatar
                    src={author.imageUrl}
                    alt={author.name}
                    initials={author.name?.substring(0, 2).toUpperCase() || 'U'}
                    size="small"
                    shape="circle"
                    className={styles.avatar}
                  />
                  <Paragraph className={styles.authorName}>{author.name}</Paragraph>
                </>
              ) : (
                <>
                  <Avatar initials="?" size="small" shape="circle" className={styles.avatar} />
                  <Paragraph className={styles.authorName}>Author unknown</Paragraph>
                </>
              )}
            </div>
            <Paragraph className={styles.date}>{formatDate(topic.createdAt)}</Paragraph>
          </div>
        }
      >
        <Heading level={3} visualLevel={4} className={styles.title}>
          {topic.title}
        </Heading>
        <Paragraph className={styles.excerpt}>
          {createExcerpt(topic.content, 120)}
        </Paragraph>
      </Card>
    </Link>
  );
}