import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { mockReview } from '@infinity/reviews.entities.review';
import { ReviewCard } from './review-card.js';
// NOTE: We cannot directly make `useGetUserProfile` return a specific mock UserProfile
// from the composition without either:
// 1. Modifying ReviewCard to accept UserProfile mock data as a prop to pass to the hook.
// 2. Using `jest.mock` or similar, which is disallowed by the requirements.
// 3. Having MockProvider accept Apollo mocks, which its current API doesn't show.
// Therefore, the user profile part of the card will likely display loading/error/anonymous states
// as handled by ReviewCard's internal logic when the hook doesn't resolve to specific mock data.

const review1 = mockReview({
  id: 'review-1',
  productId: 'prod-alpha',
  userId: 'user-jane-doe', // This userId will be used by useGetUserProfile
  rating: 4,
  comment: 'A really solid product with a few minor quirks. Overall, I would recommend it to others looking for a solution in this space. The UI is clean and intuitive.',
  createdAt: new Date('2024-03-15T10:30:00.000Z').toISOString(),
  updatedAt: new Date('2024-03-15T11:00:00.000Z').toISOString(),
  status: 'approved',
});

const review2 = mockReview({
  id: 'review-2',
  productId: 'prod-beta',
  userId: 'user-john-smith',
  rating: 5,
  comment: 'Absolutely outstanding! This has revolutionized my workflow and saved me countless hours. The feature set is comprehensive, and the customer support was surprisingly responsive and helpful. I\'ve already recommended it to my entire team. If you\'re on the fence, just go for it - you won\'t regret this purchase. It integrates seamlessly with other tools we use daily.',
  createdAt: new Date('2024-02-20T14:00:00.000Z').toISOString(),
  updatedAt: new Date('2024-02-21T09:15:00.000Z').toISOString(),
  status: 'approved',
});

const review3 = mockReview({
  id: 'review-3',
  productId: 'prod-gamma',
  userId: 'user-alex-chen',
  rating: 1,
  comment: 'Unfortunately, this product did not meet my expectations at all. It was difficult to set up and lacked critical features.',
  createdAt: new Date('2024-01-10T08:45:00.000Z').toISOString(),
  updatedAt: new Date('2024-01-10T08:45:00.000Z').toISOString(),
  status: 'approved',
});


export const BasicReviewCard = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', maxWidth: '600px', margin: 'auto' }}>
        <ReviewCard review={review1} />
      </div>
    </MockProvider>
  );
};

export const FullStarsReviewCardWithLongComment = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', maxWidth: '600px', margin: 'auto' }}>
        <ReviewCard review={review2} />
      </div>
    </MockProvider>
  );
};

export const LowRatingReviewCard = () => {
  return (
    <MockProvider>
      <div style={{ padding: 'var(--spacing-large)', maxWidth: '600px', margin: 'auto' }}>
        <ReviewCard review={review3} />
      </div>
    </MockProvider>
  );
};