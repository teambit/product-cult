import React from 'react';
import classNames from 'classnames';
import { useListReviews, type UseListReviewsOptions } from '@infinity/reviews.hooks.use-reviews';
import { ReviewList } from '@infinity/reviews.ui.review-list';
import type { Review } from './review-type.js';
import styles from './user-reviews-tab.module.scss';

/**
 * Defines the props for the UserReviewsTab component.
 */
export type UserReviewsTabProps = {
  /**
   * The unique identifier of the user whose reviews are to be displayed.
   */
  userId: string;
  /**
   * Optional CSS class name to apply to the root element of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   */
  style?: React.CSSProperties;
  /**
   * Optional mock data for reviews, primarily for testing or storybook environments.
   * If provided, this data will be used instead of fetching from the backend.
   */
  mockReviews?: Review[];
  /**
   * The maximum number of reviews to display per page or fetch initially.
   * @default 10
   */
  reviewsLimit?: number;
};

const DEFAULT_REVIEWS_LIMIT = 10;

/**
 * UserReviewsTab is a component designed to display a list of reviews
 * submitted by a specific user. It fetches reviews using the `useListReviews`
 * hook and displays them using the `ReviewList` component.
 */
export function UserReviewsTab({
  userId,
  className,
  style,
  mockReviews,
  reviewsLimit = DEFAULT_REVIEWS_LIMIT,
}: UserReviewsTabProps): React.JSX.Element {
  const listReviewsOptions: UseListReviewsOptions = {
    options: {
      userId,
      limit: reviewsLimit,
    },
  };

  if (mockReviews) {
    // Assuming Review type from './review-type.js' is made structurally compatible
    // with the Review type expected by useListReviews (including toObject method)
    listReviewsOptions.mockData = mockReviews;
  }

  const {
    reviews, // Changed from `data: reviews`
    loading,
    error,
  } = useListReviews(listReviewsOptions);

  if (loading) {
    return (
      <div
        className={classNames(
          styles.userReviewsTabContainer,
          styles.loadingState,
          className
        )}
        style={style}
      >
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={classNames(
          styles.userReviewsTabContainer,
          styles.errorState,
          className
        )}
        style={style}
      >
        <p className={styles.errorTitle}>Oops! Something went wrong.</p>
        <p className={styles.errorMessage}>
          We couldn&apos;t load the reviews at this moment. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.userReviewsTabContainer, className)}
      style={style}
    >
      <ReviewList reviews={reviews || []} layout="grid" />
    </div>
  );
}