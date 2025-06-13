/**
 * Defines the input options for fetching a single forum post.
 * Corresponds to the GetPostOptionsInput type in the GraphQL schema.
 */
export type GetPostOptionsInput = {
  /**
   * Unique identifier of the forum post to retrieve.
   */
  id: string;
};