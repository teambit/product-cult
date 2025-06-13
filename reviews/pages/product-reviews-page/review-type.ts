/**
 * Represents a product review.
 * This type is based on the GraphQL schema for a Review.
 */
export interface Review {
  /**
   * Unique identifier for the review.
   * Example: "rev-123ab"
   */
  id: string;
  /**
   * Identifier of the product being reviewed.
   * Example: "prod-xyz789"
   */
  productId: string;
  /**
   * Identifier of the user who wrote the review.
   * Example: "user-def456"
   */
  userId: string;
  /**
   * Rating given in the review, typically on a scale (e.g., 1-5).
   * Example: 4.5
   */
  rating: number;
  /**
   * The main text content of the review.
   * Example: "This product exceeded my expectations!"
   */
  comment: string;
  /**
   * ISO 8601 date string representing when the review was created.
   * Example: "2023-10-26T10:00:00.000Z"
   */
  createdAt: string;
  /**
   * ISO 8601 date string representing when the review was last updated.
   * Example: "2023-10-27T14:30:00.000Z"
   */
  updatedAt: string;
  /**
   * Current status of the review (e.g., "approved", "pending", "rejected").
   * Example: "approved"
   */
  status: string;
  /**
   * Method to convert the review object to a plain JavaScript object.
   * Required for compatibility with components expecting entity-like objects.
   */
  toObject(): {
    id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    status: string;
  };
}