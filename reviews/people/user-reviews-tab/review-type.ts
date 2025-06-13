/**
 * Represents a review entity.
 * This type should align with the structure of review data,
 * often corresponding to a GraphQL Review type or backend entity.
 */
export type Review = {
  /**
   * Unique identifier for the review.
   */
  id: string;
  /**
   * Identifier of the product being reviewed.
   */
  productId: string;
  /**
   * Identifier of the user who wrote the review.
   */
  userId: string;
  /**
   * Rating given in the review, typically on a scale (e.g., 1-5).
   */
  rating: number;
  /**
   * Text content or comment of the review.
   */
  comment: string;
  /**
   * ISO 8601 date string indicating when the review was created.
   */
  createdAt: string;
  /**
   * ISO 8601 date string indicating when the review was last updated.
   */
  updatedAt: string;
  /**
   * Current status of the review (e.g., "approved", "pending", "rejected").
   */
  status: string;
  /**
   * Method to get a plain object representation of the review.
   * Required for compatibility with entity types used by hooks/UI components.
   */
  toObject: () => Omit<Review, 'toObject'>;
};