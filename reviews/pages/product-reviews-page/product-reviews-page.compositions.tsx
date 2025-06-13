import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductReviewsPage } from './product-reviews-page.js';
import type { Review } from './review-type.js';

const commonProductIdForData = 'prod-airpods-case-001';

const sampleReviews: Review[] = [
  {
    id: 'rev-001',
    productId: commonProductIdForData,
    userId: 'user-reviewer-alice-123',
    rating: 5,
    comment:
      'Absolutely fantastic product! The design is sleek, and it works flawlessly. Integration was seamless. I\'ve been using it daily and it has significantly improved my productivity. Highly recommend to everyone!',
    createdAt: new Date('2024-07-22T10:30:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-22T11:00:00.000Z').toISOString(),
    status: 'approved',
    toObject: function() {
      return {
        id: this.id,
        productId: this.productId,
        userId: this.userId,
        rating: this.rating,
        comment: this.comment,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        status: this.status,
      };
    },
  },
  {
    id: 'rev-002',
    productId: commonProductIdForData,
    userId: 'user-techlover-bob-456',
    rating: 4,
    comment:
      'A very solid product with great features. There are a couple of minor areas for improvement, particularly in the advanced settings, but overall it\'s excellent value for money. Customer support was also quick to respond.',
    createdAt: new Date('2024-07-21T14:15:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-21T14:15:00.000Z').toISOString(),
    status: 'approved',
    toObject: function() {
      return {
        id: this.id,
        productId: this.productId,
        userId: this.userId,
        rating: this.rating,
        comment: this.comment,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        status: this.status,
      };
    },
  },
  {
    id: 'rev-003',
    productId: commonProductIdForData,
    userId: 'user-critic-charlie-789',
    rating: 3,
    comment:
      "It's a decent offering. Performs as advertised for the most part, but it didn't quite 'wow' me. The user interface could be a bit more polished. Good for basic users, but power users might want more.",
    createdAt: new Date('2024-07-20T09:00:00.000Z').toISOString(),
    updatedAt: new Date('2024-07-20T16:45:00.000Z').toISOString(),
    status: 'approved',
    toObject: function() {
      return {
        id: this.id,
        productId: this.productId,
        userId: this.userId,
        rating: this.rating,
        comment: this.comment,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        status: this.status,
      };
    },
  },
];

/**
 * Demonstrates the ProductReviewsPage with a list of mock reviews.
 * The `mockReviews` prop is used to supply data directly to the page.
 */
export const ProductReviewsPageWithSampleReviews = () => (
  <MockProvider>
    <ProductReviewsPage
      productId={commonProductIdForData}
      mockReviews={sampleReviews}
    />
  </MockProvider>
);

/**
 * Demonstrates the ProductReviewsPage when there are no reviews for a product.
 * An empty array is passed to `mockReviews` to simulate this state.
 */
export const ProductReviewsPageEmpty = () => (
  <MockProvider>
    <ProductReviewsPage
      productId="prod-newly-launched-002"
      mockReviews={[]}
    />
  </MockProvider>
);

/**
 * Demonstrates the ProductReviewsPage's behavior when attempting to fetch data.
 * No `mockReviews` are provided, so the component will use its internal `useListReviews` hook.
 * The `MockProvider`'s Apollo `MockedProvider` will handle the request.
 * This typically results in a loading state followed by an error if the specific query isn't
 * explicitly mocked with data in the `MockProvider`'s Apollo setup, thus showing the page's error handling.
 */
export const ProductReviewsPageAttemptingDataFetch = () => (
  <MockProvider>
    <ProductReviewsPage productId="prod-live-data-fetch-003" />
  </MockProvider>
);