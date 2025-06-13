import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Review, PlainReview } from '@infinity/reviews.entities.review';
import { ReviewsPage } from './reviews-page.js';

const mockReviewsData: PlainReview[] = [
  {
    id: 'rev-001',
    productId: 'prod-alpha-123',
    userId: 'user-sara-lee-456',
    rating: 5,
    comment: 'Absolutely love this product! It has streamlined my workflow and the user interface is incredibly intuitive. Highly recommended for anyone in the field. The design is sleek and modern, and it integrated seamlessly with my existing tools. A five-star experience all around!',
    createdAt: '2024-07-15T10:30:00.000Z',
    updatedAt: '2024-07-15T11:00:00.000Z',
    status: 'approved',
  },
  {
    id: 'rev-002',
    productId: 'prod-beta-456',
    userId: 'user-mike-chen-789',
    rating: 3,
    comment: "It's a decent product with some useful features, but it lacks polish in certain areas. The customer support was helpful, though. Good for basic needs, but I expected a bit more for the price. The onboarding process could also be improved.",
    createdAt: '2024-06-20T14:00:00.000Z',
    updatedAt: '2024-06-21T09:15:00.000Z',
    status: 'approved',
  },
  {
    id: 'rev-003',
    productId: 'prod-alpha-123', // Same product ID for filtering example
    userId: 'user-lisa-kim-101',
    rating: 4,
    comment: 'Great tool for its price. Does what it says on the tin. A few more advanced features would be nice, but for the core functionality, it\'s solid. This review is for product alpha-123.',
    createdAt: '2024-05-10T08:45:00.000Z',
    updatedAt: '2024-05-10T08:45:00.000Z',
    status: 'approved',
  },
   {
    id: 'rev-004',
    productId: 'prod-gamma-789',
    userId: 'user-tom-baker-112',
    rating: 2,
    comment: 'Had high hopes, but performance was sluggish and it crashed a few times. Support tickets went unanswered for days. Will look for alternatives.',
    createdAt: '2024-07-01T16:20:00.000Z',
    updatedAt: '2024-07-01T16:20:00.000Z',
    status: 'approved',
  }
];

export const DefaultReviewsPage = () => {
  const reviews = mockReviewsData.map((review) => Review.from(review));
  return (
    <MockProvider>
      <ReviewsPage mockReviews={reviews} />
    </MockProvider>
  );
};

export const FilteredByProductReviewsPage = () => {
  const reviews = mockReviewsData.map((review) => Review.from(review));
  const filteredReviews = reviews.filter(review => review.productId === 'prod-alpha-123');
  return (
    <MockProvider>
      <ReviewsPage
        mockReviews={filteredReviews}
        productId="prod-alpha-123"
      />
    </MockProvider>
  );
};

export const EmptyReviewsPage = () => {
  return (
    <MockProvider>
      <ReviewsPage mockReviews={[]} />
    </MockProvider>
  );
};

// This composition demonstrates the page's behavior when no mock data is provided.
// The `useListReviews` hook will attempt to fetch data.
// In a typical composition environment without specific Apollo mocks for `ListReviewsQuery`,
// this will result in the component's loading state being briefly visible, followed by its error state.
export const LoadingAndErrorStateReviewsPage = () => {
  return (
    <MockProvider>
      <ReviewsPage />
    </MockProvider>
  );
};
