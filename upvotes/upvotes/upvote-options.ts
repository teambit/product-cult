/**
 * Options for creating a new upvote.
 */
export type CreateUpvoteOptions = {
  /**
   * The ID of the item being upvoted.
   */
  itemId: string;
  /**
   * The type of the item being upvoted (e.g., "product", "launch").
   */
  itemType: string;
};

/**
 * Options for deleting an upvote.
 */
export type DeleteUpvoteOptions = {
  /**
   * The ID of the item for which the upvote is being deleted.
   */
  itemId: string;
  /**
   * The type of the item for which the upvote is being deleted.
   */
  itemType: string;
};

/**
 * Options for retrieving a specific upvote by its ID.
 */
export type GetUpvoteOptions = {
  /**
   * The unique ID of the upvote to retrieve.
   */
  id: string;
};

/**
 * Options for listing upvotes with filters and pagination.
 */
export type ListUpvotesOptions = {
  /**
   * Optional: Filter upvotes by item ID.
   */
  itemId?: string;
  /**
   * Optional: Filter upvotes by item type.
   */
  itemType?: string;
  /**
   * Optional: Filter upvotes by the user ID who created them.
   */
  userId?: string;
  /**
   * Optional: The number of upvotes to skip (for pagination).
   */
  offset?: number;
  /**
   * Optional: The maximum number of upvotes to return.
   */
  limit?: number;
};

/**
 * Options for retrieving the count of upvotes for a specific item.
 */
export type GetUpvoteCountOptions = {
  /**
   * The ID of the item to count upvotes for.
   */
  itemId: string;
  /**
   * The type of the item to count upvotes for.
   */
  itemType: string;
};

/**
 * Options for checking if a user has upvoted a specific item.
 */
export type GetUserUpvoteStatusOptions = {
  /**
   * The ID of the item to check upvote status for.
   */
  itemId: string;
  /**
   * The type of the item to check upvote status for.
   */
  itemType: string;
};