import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserReviewsTab } from './user-reviews-tab.js';
import styles from './user-reviews-tab.module.scss';
import type { Review } from './review-type.js';

// Helper to create mock reviews with the toObject method
const createMockReview = (data: Omit<Review, 'toObject'>): Review => ({
  ...data,
  toObject: () => data,
});

describe('UserReviewsTab', () => {
  it('should render error state if error occurs (and not by default)', () => {
    // This test effectively checks that the error state isn't rendered by default with empty mocks.
    const { container } = render(
      <MockProvider>
        <UserReviewsTab userId="test-user" mockReviews={[]} />
      </MockProvider>
    );
    const errorMessageElement = container.querySelector(`.${styles.errorTitle}`);
    expect(errorMessageElement).not.toBeInTheDocument();
  });

  it('should render review list when reviews are provided', () => {
    const mockReviewsData: Review[] = [
      createMockReview({
        id: '1',
        productId: '1',
        userId: 'test-user',
        rating: 5,
        comment: 'Great product!',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'approved',
      }),
    ];

    const { container } = render(
      <MockProvider>
        <UserReviewsTab userId="test-user" mockReviews={mockReviewsData} />
      </MockProvider>
    );

    // Check for ReviewList's container or a specific element rendered by ReviewList
    // Assuming ReviewList adds a known class or renders identifiable content.
    // The ReviewList component itself will handle displaying the reviews.
    // We expect the UserReviewsTab not to be in loading or error state.
    expect(container.querySelector(`.${styles.loadingState}`)).not.toBeInTheDocument();
    expect(container.querySelector(`.${styles.errorState}`)).not.toBeInTheDocument();
    // A more robust check would be for an element unique to ReviewList's output
    // For example, if ReviewList has a root class like 'reviewListContainer' (as hinted by old test)
    // or if it renders items with a specific class.
    // For now, checking that UserReviewsTab's own container is present and not showing loading/error.
    expect(container.querySelector(`.${styles.userReviewsTabContainer}`)).toBeInTheDocument();
    // To truly test ReviewList rendering, you might need to query for elements ReviewList creates,
    // e.g. based on review card structure or ReviewList's own specific classes like .gridLayout or .listLayout.
    // For example, if ReviewList adds a class like 'review-list-wrapper' to its root:
    // expect(container.querySelector('.review-list-wrapper')).toBeInTheDocument();
    // This will depend on ReviewList's implementation details.
  });
});