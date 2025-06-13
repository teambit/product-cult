/**
 * Represents a review entity, based on the GraphQL schema.
 * This type defines the structure of a review object used within the application.
 */
export type Review = {
  /**
   * The unique identifier for the review.
   * Example: "rev-123-abc"
   */
  id: string;
  /**
   * The identifier of the product that this review is associated with.
   * Example: "prod-456-xyz"
   */
  productId: string;
  /**
   * The identifier of the user who submitted the review.
   * Example: "user-789-def"
   */
  userId: string;
  /**
   * The numerical rating given by the user, typically on a scale (e.g., 1 to 5 stars).
   * Example: 4.5
   */
  rating: number;
  /**
   * The textual content of the review comment.
   * Example: "This product exceeded my expectations!"
   */
  comment: string;
  /**
   * The ISO 8601 date-time string indicating when the review was created.
   * Example: "2023-10-26T10:30:00Z"
   */
  createdAt: string;
  /**
   * The ISO 8601 date-time string indicating when the review was last updated.
   * Example: "2023-10-27T11:00:00Z"
   */
  updatedAt: string;
  /**
   * The current moderation status of the review.
   * Common statuses include "pending", "approved", "rejected".
   * Example: "approved"
   */
  status: string;
};