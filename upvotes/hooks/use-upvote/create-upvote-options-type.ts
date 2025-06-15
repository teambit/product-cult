/**
 * Options for creating an upvote for an item.
 * These options conform to the CreateUpvoteOptionsInput GraphQL input type.
 */
export type CreateUpvoteOptionsType = {
  /**
   * Identifier of the item to be upvoted.
   */
  itemId: string;
  /**
   * Type of the item to be upvoted (e.g., "product", "launch").
   */
  itemType: string;
};