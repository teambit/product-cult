import React from 'react';
import classNames from 'classnames';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { useListReviews } from '@infinity/reviews.hooks.use-reviews';
import { ReviewList } from '@infinity/reviews.ui.review-list';
import type { Review } from '@infinity/reviews.entities.review';
import styles from './reviews-page.module.scss';

export type ReviewsPageProps = {
  /**
   * Optional class name for the main container of the reviews page.
   * This class will be applied to the root div element within the PageLayout.
   */
  className?: string;
  /**
   * Optional product ID to filter reviews by.
   * If provided, only reviews for this product will be displayed.
   */
  productId?: string;
  /**
   * Optional user ID to filter reviews by.
   * If provided, only reviews by this user will be displayed.
   */
  userId?: string;
  /**
   * Optional limit for the number of reviews to fetch per page.
   * @default 20
   */
  limit?: number;
  /**
   * Optional offset for pagination, indicating the number of reviews to skip.
   */
  offset?: number;
  /**
   * Optional status to filter reviews by (e.g., "approved", "pending").
   */
  status?: string;
  /**
   * Optional mock reviews data, primarily for testing or development purposes.
   * If provided, this data will be used instead of fetching from the API.
   */
  mockReviews?: Review[];
};

/**
 * ReviewsPage displays a list of all reviews, potentially filtered by product or user.
 * It utilizes PageLayout for overall page structure and ReviewList for displaying the reviews.
 * It handles loading and error states during data fetching.
 */
export function ReviewsPage({
  className,
  productId,
  userId,
  limit = 20, // Default limit for reviews
  offset,
  status,
  mockReviews,
}: ReviewsPageProps): React.JSX.Element {
  const {
    reviews, // Assuming the hook returns a 'reviews' property
    loading,
    error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useListReviews({ // Type assertion might be needed if hook types are not perfectly aligned
    options: {
      productId,
      userId,
      limit,
      offset,
      status,
    },
    mockData: mockReviews,
  }) as any; // Using 'as any' to bypass potential strict type mismatches from the hook's return type.
              // Ideally, the hook's type `UseListReviewsResult` should correctly define `reviews`, `loading`, `error`.

  const pageTitle = "All Reviews"; // Could be made dynamic based on filters in a future iteration

  return (
    <PageLayout title={pageTitle}>
      <div className={classNames(styles.reviewsPage, className)}>
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            Loading reviews...
          </div>
        ) : null}
        {error ? (
          <div className={styles.errorState}>
            <p>Could not load reviews.</p>
            <p className={styles.errorMessage}>Error: {error.message || 'An unknown error occurred.'}</p>
            Please try again later.
          </div>
        ) : null}
        {!loading && !error && (
          // Assuming 'reviews' from the hook is compatible with ReviewList's expected 'reviews' prop type.
          // If 'reviews' from the hook is LocalReview[] and ReviewList expects EntityReview[],
          // this would still be an issue unless the hook itself handles the transformation
          // or ReviewList is tolerant of LocalReview[].
          <ReviewList reviews={reviews} className={styles.reviewListResults} />
        )}
      </div>
    </PageLayout>
  );
}
