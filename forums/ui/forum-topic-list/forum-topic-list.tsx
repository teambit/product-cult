import React from 'react';
import classNames from 'classnames';
import { Link } from '@infinity/design.navigation.link';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Avatar } from '@infinity/design.content.avatar';
import { type ForumTopic } from '@infinity/forums.entities.forum-topic';
import { useListForumTopics, type UseListForumTopicsOptions } from '@infinity/forums.hooks.use-forum-topics';
import { useGetUserProfile } from '@infinity/people.hooks.use-user-profile';

import styles from './forum-topic-list.module.scss';
import { useGetForum } from '@infinity/forums.hooks.use-forums';

const DEFAULT_TOPIC_LIMIT = 10;

/**
 * Props for the ForumTopicItem component.
 * This is an internal component not exported directly.
 */
type ForumTopicItemProps = {
  /**
   * The forum topic data to display.
   */
  topic: ForumTopic;
  /**
   * Optional custom CSS class name to apply to the topic item element.
   */
  className?: string;
};

const ForumTopicItem: React.FC<ForumTopicItemProps> = ({ topic, className }) => {
  const { userProfile, loading: userLoading } = useGetUserProfile({
    variables: { userId: topic.userId },
    skip: !topic.userId,
  });

  const creationDate = new Date(topic.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const authorName = userProfile?.name || 'Unknown Author';
  const authorInitials = userProfile?.name
    ? userProfile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
    : topic.userId.substring(0, 2).toUpperCase();


  return (
    <div className={classNames(styles.topicItem, className)}>
      <div className={styles.topicContent}>
        <Link href={`/forums/topic/${topic.id}`} className={styles.topicLink}>
          <Heading level={3} className={styles.topicTitle}>
            {topic.title}
          </Heading>
        </Link>
      </div>
      <div className={styles.metaInfo}>
        <div className={styles.authorInfo}>
          <Avatar
            src={userProfile?.imageUrl}
            alt={authorName}
            initials={authorInitials}
            size="small"
          />
          <Paragraph className={styles.authorName}>
            {userLoading ? 'Loading author...' : authorName}
          </Paragraph>
        </div>
        <Paragraph className={styles.creationDate}>Posted on {creationDate}</Paragraph>
      </div>
    </div>
  );
};

/**
 * Props for the ForumTopicList component.
 */
export type ForumTopicListProps = {
  /**
   * The ID of the forum whose topics are to be displayed.
   */
  forumId: string;
  /**
   * Optional number of topics to display per page.
   * @default 10
   */
  limit?: number;
  /**
   * Optional number of topics to skip (for pagination).
   * @default 0
   */
  offset?: number;
  /**
   * Optional custom CSS class name to apply to the root element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element.
   */
  style?: React.CSSProperties;
  /**
   * Optional mock data for topics, useful for testing or development.
   */
  mockTopics?: ForumTopic[];
};

/**
 * ForumTopicList component displays a list of forum topics for a given forum ID.
 * It shows the topic title, author (avatar and name), and creation date.
 * Each topic title links to its respective forum topic page.
 */
export function ForumTopicList({
  forumId,
  limit = DEFAULT_TOPIC_LIMIT,
  offset = 0,
  className,
  style,
  mockTopics,
}: ForumTopicListProps) {
  const listOptions: UseListForumTopicsOptions = { forumId, limit, offset };
  if (mockTopics) {
    listOptions.mockData = mockTopics;
  }

  const { forum } = useGetForum({
    queryOptions: {
      id: forumId
    }
  });

  const { topics, loading, error } = useListForumTopics(listOptions);

  if (loading) {
    return <div className={classNames(styles.loadingState, className)} style={style}>Loading topics...</div>;
  }

  if (error) {
    return <div className={classNames(styles.errorState, className)} style={style}>Error loading topics: {error.message}</div>;
  }

  if (!topics || topics.length === 0) {
    return <div className={classNames(styles.emptyState, className)} style={style}>No topics found in this forum yet.</div>;
  }

  return (
    <div>
      <div className={styles.pageHeaderImageContainer}>
         <img
            src={forum?.imageUrl}
            alt="A rocket soaring upwards, symbolizing a new launch"
            className={styles.headerImage}
          />
      </div>
      <div className={classNames(styles.forumTopicList, className)} style={style}>
        {topics.map((topic) => (
          <ForumTopicItem key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}