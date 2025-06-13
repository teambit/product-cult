import { describe, it, expect } from 'vitest';
import { ForumTopic } from './forum-topic.js';

describe('ForumTopic', () => {
  it('should have a ForumTopic.from() method', () => {
    expect(ForumTopic.from).toBeTruthy();
  });

  it('should create a ForumTopic instance from a plain object', () => {
    const plainTopic = {
      forumId: 'forum-1',
      title: 'Test Topic',
      content: 'Test Content',
      userId: 'user-1',
    };
    const forumTopic = ForumTopic.from(plainTopic);
    expect(forumTopic).toBeInstanceOf(ForumTopic);
    expect(forumTopic.title).toBe(plainTopic.title);
  });

  it('should serialize a ForumTopic instance into a plain object', () => {
    const forumTopic = new ForumTopic(
      'topic-1',
      'forum-1',
      'Test Topic',
      'Test Content',
      'user-1',
      new Date().toISOString(),
      new Date().toISOString()
    );
    const plainTopic = forumTopic.toObject();
    expect(plainTopic).toEqual({
      id: 'topic-1',
      forumId: 'forum-1',
      title: 'Test Topic',
      content: 'Test Content',
      userId: 'user-1',
      createdAt: forumTopic.createdAt,
      updatedAt: forumTopic.updatedAt,
    });
  });
});