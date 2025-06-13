import { v4 as uuidv4 } from 'uuid';
import { Review, PlainReview } from './review.js';

/**
 * Creates a mock Review instance.
 * @param overrides Optional partial data to override default mock values.
 * @returns A mock Review instance.
 */
export function mockReview(overrides?: Partial<PlainReview>): Review {
  const now = new Date().toISOString();
  const defaultReview: PlainReview = {
    id: uuidv4(),
    productId: uuidv4(),
    userId: uuidv4(),
    rating: 5,
    comment: 'This is an amazing product! Highly recommended.',
    createdAt: now,
    updatedAt: now,
    status: 'approved',
  };

  return Review.from({ ...defaultReview, ...overrides });
}

/**
 * Creates an array of mock Review instances.
 * @returns An array containing two mock Review instances.
 */
export function mockReviews(): Review[] {
  return [
    mockReview({
      productId: 'product-123',
      userId: 'user-abc',
      rating: 4,
      comment: 'Great product, would buy again.',
      status: 'approved',
    }),
    mockReview({
      productId: 'product-456',
      userId: 'user-def',
      rating: 2,
      comment: 'Not what I expected, had some issues.',
      status: 'pending',
    }),
  ];
}