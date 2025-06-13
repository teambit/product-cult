import React from 'react';
import classNames from 'classnames';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { ProtectedRoute } from '@infinity/product-hunt-platform.ui.protected-route';
import { ReviewList } from '@infinity/reviews.ui.review-list';
import { useListReviews, ListReviewsOptions } from '@infinity/reviews.hooks.use-reviews';
// Note: useUpdateReview and useDeleteReview would be used by the individual action components
// that are assumed to be part of the ReviewList items via platform slot registration.

import styles from './manage-reviews.module.scss';
import type { ManageReviewsPageProps } from './manage-reviews-props-type.js';
import type { Review } from '@infinity/reviews.entities.review';


/**
 * ManageReviewsPage provides an administrative interface for moderating reviews.
 * It displays a list of reviews and assumes that moderation actions (approve, reject, delete)
 * are available within each review item, typically rendered via the ReviewList component
 * which leverages slotted ReviewAction components.
 */
export function ManageReviewsPage({ mockReviewsData, className }: ManageReviewsPageProps) {
  const listOptions: ListReviewsOptions = {
    limit: 50, // Default limit, could be made configurable
    offset: 0, // Default offset for pagination
    // status: 'pending', // Optionally filter for pending reviews if desired for an admin view
  };

  const { reviews, loading, error } = useListReviews({
    options: listOptions,
    mockData: mockReviewsData,
  });

  // The actual mutation logic for approve, reject, delete is assumed to be handled
  // by `ReviewAction` components slotted into the `ReviewCard`s rendered by `ReviewList`.
  // Those action components would use `useUpdateReview` and `useDeleteReview` hooks.
  // If those hooks update the Apollo cache correctly or if the action components
  // manually refetch the list on completion, this page will reflect changes.

  const pageTitle = 'Manage Reviews';
  const pageMetaDescription = 'Administrate and moderate user-submitted reviews for products.';

  return (
    // <ProtectedRoute redirectTo="/login"> {/* Or a specific admin login route */}
      <PageLayout
        title={pageTitle}
        metaDescription={pageMetaDescription}
        className={classNames(styles.manageReviewsPageContainer, className)}
      >
        <div className={styles.contentWrapper}>
          <header className={styles.pageHeader}>
            <h1 className={styles.mainTitle}>{pageTitle}</h1>
            <p className={styles.pageSubtitle}>
              Oversee and moderate user feedback to maintain content quality.
            </p>
          </header>

          {loading && (
            <div className={styles.loadingStateContainer}>
              <div className={styles.spinnerPlaceholder} /> {/* Placeholder for a spinner */}
              <p>Loading reviews...</p>
            </div>
          )}
          {error && (
            <div className={styles.errorStateContainer}>
              <p>Failed to load reviews: {error.message}</p>
              {/* Add a refetch button maybe? For now, simple message. */}
            </div>
          )}

          {!loading && !error && reviews && (
            reviews.length > 0 ? (
              <section className={styles.reviewListSection} aria-labelledby="review-list-heading">
                <h2 id="review-list-heading" className={styles.visuallyHidden}>Review List</h2>
                <ReviewList reviews={reviews as Review[]} layout="list" />
              </section>
            ) : (
              <div className={styles.emptyStateContainer}>
                <div className={styles.emptyStateIcon} /> {/* Placeholder for an icon */}
                <p className={styles.emptyStateText}>No reviews available for moderation at this time.</p>
                <p className={styles.emptyStateSubtext}>Check back later or adjust your filter settings.</p>
              </div>
            )
          )}
        </div>
      </PageLayout>
    // </ProtectedRoute>
  );
}