import { Review } from './review.js';
import { mockReview } from './review.mock.js';

describe('Review', () => {
  it('should create a Review instance from a plain object', () => {
    const plainReview = {
      id: '123',
      productId: '456',
      userId: '789',
      rating: 5,
      comment: 'Great product',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
      status: 'approved',
    };
    const review = Review.from(plainReview);
    expect(review).toBeInstanceOf(Review);
  });

  it('should serialize a Review instance to a plain object', () => {
    const review = mockReview();
    const plainObject = review.toObject();
    expect(plainObject.id).toBe(review.id);
    expect(plainObject.productId).toBe(review.productId);
    expect(plainObject.userId).toBe(review.userId);
    expect(plainObject.rating).toBe(review.rating);
    expect(plainObject.comment).toBe(review.comment);
    expect(plainObject.createdAt).toBe(review.createdAt);
    expect(plainObject.updatedAt).toBe(review.updatedAt);
    expect(plainObject.status).toBe(review.status);
  });
});