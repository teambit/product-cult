/**
 * Defines the input options for listing forum posts.
 * Corresponds to the ListPostsOptionsInput type in the GraphQL schema.
 */
export type ListPostsOptionsInput = {
  /**
   * Identifier of the forum topic to list posts from.
   */
  topicId: string;
  /**
   * Number of posts to skip for pagination.
   */
  offset?: number;
  /**
   * Maximum number of posts to return.
   */
  limit?: number;
};