import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { mockForumPost } from '@infinity/forums.entities.forum-post';
import { createMockUserProfile } from '@infinity/people.entities.user-profile';
import { ForumPostItem } from './forum-post-item.js';
import styles from './forum-post-item.module.scss';

describe('ForumPostItem', () => {
  const mockAuthor = createMockUserProfile({
    userId: 'test-user',
    name: 'Test User',
    bio: 'Test bio',
    imageUrl: 'https://example.com/avatar.jpg',
    createdAt: new Date().toISOString(),
  });

  const mockPost = mockForumPost({
    id: 'test-post',
    topicId: 'test-topic',
    content: 'Test content',
    userId: 'test-user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  it('renders the forum post item with author name and content', () => {
    const { container } = render(
      <MockProvider>
        <ForumPostItem post={mockPost} mockAuthorProfile={mockAuthor} />
      </MockProvider>
    );

    const authorNameElement = container.querySelector(`.${styles.authorName}`);
    expect(authorNameElement).toBeInTheDocument();
    expect(authorNameElement?.textContent).toBe(mockAuthor.name);

    const postContentElement = container.querySelector(`.${styles.postContent}`);
    expect(postContentElement).toBeInTheDocument();
    expect(postContentElement?.textContent).toBe(mockPost.content);
  });

  it('renders the avatar with the correct image source', () => {
    const { container } = render(
      <MockProvider>
        <ForumPostItem post={mockPost} mockAuthorProfile={mockAuthor} />
      </MockProvider>
    );

    const avatarElement = container.querySelector(`.${styles.avatar}`);
    expect(avatarElement).toBeInTheDocument();
  });

  it('renders a placeholder when author is loading', () => {
    const { container } = render(
      <MockProvider>
        <ForumPostItem post={mockPost} mockAuthorProfile={undefined} />
      </MockProvider>
    );
    const avatarPlaceholder = container.querySelector(`.${styles.avatarPlaceholder}`);
    expect(avatarPlaceholder).toBeInTheDocument();
  });
});
