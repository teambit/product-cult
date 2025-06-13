/**
 * PlainJavaScript object representation of a ForumPost.
 * Used for serialization and deserialization.
 * Corresponds to the Post type in the GraphQL schema.
 */
export type PlainForumPost = {
  /**
   * Unique identifier for the forum post.
   */
  id: string;

  /**
   * Identifier of the forum topic this post belongs to.
   */
  topicId: string;

  /**
   * Main content of the forum post.
   */
  content: string;

  /**
   * Identifier of the user who created the post (author).
   */
  userId: string;

  /**
   * ISO date string representing when the post was created.
   */
  createdAt: string;

  /**
   * ISO date string representing when the post was last updated.
   */
  updatedAt: string;
};