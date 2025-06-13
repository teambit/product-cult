import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ForumTopicCard } from './forum-topic-card.js';
import { ForumTopic } from '@infinity/forums.entities.forum-topic';
import { createMockUserProfile } from '@infinity/people.entities.user-profile';
import styles from './forum-topic-card.module.scss';

const mockAuthor = createMockUserProfile({
  userId: 'user-alice-001',
  name: 'Alice Coder',
  imageUrl: 'https://example.com/alice.jpg',
  bio: 'Full-stack developer',
  createdAt: new Date().toISOString(),
});

const mockTopic = ForumTopic.from({
  forumId: 'ph-forum-general',
  title: 'Seeking Advice: Best Practices for Scaling a Node.js Application',
  content: 'Our Node.js application is experiencing rapid growth, and we need to ensure it can handle the increasing load. We are looking for best practices in scaling, database optimization, and microservices architecture to support our users effectively and maintain high performance.', // Made content longer to ensure truncation
  userId: mockAuthor.userId,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

describe('ForumTopicCard', () => {
  it('should render the topic title and author name', () => {
    const { container } = render(
      <MockProvider>
        <ForumTopicCard topic={mockTopic} mockAuthorProfile={mockAuthor} />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.title}`)?.textContent).toBe(mockTopic.title);
    expect(container.querySelector(`.${styles.authorName}`)?.textContent).toBe(mockAuthor.name);
  });

  it('should render a truncated excerpt of the topic content', () => {
    const { container } = render(
      <MockProvider>
        <ForumTopicCard topic={mockTopic} mockAuthorProfile={mockAuthor} />
      </MockProvider>
    );
    const excerptElement = container.querySelector(`.${styles.excerpt}`);
    expect(excerptElement).toBeDefined();
    // The component uses createExcerpt(topic.content, 120)
    // The mockTopic.content is now longer than 120 characters.
    expect(excerptElement?.textContent?.length).toBeLessThanOrEqual(120 + 3); // Max 120 chars + '...'
    expect(excerptElement?.textContent?.endsWith('...')).toBe(true);
  });

  it('should render the formatted creation date', () => {
    const { container } = render(
      <MockProvider>
        <ForumTopicCard topic={mockTopic} mockAuthorProfile={mockAuthor} />
      </MockProvider>
    );
    const dateElement = container.querySelector(`.${styles.date}`);
    expect(dateElement).toBeDefined();
    // Basic check for date presence; specific format check could be added if needed
    expect(dateElement?.textContent).toBeTruthy();
  });
});