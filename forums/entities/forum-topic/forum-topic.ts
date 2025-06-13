import { v4 as uuidv4 } from 'uuid';

/**
 * PlainJavaScript object representation of a ForumTopic.
 * Used for serialization and deserialization.
 */
export type PlainForumTopic = {
  /**
   * Unique identifier for the forum topic.
   */
  id: string;

  /**
   * Identifier of the forum this topic belongs to.
   */
  forumId: string;

  /**
   * Title of the forum topic.
   */
  title: string;

  /**
   * Main content of the forum topic.
   */
  content: string;

  /**
   * Identifier of the user who created the topic (author).
   */
  userId: string;

  /**
   * ISO date string representing when the topic was created.
   */
  createdAt: string;

  /**
   * ISO date string representing when the topic was last updated.
   */
  updatedAt: string;
};

/**
 * Represents a topic within a forum.
 * Topics are threads of discussion initiated by users.
 */
export class ForumTopic {
  /**
   * Creates an instance of a ForumTopic.
   * @param id Unique identifier for the forum topic.
   * @param forumId Identifier of the forum this topic belongs to.
   * @param title Title of the forum topic.
   * @param content Main content of the forum topic.
   * @param userId Identifier of the user who created the topic.
   * @param createdAt ISO date string of creation.
   * @param updatedAt ISO date string of last update.
   */
  constructor(
    public readonly id: string,
    public readonly forumId: string,
    public readonly title: string,
    public readonly content: string,
    public readonly userId: string,
    public readonly createdAt: string,
    public readonly updatedAt: string
  ) {}

  /**
   * Serializes the ForumTopic instance into a plain JavaScript object.
   * @returns A PlainForumTopic object.
   */
  toObject(): PlainForumTopic {
    return {
      id: this.id,
      forumId: this.forumId,
      title: this.title,
      content: this.content,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a ForumTopic instance from a plain JavaScript object.
   * If an id is not provided in the plain object, a new UUID will be generated.
   * @param plainTopic The plain JavaScript object.
   * @returns A new ForumTopic instance.
   */
  static from(plainTopic: Omit<PlainForumTopic, 'id' | 'createdAt' | 'updatedAt'> & { id?: string, createdAt?: string, updatedAt?: string }): ForumTopic {
    const now = new Date().toISOString();
    return new ForumTopic(
      plainTopic.id || uuidv4(),
      plainTopic.forumId,
      plainTopic.title,
      plainTopic.content,
      plainTopic.userId,
      plainTopic.createdAt || now,
      plainTopic.updatedAt || now
    );
  }
}