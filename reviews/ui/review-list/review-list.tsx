import React from 'react';
import { Review } from '@infinity/reviews.entities.review';
import { ReviewCard } from '@infinity/reviews.ui.review-card';
import styles from './review-list.module.scss';

/**
 * Props for the ReviewList component.
 */
export type ReviewListProps = {
  /**
   * An array of Review objects to display.
   * If undefined or empty, an empty state message will be shown.
   * Defaults to an empty array.
   */
  reviews?: Review[];
  /**
   * Optional layout mode for the review list.
   * 'grid' will display reviews in a responsive grid.
   * 'list' will display reviews in a single column list.
   * Defaults to 'grid'.
   */
  layout?: 'grid' | 'list';
  /**
   * Optional CSS class name to apply to the root element of the component.
   * This allows for custom styling or overrides.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   * Use sparingly; prefer `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};

/**
 * ReviewList displays a collection of product reviews using ReviewCard components.
 * It supports both grid and list layouts, adapting responsively to screen sizes.
 * This component aims to provide a visually appealing and organized way to present user feedback.
 */
export const ReviewList: React.FC<ReviewListProps> = ({
  reviews = [],
  layout = 'grid',
  className,
  style,
}) => {
  if (reviews.length === 0) {
    const emptyStateClasses = [styles.emptyStateContainer, className].filter(Boolean).join(' ');
    return (
      <div className={emptyStateClasses} style={style}>
        <div className={styles.emptyStateContent}>
          {/* Icon placeholder - a relevant icon could be added here */}
          <span className={styles.emptyStateIconPlaceholder} />
          <p className={styles.emptyStateText}>No reviews available yet.</p>
          <p className={styles.emptyStateSubtext}>Be the first to share your thoughts!</p>
        </div>
      </div>
    );
  }

  const listLayoutClass = layout === 'grid' ? styles.gridLayout : styles.listLayout;
  const listContainerClasses = [
    styles.reviewListContainer,
    listLayoutClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={listContainerClasses} style={style}>
      {reviews.map((review) => (
        <div key={review.id} className={styles.reviewListItem}>
          <ReviewCard review={review} className={styles.reviewCardElement} />
        </div>
      ))}
    </div>
  );
};