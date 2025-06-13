/**
 * Represents a single review entity for a product.
 * This type defines the structure of review data used throughout the reviews feature.
 */
export type Review = {
  /**
   * The unique identifier for the review.
   * Ensures each review can be distinctly referenced.
   */
  id: string;
  /**
   * The identifier of the product to which this review pertains.
   * Links the review back to the specific product being reviewed.
   */
  productId: string;
  /**
   * The identifier of the user who submitted this review.
   * Attributes the review to a specific user.
   */
  userId: string;
  /**
   * The numerical rating given by the user, typically on a scale (e.g., 1 to 5 stars).
   * Quantifies the user's satisfaction.
   */
  rating: number;
  /**
   * The textual content of the review, containing the user's feedback or comments.
   * Provides qualitative insights about the product.
   */
  comment: string;
  /**
   * An ISO 8601 date string representing when the review was initially created.
   * Tracks the submission time of the review.
   */
  createdAt: string;
  /**
   * An ISO 8601 date string representing when the review was last updated.
   * Tracks modifications to the review content or status.
   */
  updatedAt: string;
  /**
   * The moderation status of the review (e.g., "approved", "pending", "rejected").
   * Indicates whether the review is visible to the public.
   */
  status: string;
};