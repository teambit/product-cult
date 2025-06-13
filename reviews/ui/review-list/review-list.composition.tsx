import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Review, mockReview } from '@infinity/reviews.entities.review';
import { ReviewList } from './review-list.js';

const commonContainerStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  backgroundColor: 'var(--colors-surface-background)', // Match theme background
  fontFamily: 'var(--typography-font-family)',
};

const reviewsData: Review[] = [
  mockReview({
    id: 'rev-001',
    productId: 'prod-alpha-123',
    userId: 'user-sara-lee-456',
    rating: 5,
    comment:
      'Absolutely love this product! It has streamlined my workflow and the user interface is incredibly intuitive. Highly recommended for anyone in the field. The design is sleek and modern, and it integrated seamlessly with my existing tools. A five-star experience all around!',
    createdAt: new Date('2024-07-15T10:30:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-15T11:00:00.000Z').toISOString(),
    status: 'approved',
  }),
  mockReview({
    id: 'rev-002',
    productId: 'prod-beta-456',
    userId: 'user-mike-chen-789',
    rating: 3,
    comment:
      "It's a decent product with some useful features, but it lacks polish in certain areas. The customer support was helpful, though. Good for basic needs, but I expected a bit more for the price. The onboarding process could also be improved.",
    createdAt: new Date('2024-06-20T14:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-06-21T09:15:00.000Z').toISOString(),
    status: 'approved',
  }),
  mockReview({
    id: 'rev-003',
    productId: 'prod-gamma-789',
    userId: 'user-lisa-kim-101',
    rating: 1,
    comment:
      'Unfortunately, this product did not meet my expectations at all. It was buggy, hard to set up, and customer service was unresponsive. I cannot recommend it. Wasted a lot of time trying to get it to work as advertised.',
    createdAt: new Date('2024-05-10T08:45:00.000Z').toISOString(),
    updatedAt: new Date('2024-05-10T08:45:00.000Z').toISOString(),
    status: 'approved',
  }),
  mockReview({
    id: 'rev-004',
    productId: 'prod-delta-101',
    userId: 'user-tom-baker-112',
    rating: 4,
    comment:
      'Great tool, very effective for project management! The collaboration features are top-notch. A few more customization options would make it perfect.',
    createdAt: new Date('2024-07-01T16:20:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-01T16:20:00.000Z').toISOString(),
    status: 'approved',
  }),
    mockReview({
    id: 'rev-005',
    productId: 'prod-epsilon-113',
    userId: 'user-anna-white-114',
    rating: 5,
    comment:
      'A game-changer for our team! The analytics provided are insightful and have helped us improve our strategies significantly. Setup was a breeze.',
    createdAt: new Date('2024-07-20T09:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-20T09:00:00.000Z').toISOString(),
    status: 'approved',
  }),
];

export const ReviewListWithGrid = () => {
  return (
    <MockProvider>
      <div style={commonContainerStyle}>
        <h2 style={{ color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>Product Reviews (Grid Layout)</h2>
        <ReviewList reviews={reviewsData} layout="grid" />
      </div>
    </MockProvider>
  );
};

export const ReviewListWithListLayout = () => {
  const listReviews = reviewsData.slice(0, 3); // Take first 3 for a shorter list example
  return (
    <MockProvider>
      <div style={commonContainerStyle}>
        <h2 style={{ color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>Product Reviews (List Layout)</h2>
        <ReviewList reviews={listReviews} layout="list" />
      </div>
    </MockProvider>
  );
};

export const EmptyReviewList = () => {
  return (
    <MockProvider>
      <div style={commonContainerStyle}>
         <h2 style={{ color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>No Reviews Yet</h2>
        <ReviewList reviews={[]} />
      </div>
    </MockProvider>
  );
};

export const ReviewListWithSingleReview = () => {
  const singleReview = [reviewsData[0]];
  return (
    <MockProvider>
      <div style={commonContainerStyle}>
        <h2 style={{ color: 'var(--colors-text-primary)', marginBottom: 'var(--spacing-medium)' }}>Single Product Review (Grid)</h2>
        <ReviewList reviews={singleReview} layout="grid" />
        <h2 style={{ color: 'var(--colors-text-primary)', margin: 'var(--spacing-large) 0 var(--spacing-medium) 0' }}>Single Product Review (List)</h2>
        <ReviewList reviews={singleReview} layout="list" />
      </div>
    </MockProvider>
  );
};