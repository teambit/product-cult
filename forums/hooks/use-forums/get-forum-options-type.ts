// Corresponds to GetForumOptionsInput in the GraphQL schema
// Defines the options for retrieving a single forum.

/**
 * Options for retrieving a specific forum.
 */
export type GetForumOptions = {
  /**
   * The unique identifier of the forum to retrieve.
   */
  id: string;
};