/**
 * Represents a review entity.
 */
export type Review = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  status: string; // e.g., 'pending', 'approved', 'rejected'
};

/**
 * Represents a review report entity.
 */
export type ReviewReport = {
  id: string;
  reviewId: string;
  userId: string;
  reason: string;
  createdAt: string;
};

/**
 * Options for creating a new review.
 */
export type CreateReviewOptions = {
  productId: string;
  rating: number;
  comment: string;
};

/**
 * Options for updating an existing review.
 */
export type UpdateReviewOptions = {
  id: string;
  rating?: number;
  comment?: string;
};

/**
 * Options for deleting a review.
 */
export type DeleteReviewOptions = {
  id: string;
};

/**
 * Options for retrieving a review by ID.
 */
export type GetReviewOptions = {
  id: string;
};

/**
 * Options for listing reviews.
 */
export type ListReviewsOptions = {
  productId?: string;
  userId?: string;
  limit?: number;
  offset?: number;
  status?: string;
};

/**
 * Options for moderating a review.
 */
export type ModerateReviewOptions = {
  id: string;
  status: string; // e.g., 'approved', 'rejected'
};

/**
 * Options for listing reported reviews.
 */
export type ListReportedReviewsOptions = {
  limit?: number;
  offset?: number;
};

/**
 * Options for reporting a review.
 */
export type ReportReviewOptions = {
  reviewId: string;
  reason: string;
};