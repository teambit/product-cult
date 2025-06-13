import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import { Button } from '@infinity/design.actions.button';
import { Heading } from '@infinity/design.typography.heading';
import { TextInput } from '@infinity/design.inputs.text-input';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { SelectList, type SelectListOption } from '@infinity/design.inputs.select-list';
import { useListForums } from '@infinity/forums.hooks.use-forums';
import type { Forum } from '@infinity/forums.entities.forum';

import styles from './create-forum-topic-page.module.scss';

/**
 * Props for the CreateForumTopicPage component.
 */
export type CreateForumTopicPageProps = {
  /**
   * Optional class name to apply to the root element of the page.
   */
  className?: string;

  /**
   * Callback function triggered when a topic is successfully created.
   * Receives the ID of the newly created topic.
   * If not provided, the component will navigate to `/forums` by default.
   * @param topicId - The ID of the created topic.
   */
  onTopicCreated?: (topicId: string) => void;
};

// This would ideally come from a GraphQL client or a shared types definition
// For now, defining based on the GraphQL schema for `createTopic` mutation input.
type CreateTopicOptionsInput = {
  forumId: string;
  title: string;
  content: string;
};


/**
 * CreateForumTopicPage is a page component that allows authenticated users to create new topics in a selected forum.
 * It includes a form with fields for topic title, content, and forum selection.
 */
export function CreateForumTopicPage({
  className,
  onTopicCreated,
}: CreateForumTopicPageProps) {
  const navigate = useNavigate();
  const { user, loading: authLoading, error: authError } = useAuth();
  const {
    forums,
    loading: forumsLoading,
    error: forumsError,
  } = useListForums();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedForumId, setSelectedForumId] = useState<string | undefined>(
    undefined
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      // Redirect to login or show a message if user is not authenticated.
      // For this example, we'll redirect to the home page or a login page.
      // Assuming a login page exists at '/login'
      navigate('/login?redirect=/forums/create', { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleForumChange = (forumId: string | string[]) => {
    setSelectedForumId(forumId as string); // Assuming single select
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (!user) {
      setSubmitError('You must be logged in to create a topic.');
      return;
    }
    if (!title.trim()) {
      setSubmitError('Topic title cannot be empty.');
      return;
    }
    if (!content.trim()) {
      setSubmitError('Topic content cannot be empty.');
      return;
    }
    if (!selectedForumId) {
      setSubmitError('Please select a forum for your topic.');
      return;
    }

    setIsSubmitting(true);

    const topicData: CreateTopicOptionsInput = {
      title: title.trim(),
      content: content.trim(),
      forumId: selectedForumId,
    };

    // Here you would typically call a mutation to create the topic
    // For example: const createdTopic = await createTopicMutation({ variables: { options: topicData } });
    // Simulating API call
    try {
      // Simulate API call
      const createdTopicId = await new Promise<string>((resolve, reject) => setTimeout(() => {
        // Simulate success or failure
        // const success = Math.random() > 0.2; // 80% success rate
        const success = true; // For demo purposes, always succeed
        if (success) {
          const mockCreatedTopicId = `mock-topic-id-${Date.now()}`;
          resolve(mockCreatedTopicId);
        } else {
          reject(new Error('Failed to create topic. Please try again.'));
        }
      }, 1500));


      setTitle('');
      setContent('');
      setSelectedForumId(undefined);

      if (onTopicCreated) {
        onTopicCreated(createdTopicId);
      } else {
        // Navigate to the newly created topic page or forums list
        navigate(`/forums/${createdTopicId}`);
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const forumOptions: SelectListOption[] =
    forums?.map((forum: Forum) => ({
      value: forum.id,
      label: forum.name,
    })) || [];

  if (authLoading) {
    return (
      <PageLayout title="Create Topic" metaDescription="Create a new forum topic.">
        <div className={styles.loadingMessage}>Loading authentication...</div>
      </PageLayout>
    );
  }

  if (authError) {
    return (
      <PageLayout title="Create Topic" metaDescription="Create a new forum topic.">
        <div className={styles.errorMessage}>
          Error authenticating: {authError.message}
        </div>
      </PageLayout>
    );
  }
  
  if (!user) {
     return (
      <PageLayout title="Create Topic" metaDescription="Create a new forum topic.">
        <div className={styles.infoMessage}>
          Please log in to create a new forum topic. This message appears if redirection hasn&apos;t completed yet.
        </div>
      </PageLayout>
    );
  }


  return (
    <PageLayout
      title="Create New Forum Topic"
      metaDescription="Start a new discussion by creating a topic in one of our forums."
      className={classNames(styles.createForumTopicPage, className)}
    >
      <Heading level={1}>Create New Topic</Heading>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="forum-select" className={styles.label}>
            Select Forum
          </label>
          {forumsLoading ? (
            <div className={styles.loadingMessage}>Loading forums...</div>
          ) : forumsError ? (
            <div className={styles.errorMessage}>
              Error loading forums: {forumsError.message}
            </div>
          ) : (
            <SelectList
              id="forum-select"
              options={forumOptions}
              value={selectedForumId}
              onChange={handleForumChange}
              placeholder="Choose a forum..."
              disabled={isSubmitting || forumsLoading}
              name="forumId"
              required
            />
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="topic-title" className={styles.label}>
            Topic Title
          </label>
          <TextInput
            id="topic-title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a clear and concise title"
            type="text"
            name="title"
            className={styles.titleInput}
            // disabled={isSubmitting} - TextInput does not support 'disabled'
            // required - TextInput does not support 'required'
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="topic-content" className={styles.label}>
            Topic Content
          </label>
          <TextInput
            id="topic-content"
            value={content}
            onChange={handleContentChange}
            placeholder="Share your thoughts, questions, or ideas... (Markdown supported)"
            type="text" 
            name="content"
            className={styles.contentInput} 
            // disabled={isSubmitting} - TextInput does not support 'disabled'
            // required - TextInput does not support 'required'
            // multiline - TextInput does not support 'multiline'
            // rows={6} - TextInput does not support 'rows'
          />
        </div>

        {submitError && (
          <div className={styles.errorMessage}>{submitError}</div>
        )}

        <div className={styles.submitButtonContainer}>
          <Button
            type="submit"
            appearance="primary"
            disabled={isSubmitting || forumsLoading || authLoading || !user}
          >
            {isSubmitting ? 'Creating Topic...' : 'Create Topic'}
          </Button>
        </div>
      </form>
    </PageLayout>
  );
}