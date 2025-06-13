/**
 * Options for creating a review.
 * This type defines the structure for the input required to create a new review.
 */
export type CreateReviewOptions = {
  /**
   * Identifier of the product being reviewed.
   */
  productId: string;
  /**
   * Rating given in the review.
   */
  rating: number;
  /**
   * Text content of the review.
   */
  comment: string;
};