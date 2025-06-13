import { v4 as uuidv4 } from 'uuid';
import type { PlainForumPost } from './plain-forum-post-type.js';

/**
 * Represents a post within a forum topic.
 * Posts are individual messages contributed by users to a discussion thread.
 * This entity corresponds to the 'Post' type in the GraphQL schema.
 */
export class ForumPost {
  /**
   * Creates an instance of a ForumPost.
   * @param id Unique identifier for the forum post.
   * @param topicId Identifier of the forum topic this post belongs to.
   * @param content Main content of the forum post.
   * @param userId Identifier of the user who created the post.
   * @param createdAt ISO date string of creation.
   * @param updatedAt ISO date string of last update.
   */
  constructor(
    public readonly id: string,
    public readonly topicId: string,
    public readonly content: string,
    public readonly userId: string,
    public readonly createdAt: string,
    public readonly updatedAt: string
  ) {}

  /**
   * Serializes the ForumPost instance into a plain JavaScript object.
   * @returns A PlainForumPost object, including the 'id' property.
   */
  toObject(): PlainForumPost {
    return {
      id: this.id,
      topicId: this.topicId,
      content: this.content,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a ForumPost instance from a plain JavaScript object.
   * If an 'id' is not provided in the plain object, a new UUID will be generated.
   * If 'createdAt' or 'updatedAt' are not provided, they will be set to the current ISO date string.
   * @param plainPost The plain JavaScript object. Requires 'topicId', 'content', and 'userId'.
   *                  'id', 'createdAt', and 'updatedAt' are optional and will be generated if missing.
   * @returns A new ForumPost instance.
   */
  static from(
    plainPost: Omit<PlainForumPost, 'id' | 'createdAt' | 'updatedAt'> & {
      id?: string;
      createdAt?: string;
      updatedAt?: string;
    }
  ): ForumPost {
    const now = new Date().toISOString();
    return new ForumPost(
      plainPost.id || uuidv4(),
      plainPost.topicId,
      plainPost.content,
      plainPost.userId,
      plainPost.createdAt || now,
      plainPost.updatedAt || now
    );
  }
}