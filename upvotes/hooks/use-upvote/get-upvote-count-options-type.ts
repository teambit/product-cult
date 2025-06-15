/**
 * Options for retrieving the upvote count for an item.
 * These options conform to the GetUpvoteCountOptionsInput GraphQL input type.
 */
export type GetUpvoteCountOptionsType = {
  /**
   * Identifier of the item.
   */
  itemId: string;
  /**
   * Type of the item (e.g., "product", "launch").
   */
  itemType: string;
};