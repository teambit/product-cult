/**
 * Represents the plain object structure of a review.
 */
export type PlainReview = {
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

/**
 * Represents a product review.
 * This class can be used for serialization and de-serialization of review objects.
 */
export class Review {
  /**
   * Constructs a new Review instance.
   * @param id Unique identifier for the review.
   * @param productId Identifier of the product being reviewed.
   * @param userId Identifier of the user who wrote the review.
   * @param rating Rating given in the review.
   * @param comment Text content of the review.
   * @param createdAt ISO 8601 date string of creation.
   * @param updatedAt ISO 8601 date string of last update.
   * @param status Current status of the review.
   */
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly userId: string,
    public readonly rating: number,
    public readonly comment: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly status: string
  ) {}

  /**
   * Serializes the Review instance into a plain JavaScript object.
   * @returns A PlainReview object.
   */
  toObject(): PlainReview {
    return {
      id: this.id,
      productId: this.productId,
      userId: this.userId,
      rating: this.rating,
      comment: this.comment,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      status: this.status,
    };
  }

  /**
   * Creates a Review instance from a plain JavaScript object.
   * @param plainReview The plain object conforming to PlainReview type.
   * @returns A new Review instance.
   */
  static from(plainReview: PlainReview): Review {
    return new Review(
      plainReview.id,
      plainReview.productId,
      plainReview.userId,
      plainReview.rating,
      plainReview.comment,
      plainReview.createdAt,
      plainReview.updatedAt,
      plainReview.status
    );
  }
}