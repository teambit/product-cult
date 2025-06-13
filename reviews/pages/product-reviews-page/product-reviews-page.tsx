import React from 'react';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { useListReviews } from '@infinity/reviews.hooks.use-reviews';
import { ReviewList } from '@infinity/reviews.ui.review-list';
import classNames from 'classnames';
import type { Review } from './review-type.js';
import styles from './product-reviews-page.module.scss';

/**
 * Props for the ProductReviewsPage component.
 */
export interface ProductReviewsPageProps {
  /**
   * The unique identifier of the product for which to display reviews.
   * This will typically come from route parameters.
   */
  productId: string;
  /**
   * Optional class name to apply to the root element of the page.
   */
  className?: string;
  /**
   * Optional mock reviews data, primarily for testing or storybook compositions.
   * In a live environment, reviews are fetched based on `productId`.
   */
  mockReviews?: Review[];
}

/**
 * ProductReviewsPage displays a list of reviews for a specific product.
 * It fetches reviews using the `useListReviews` hook and renders them
 * using the `ReviewList` component, all within a standard `PageLayout`.
 */
export function ProductReviewsPage({
  productId,
  className,
  mockReviews,
}: ProductReviewsPageProps): React.JSX.Element {
  const {
    reviews, // Changed from data: reviews
    loading,
    error,
  } = useListReviews({
    options: { productId, limit: 20 }, // Fetch up to 20 reviews for the product
    mockData: mockReviews, // Use mock data if provided (for testing/dev)
  });

  const pageTitle = `Reviews for Product ${productId}`;
  // In a real application, you might fetch the product details to display its name in the title.
  // For example: `Reviews for ${productName || `Product ${productId}`}`.

  return (
    <PageLayout
      title={pageTitle}
      metaDescription={`Read user reviews, feedback, and ratings for product ${productId}. Discover what others think before you decide.`}
      className={classNames(styles.productReviewsPage, className)}
    >
      <div className={styles.contentWrapper}>
        <h1 className={styles.pageHeader}>{pageTitle}</h1>

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            <p className={styles.loadingMessage}>Loading reviews...</p>
          </div>
        ) : error ? (
          <div className={styles.errorContainer}>
            <span className={styles.errorIcon} aria-hidden="true">!</span>
            <p className={styles.errorMessage}>
              We encountered an issue loading reviews for this product.
            </p>
            <p className={styles.errorSubMessage}>
              Please try refreshing the page, or check back later.
            </p>
          </div>
        ) : (
          <ReviewList reviews={reviews || []} layout="list" />
        )}
      </div>
    </PageLayout>
  );
}