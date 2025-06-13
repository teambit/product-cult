import type { Review } from '@infinity/reviews.entities.review';

/**
 * Props for the ManageReviewsPage component.
 */
export type ManageReviewsPageProps = {
  /**
   * Optional CSS class name to apply to the root element of the page.
   * This allows for custom styling or overrides from parent components.
   */
  className?: string;

  /**
   * Optional mock data for reviews.
   * If provided, this data will be used by the `useListReviews` hook for development or testing purposes,
   * bypassing actual data fetching.
   */
  mockReviewsData?: Review[];
};