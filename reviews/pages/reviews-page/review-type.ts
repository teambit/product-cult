/**
 * Represents a review entity.
 * This type defines the structure of a review object, including its content,
 * associated product and user, rating, and status.
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
   * Numerical rating given in the review (e.g., 1 to 5).
   */
  rating: number;
  /**
   * Text content of the review.
   */
  comment: string;
  /**
   * ISO 8601 date string representing when the review was created.
   */
  createdAt: string;
  /**
   * ISO 8601 date string representing when the review was last updated.
   */
  updatedAt: string;
  /**
   * Current status of the review (e.g., "approved", "pending", "rejected").
   */
  status: string;
};