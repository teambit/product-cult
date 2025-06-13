import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useDeleteReview } from './use-delete-review.js';
import { vi } from 'vitest';
import { Review, mockReview as createMockReviewEntity } from '@infinity/reviews.entities.review';

describe('useDeleteReview', () => {
  it('should successfully delete a review', async () => {
    const deleteReviewOptions = {
      id: 'test-review-id-to-delete',
    };

    const mockSuccessFn = vi.fn(async (options) => {
      // Simulate a successful deletion, returning the deleted Review instance (or its representation)
      return createMockReviewEntity({
        id: options.id,
        // Fill other fields as if it was fetched before deletion
        productId: 'prod-1',
        userId: 'user-1',
        rating: 5,
        comment: 'Old comment',
        status: 'deleted', // Or keep original status if API does so
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    const { result } = renderHook(() => useDeleteReview({ mockFn: mockSuccessFn }), {
      wrapper: MockProvider,
    });

    let review;
    await act(async () => {
      review = await result.current[0](deleteReviewOptions);
    });

    expect(mockSuccessFn).toHaveBeenCalledWith(deleteReviewOptions);
    expect(review).toBeInstanceOf(Review);
    expect(review?.id).toBe(deleteReviewOptions.id);
  });

  it('should handle delete review error', async () => {
    const mockErrorFn = vi.fn(async () => {
      throw new Error('Simulated deletion failure');
    });
    
    const { result } = renderHook(() => useDeleteReview({ mockFn: mockErrorFn }), {
      wrapper: MockProvider,
    });

    const deleteReviewOptions = {
      id: 'test-review-id-fail-delete',
    };

    let review;
    await act(async () => {
      review = await result.current[0](deleteReviewOptions);
    });

    expect(mockErrorFn).toHaveBeenCalledWith(deleteReviewOptions);
    expect(review).toBeNull();
  });
});