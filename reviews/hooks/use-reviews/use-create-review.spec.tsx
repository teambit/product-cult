import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useCreateReview } from './use-create-review.js';
import { vi } from 'vitest';
import { Review, mockReview as createMockReviewEntity } from '@infinity/reviews.entities.review';

describe('useCreateReview', () => {
  it('should successfully create a review', async () => {
    const createReviewOptions = {
      productId: 'test-product',
      rating: 5,
      comment: 'This is a test review.',
    };

    const mockSuccessFn = vi.fn(async (options) => {
      return createMockReviewEntity({
        id: 'new-review-id-123',
        productId: options.productId,
        userId: 'mock-user-id- Testa User',
        rating: options.rating,
        comment: options.comment,
        status: 'approved',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    const { result } = renderHook(() => useCreateReview({ mockFn: mockSuccessFn }), {
      wrapper: MockProvider,
    });

    let review;
    await act(async () => {
      review = await result.current[0](createReviewOptions);
    });

    expect(mockSuccessFn).toHaveBeenCalledWith(createReviewOptions);
    expect(review).toBeInstanceOf(Review);
    expect(review?.id).toBe('new-review-id-123');
    expect(review?.productId).toBe(createReviewOptions.productId);
    expect(review?.comment).toBe(createReviewOptions.comment);
  });

  it('should handle create review error', async () => {
    const mockErrorFn = vi.fn(async () => {
      throw new Error('Simulated creation failure');
    });

    const { result } = renderHook(() => useCreateReview({ mockFn: mockErrorFn }), {
      wrapper: MockProvider,
    });

    const createReviewOptions = {
      productId: 'test-product-error',
      rating: 1,
      comment: 'This review should fail.',
    };

    let review;
    await act(async () => {
      review = await result.current[0](createReviewOptions);
    });
    
    expect(mockErrorFn).toHaveBeenCalledWith(createReviewOptions);
    expect(review).toBeNull();
  });
});