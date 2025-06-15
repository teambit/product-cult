/**
 * Options for checking a user's upvote status for an item.
 * These options conform to the GetUserUpvoteStatusOptionsInput GraphQL input type.
 */
export type GetUserUpvoteStatusOptionsType = {
  /**
   * Identifier of the item.
   */
  itemId: string;
  /**
   * Type of the item (e.g., "product", "launch").
   */
  itemType: string;
};