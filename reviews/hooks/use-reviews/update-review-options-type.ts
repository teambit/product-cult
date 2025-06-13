/**
 * Options for updating a review.
 * This type defines the structure for the input required to update an existing review.
 */
export type UpdateReviewOptions = {
  /**
   * Unique identifier for the review to be updated.
   */
  id: string;
  /**
   * New rating for the review. Optional.
   */
  rating?: number;
  /**
   * New text content for the review. Optional.
   */
  comment?: string;
};