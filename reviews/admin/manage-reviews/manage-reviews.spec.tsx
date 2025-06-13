import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Review, PlainReview } from '@infinity/reviews.entities.review';
import { ManageReviewsPage } from './manage-reviews.js';

const mockReviewsData: PlainReview[] = [
  {
    id: '1',
    productId: 'prod1',
    userId: 'user1',
    rating: 5,
    comment: 'Great product!',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'pending',
  },
];

describe('ManageReviewsPage', () => {
  it('renders the page title', () => {
    const reviews = mockReviewsData.map((review) => Review.from(review));
    const { container } = render(
      <MockProvider>
        <ManageReviewsPage mockReviewsData={reviews} />
      </MockProvider>
    );
    const titleElement = container.querySelector('.mainTitle');
    expect(titleElement).toBeInTheDocument();
    expect((titleElement as HTMLHeadingElement).textContent).toBe('Manage Reviews');
  });

  it('renders loading state when reviews are loading', () => {
    const { container } = render(
      <MockProvider>
        <ManageReviewsPage />
      </MockProvider>
    );
    const loadingElement = container.querySelector('.loadingStateContainer');
    // This assertion depends on MockProvider and useListReviews behavior when no mockData is passed.
    // It assumes a loading state will be briefly visible or handled by Apollo's MockedProvider.
    // If useListReviews immediately returns with loading:false and empty data/error without mockData,
    // this test might need adjustment to specifically mock useListReviews for loading state.
    // For now, we assume that not passing mockReviewsData allows the hook to show its loading state.
    expect(loadingElement).toBeInTheDocument();
  });

  it('renders review list when reviews are available', () => {
    const reviews = mockReviewsData.map((review) => Review.from(review));
    const { container } = render(
      <MockProvider>
        <ManageReviewsPage mockReviewsData={reviews} />
      </MockProvider>
    );

    const reviewListSection = container.querySelector('.reviewListSection');
    expect(reviewListSection).toBeInTheDocument();
  });
});