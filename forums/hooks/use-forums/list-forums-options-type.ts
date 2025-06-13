// Corresponds to ListForumsOptionsInput in the GraphQL schema
// Defines the options for listing forums.

/**
 * Options for listing forums.
 */
export type ListForumsOptions = {
  /**
   * Number of forums to skip.
   */
  offset?: number;
  /**
   * Maximum number of forums to return.
   */
  limit?: number;
  /**
   * Search term to filter forums by.
   */
  search?: string;
};