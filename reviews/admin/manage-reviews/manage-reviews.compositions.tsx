import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Review, type PlainReview } from '@infinity/reviews.entities.review';
import { ManageReviewsPage } from './manage-reviews.js';

const mockReviewsForManagement: PlainReview[] = [
  {
    id: 'rev-admin-001',
    productId: 'prod-alpha-123',
    userId: 'user-reviewer-jane',
    rating: 5,
    comment: 'This is an absolutely fantastic product! It has revolutionized my workflow and I cannot recommend it enough. The user interface is intuitive and the features are incredibly powerful. A must-buy for anyone in the industry.',
    createdAt: new Date('2024-07-28T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-28T10:30:00Z').toISOString(),
    status: 'pending',
  },
  {
    id: 'rev-admin-002',
    productId: 'prod-beta-456',
    userId: 'user-critic-john',
    rating: 2,
    comment: 'I found this product to be quite disappointing. It lacks several key features that were advertised and the performance is subpar. Customer support was also unhelpful. I would suggest looking for alternatives.',
    createdAt: new Date('2024-07-27T14:15:00Z').toISOString(),
    updatedAt: new Date('2024-07-27T14:15:00Z').toISOString(),
    status: 'pending',
  },
  {
    id: 'rev-admin-003',
    productId: 'prod-gamma-789',
    userId: 'user-enthusiast-alex',
    rating: 4,
    comment: 'A very solid product with a lot of potential. It meets most of my needs and the team behind it seems dedicated. There are a few rough edges, particularly in the mobile app, but overall, I am satisfied with my purchase.',
    createdAt: new Date('2024-07-26T09:30:00Z').toISOString(),
    updatedAt: new Date('2024-07-26T11:00:00Z').toISOString(),
    status: 'approved', // To show a mix, though admin might filter for 'pending'
  },
  {
    id: 'rev-admin-004',
    productId: 'prod-delta-101',
    userId: 'user-skeptic-maria',
    rating: 1,
    comment: 'This is by far the worst product I have ever used in this category. It is buggy, slow, and crashes constantly. The documentation is non-existent. I strongly advise against purchasing this. Total waste of money.',
    createdAt: new Date('2024-07-29T08:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-29T08:00:00Z').toISOString(),
    status: 'pending',
  },
  {
    id: 'rev-admin-005',
    productId: 'prod-epsilon-112',
    userId: 'user-advocate-sam',
    rating: 3,
    comment: 'An average product. It gets the job done but doesn\'t offer anything particularly innovative or exciting. The pricing is fair for what it provides. Good for basic users, but advanced users might find it lacking.',
    createdAt: new Date('2024-07-25T16:45:00Z').toISOString(),
    updatedAt: new Date('2024-07-25T16:45:00Z').toISOString(),
    status: 'rejected', // To show a mix
  },
];


export const BasicManageReviewsPageWithData = () => {
  const reviews = mockReviewsForManagement.map((review) => Review.from(review));

  return (
    <MockProvider>
      <ManageReviewsPage mockReviewsData={reviews} />
    </MockProvider>
  );
};

export const ManageReviewsPageWithNoReviewsToModerate = () => {
  // Simulate a scenario where all reviews are moderated, or no new reviews exist
  // const noPendingReviews: Review[] = mockReviewsForManagement.filter(r => r.status !== 'pending' && r.status !== 'rejected' && r.status !== 'approved'); // effectively an empty array for 'pending'
  
  // Or more directly, to show the empty state when the hook returns empty or no data matches criteria
  // (assuming the component's internal `useListReviews` would return empty if no 'pending' reviews)
  return (
    <MockProvider>
      <ManageReviewsPage mockReviewsData={[]} />
    </MockProvider>
  );
};

export const ManageReviewsPageWithOnlyPendingItems = () => {
  const reviews = mockReviewsForManagement.map((review) => Review.from(review));
  const pendingReviews: Review[] = reviews.filter(r => r.status === 'pending');

  return (
    <MockProvider>
      <ManageReviewsPage mockReviewsData={pendingReviews} />
    </MockProvider>
  );
};