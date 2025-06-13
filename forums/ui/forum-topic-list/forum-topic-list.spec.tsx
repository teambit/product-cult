import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ForumTopicList } from './forum-topic-list.js';
import { mockForumTopics } from '@infinity/forums.entities.forum-topic';
import { createMockUserProfile } from '@infinity/people.entities.user-profile';


const mockUser = createMockUserProfile({
  userId: 'user-test-01',
  name: 'Test User',
});

const mockTopics = mockForumTopics([
  {
    id: 'topic-1',
    forumId: 'test-forum',
    title: 'Test Topic 1',
    content: 'Test Content 1',
    userId: mockUser.userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'topic-2',
    forumId: 'test-forum',
    title: 'Test Topic 2',
    content: 'Test Content 2',
    userId: mockUser.userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]);

describe('ForumTopicList', () => {
  it('renders empty state when no topics are provided', () => {
    render(
      <MockProvider>
        <ForumTopicList forumId="test-forum" mockTopics={[]} />
      </MockProvider>
    );
    expect(screen.getByText('No topics found in this forum yet.')).toBeInTheDocument();
  });

  it('renders topics when available', () => {
    render(
      <MockProvider>
        <ForumTopicList forumId="test-forum" mockTopics={mockTopics} />
      </MockProvider>
    );
    expect(screen.getByText('Test Topic 1')).toBeInTheDocument();
    expect(screen.getByText('Test Topic 2')).toBeInTheDocument();
  });
});
