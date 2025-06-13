import { ForumPost } from './forum-post.js';
import { mockForumPost } from './forum-post.mock.js';

describe('ForumPost', () => {
  it('should create a ForumPost instance from a plain object', () => {
    const plainPost = {
      topicId: 'topic123',
      content: 'Test content',
      userId: 'user456',
    };
    const forumPost = ForumPost.from(plainPost);
    expect(forumPost).toBeInstanceOf(ForumPost);
    expect(forumPost.topicId).toBe(plainPost.topicId);
    expect(forumPost.content).toBe(plainPost.content);
    expect(forumPost.userId).toBe(plainPost.userId);
  });

  it('should serialize a ForumPost instance to a plain object', () => {
    const forumPost = mockForumPost();
    const plainObject = forumPost.toObject();
    expect(plainObject.id).toBe(forumPost.id);
    expect(plainObject.topicId).toBe(forumPost.topicId);
    expect(plainObject.content).toBe(forumPost.content);
    expect(plainObject.userId).toBe(forumPost.userId);
    expect(plainObject.createdAt).toBe(forumPost.createdAt);
    expect(plainObject.updatedAt).toBe(forumPost.updatedAt);
  });

  it('should create a mock ForumPost instance with default values', () => {
    const mockPost = mockForumPost();
    expect(mockPost).toBeInstanceOf(ForumPost);
  });
});