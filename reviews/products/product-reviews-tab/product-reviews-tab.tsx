import React from 'react';
import classNames from 'classnames';
import { useListReviews } from '@infinity/reviews.hooks.use-reviews';
import { ReviewList } from '@infinity/reviews.ui.review-list';
import type { Review } from '@infinity/reviews.entities.review'; // Changed import
import styles from './product-reviews-tab.module.scss';

/**
 * Props for the ProductReviewsTab component.
 * Defines the properties accepted by the product reviews tab.
 */
export type ProductReviewsTabProps = {
  /**
   * The unique identifier of the product for which to display reviews.
   * This ID is crucial for fetching the relevant set of reviews.
   */
  productId: string;

  /**
   * Optional array of mock Review objects from '@infinity/reviews.entities.review'.
   * If provided, the component will use this data directly, bypassing the actual data fetch.
   * This is primarily intended for testing, storybook integration, or development in isolated environments.
   */
  mockReviewsData?: Review[];

  /**
   * An optional CSS class name to apply to the root element of the component.
   * This allows for further customization and theming by parent components.
   */
  className?: string;

  /**
   * Optional inline React CSSProperties to apply to the root element.
   * While available, it's generally recommended to use SCSS modules via the `className` prop for styling.
   */
  style?: React.CSSProperties;
};

/**
 * ProductReviewsTab is a dedicated UI component designed to display a list of reviews
 * associated with a specific product. It leverages the `useListReviews` hook to fetch
 * review data and employs the `ReviewList` component for rendering the reviews in a
 * visually appealing and organized manner. The component handles loading and error states gracefully.
 */
export function ProductReviewsTab({
  productId,
  mockReviewsData,
  className,
  style,
}: ProductReviewsTabProps): React.JSX.Element {
  const {
    reviews,
    loading,
    error,
  } = useListReviews({
    options: { productId }, // Pass productId to fetch reviews for this specific product
    mockData: mockReviewsData, // Utilize mock data if provided
  });

  const rootClasses = classNames(styles.productReviewsTab, className);

  if (loading) {
    return (
      <div className={rootClasses} style={style}>
        <div className={styles.loadingState}>
          <p>Loading product reviews...</p>
          {/* A subtle spinner or skeleton loader could be integrated here for enhanced UX */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={rootClasses} style={style}>
        <div className={styles.errorState}>
          <p>
            Oops! We couldn&apos;t load the reviews for this product right now.
            Please try again later.
          </p>
          {/* An icon representing an error could visually reinforce the message */}
        </div>
      </div>
    );
  }

  // The ReviewList component is responsible for displaying the list of reviews.
  // It will also handle the scenario where 'reviews' is empty or undefined,
  // typically by showing an "No reviews yet" message.
  return (
    <div className={rootClasses} style={style}>
      <ReviewList reviews={reviews} />
    </div>
  );
}