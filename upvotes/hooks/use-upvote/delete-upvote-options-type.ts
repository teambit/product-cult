/**
 * Options for deleting an upvote for an item.
 * These options conform to the DeleteUpvoteOptionsInput GraphQL input type.
 */
export type DeleteUpvoteOptionsType = {
  /**
   * Identifier of the item whose upvote is to be deleted.
   */
  itemId: string;
  /**
   * Type of the item whose upvote is to be deleted (e.g., "product", "launch").
   */
  itemType: string;
};