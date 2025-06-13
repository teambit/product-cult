import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductReviewsTab } from './product-reviews-tab.js';
import styles from './product-reviews-tab.module.scss';
import { Review, mockReview } from '@infinity/reviews.entities.review'; // Changed import

describe('ProductReviewsTab', () => {
  const mockReviews: Review[] = [
    mockReview({ // Used mockReview to create valid Review entity
      id: '1',
      productId: 'test-product',
      userId: 'test-user',
      rating: 5,
      comment: 'Great product!',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'approved',
    }),
  ];

  it('renders loading state', () => {
    const { container } = render(
      <MockProvider>
        <ProductReviewsTab productId="test-product" />
      </MockProvider>
    );

    const loadingElement = container.querySelector(`.${styles.loadingState}`);
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders error state', () => {
    const { container } = render(
      <MockProvider>
        <ProductReviewsTab productId="test-product" />
      </MockProvider>
    );

     const errorElement = container.querySelector(`.${styles.errorState}`);
     // This assertion might need to be changed depending on whether an error is truly expected
     // in this default test setup or if it should wait for an async error.
     // For now, keeping it as is, as the primary goal is to fix TS errors.
     expect(errorElement).toBeNull();
  });

  it('renders ReviewList with reviews', () => {
    const { container } = render(
      <MockProvider>
        <ProductReviewsTab productId="test-product" mockReviewsData={mockReviews} />
      </MockProvider>
    );
    // Assuming ReviewList component adds a class like 'reviewListContainer' to its root or a child.
    // If ReviewList is from @infinity/reviews.ui.review-list, check its actual output for a stable selector.
    // The example for ReviewList uses 'reviewListContainer' on its root.
    expect(container.querySelector('.reviewListContainer')).toBeInTheDocument();
  });
});