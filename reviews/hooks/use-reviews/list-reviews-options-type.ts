/**
 * Options for listing reviews.
 * This type defines the structure for filtering and paginating a list of reviews.
 */
export type ListReviewsOptions = {
  /**
   * Identifier of the product to filter reviews by.
   */
  productId?: string;
  /**
   * Identifier of the user to filter reviews by.
   */
  userId?: string;
  /**
   * Maximum number of reviews to return.
   */
  limit?: number;
  /**
   * Number of reviews to skip for pagination.
   */
  offset?: number;
  /**
   * Status of the reviews to filter by (e.g., "approved", "pending").
   */
  status?: string;
};