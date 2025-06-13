import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { Heading } from '@infinity/design.typography.heading';
import { Button } from '@infinity/design.actions.button';
import { ForumPostItem } from '@infinity/forums.ui.forum-post-item';
import { useGetForumTopic } from '@infinity/forums.hooks.use-forum-topics';
import { useListForumPosts } from '@infinity/forums.hooks.use-forum-posts';
import type { ForumTopic } from '@infinity/forums.entities.forum-topic';
import type { ForumPost } from '@infinity/forums.entities.forum-post';

import styles from './forum-topic-page.module.scss';

const POSTS_INITIAL_LIMIT = 10;

export type ForumTopicPageProps = {
  /**
   * The ID of the forum topic to display.
   * In a real application, this would typically come from URL parameters.
   */
  topicId: string;
  
  /**
   * Optional CSS class name to apply to the root element of the page.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root element of the page.
   */
  style?: React.CSSProperties;

  /**
   * Optional mock data for the forum topic, for testing purposes.
   * This is passed to the `useGetForumTopic` hook.
   */
  mockTopic?: ForumTopic;

  /**
   * Optional mock data for the forum posts, for testing purposes.
   * This is passed to the `useListForumPosts` hook.
   */
  mockPosts?: ForumPost[];
};

export function ForumTopicPage({
  topicId,
  className,
  style,
  mockTopic,
  mockPosts,
}: ForumTopicPageProps): React.JSX.Element {
  const { user, loading: authLoading } = useAuth();
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    topic,
    loading: topicLoading,
    error: topicError,
  } = useGetForumTopic({ id: topicId, mockData: mockTopic });

  const {
    posts,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useListForumPosts(
    { topicId, limit: POSTS_INITIAL_LIMIT, offset: 0 },
    { mockData: mockPosts }
  );

  const handleCreatePost = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!user || !topic || newPostContent.trim() === '') {
        return;
      }
      setIsSubmitting(true);
      // TODO: Implement actual post creation logic using a GraphQL mutation.
      // This would typically involve:
      // 1. Calling a `createPost` mutation with { topicId: topic.id, content: newPostContent }
      //    (userId is implicitly from the authenticated user context on the backend)
      // 2. On success:
      //    - Clear the newPostContent state.
      //    - Call refetchPosts() to update the list.
      // 3. On error:
      //    - Display an error message to the user.
      console.log('Simulating new post creation:', {
        topicId: topic.id,
        content: newPostContent,
        userId: user.id, // For logging/simulation purposes
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewPostContent('');
      // Simulate refetch after successful post. In a real scenario,
      // this might be triggered by cache update policies or explicitly called.
      refetchPosts(); 
      setIsSubmitting(false);
    },
    [user, topic, newPostContent, refetchPosts]
  );

  if (authLoading || topicLoading) {
    return (
      <PageLayout title="Loading Topic...">
        <div className={styles.stateMessageContainer}>
          <p className={styles.loadingMessage}>Loading forum topic details...</p>
        </div>
      </PageLayout>
    );
  }

  if (topicError) {
    return (
      <PageLayout title="Error">
        <div className={styles.stateMessageContainer}>
          <p className={styles.errorMessage}>
            Error loading topic: {topicError.message}
          </p>
        </div>
      </PageLayout>
    );
  }

  if (!topic) {
    return (
      <PageLayout title="Topic Not Found">
        <div className={styles.stateMessageContainer}>
          <p className={styles.notFoundMessage}>The requested topic could not be found.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={topic.title} className={classNames(styles.forumTopicPage, className)} >
      <header className={styles.topicHeader}>
        <Heading level={1} className={styles.topicTitle}>
          {topic.title}
        </Heading>
        <p className={styles.topicContent}>{topic.content}</p>
        {/* Consider adding author and date info for the topic itself */}
      </header>

      <section className={styles.postsSection}>
        <Heading level={2} className={styles.postsHeading}>
          Discussion
        </Heading>
        {postsLoading ? (
          <div className={styles.stateMessageContainer}>
            <p className={styles.loadingMessage}>Loading posts...</p>
          </div>
        ) : postsError ? (
          <div className={styles.stateMessageContainer}>
            <p className={styles.errorMessage}>
              Error loading posts: {postsError.message}
            </p>
          </div>
        ) : posts && posts.length > 0 ? (
          <ul className={styles.postsList}>
            {posts.map((post) => (
              <li key={post.id} className={styles.postListItem}>
                <ForumPostItem post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.stateMessageContainer}>
            <p className={styles.noPostsMessage}>Be the first to contribute to this discussion!</p>
          </div>
        )}
      </section>

      {user ? (
        <section className={styles.newPostSection}>
          <Heading level={3} className={styles.newPostHeading}>
            Join the Discussion
          </Heading>
          <form onSubmit={handleCreatePost} className={styles.newPostForm}>
            <textarea
              className={styles.postTextarea}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Write your reply..."
              rows={5}
              disabled={isSubmitting}
              required
              aria-label="Your reply content"
            />
            <Button type="submit" appearance="primary" disabled={isSubmitting || newPostContent.trim() === ''}>
              {isSubmitting ? 'Submitting...' : 'Post Reply'}
            </Button>
          </form>
        </section>
      ) : (
        <section className={styles.loginPromptSection}>
          <p>
            Please{' '}
            <Button appearance="tertiary" href="/login" className={styles.authLinkButton}>
              login
            </Button>{' '}
            or{' '}
            <Button appearance="tertiary" href="/signup" className={styles.authLinkButton}>
              sign up
            </Button>{' '}
            to post a reply.
          </p>
        </section>
      )}
    </PageLayout>
  );
}