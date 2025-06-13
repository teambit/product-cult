import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserReviewsTab } from './user-reviews-tab.js'; // Adjusted path if index.js is the entry
import type { Review } from './review-type.js';

const commonContainerStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  backgroundColor: 'var(--colors-surface-background)',
  fontFamily: 'var(--typography-font-family)',
  minHeight: '400px', // Ensure sufficient space for review cards
};

const commonHeadingStyle: React.CSSProperties = {
  color: 'var(--colors-text-primary)',
  fontFamily: 'var(--typography-font-family)',
  fontSize: 'var(--typography-sizes-heading-h3)',
  marginBottom: 'var(--spacing-medium)',
  borderBottom: `1px solid var(--colors-border-default)`,
  paddingBottom: 'var(--spacing-small)',
};

const janeDoeReviewsData = [
  {
    id: 'review-j-001',
    productId: 'product-alpha-123',
    userId: 'user-jane-doe',
    rating: 5,
    comment: "Absolutely love this product! It has streamlined my workflow and the user interface is incredibly intuitive. Highly recommended for anyone in the field. The design is sleek and modern.",
    createdAt: new Date('2024-07-15T10:30:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-15T11:00:00.000Z').toISOString(),
    status: 'approved',
  },
  {
    id: 'review-j-002',
    productId: 'product-beta-456',
    userId: 'user-jane-doe',
    rating: 4,
    comment: "Great tool, very effective for project management! The collaboration features are top-notch. A few more customization options would make it perfect, but overall it's solid.",
    createdAt: new Date('2024-07-01T16:20:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-01T16:20:00.000Z').toISOString(),
    status: 'approved',
  },
  {
    id: 'review-j-003',
    productId: 'product-gamma-789',
    userId: 'user-jane-doe',
    rating: 5,
    comment: "A game-changer for our team! The analytics provided are insightful and have helped us improve our strategies significantly. Setup was a breeze, and it integrated well with existing tools.",
    createdAt: new Date('2024-06-20T09:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-06-20T09:00:00.000Z').toISOString(),
    status: 'approved',
  },
  {
    id: 'review-j-004',
    productId: 'product-delta-101',
    userId: 'user-jane-doe',
    rating: 3,
    comment: "It's a decent product with some useful features, but it lacks polish in certain areas. Good for basic needs, but I expected a bit more for the price point. Customer support was responsive.",
    createdAt: new Date('2024-05-10T14:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-05-11T09:15:00.000Z').toISOString(),
    status: 'approved',
  }
];

const createReviewObject = (data: Omit<Review, 'toObject'>): Review => {
  return {
    ...data,
    toObject: () => data,
  };
};

const janeDoeReviews: Review[] = janeDoeReviewsData.map(createReviewObject);

export const BasicUserReviewsTab = () => (
  <MockProvider>
    <div style={commonContainerStyle}>
      <h2 style={commonHeadingStyle}>
        Jane Doe&apos;s Reviews (Recent 2)
      </h2>
      <UserReviewsTab userId="user-jane-doe" mockReviews={janeDoeReviews.slice(0, 2)} />
    </div>
  </MockProvider>
);

export const EmptyUserReviewsTab = () => (
  <MockProvider>
    <div style={commonContainerStyle}>
      <h2 style={commonHeadingStyle}>
        John Smith&apos;s Reviews (None Yet)
      </h2>
      <UserReviewsTab userId="user-john-smith" mockReviews={[]} />
    </div>
  </MockProvider>
);

export const UserReviewsTabWithAllReviewsAndLimit = () => (
  <MockProvider>
    <div style={commonContainerStyle}>
      <h2 style={commonHeadingStyle}>
        Jane Doe&apos;s Reviews (All 4, Limit Set to 5)
      </h2>
      <UserReviewsTab userId="user-jane-doe" mockReviews={janeDoeReviews} reviewsLimit={5} />
    </div>
  </MockProvider>
);