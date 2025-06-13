import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useUpdateReview } from './use-update-review.js';
import { vi } from 'vitest';
import { Review, mockReview as createMockReviewEntity } from '@infinity/reviews.entities.review';

describe('useUpdateReview', () => {
  it('should successfully update a review', async () => {
    const updateReviewOptions = {
      id: 'test-review-id-to-update',
      rating: 4,
      comment: 'Updated comment for test review.',
    };

    const mockSuccessFn = vi.fn(async (options) => {
      return createMockReviewEntity({
        id: options.id,
        productId: 'existing-product-id', // Assuming product ID doesn't change on update
        userId: 'existing-user-id', // Assuming user ID doesn't change
        rating: options.rating || 0, // Use provided rating or a default
        comment: options.comment || '', // Use provided comment or a default
        status: 'approved',
        createdAt: new Date(Date.now() - 3600000).toISOString(), // Older createdAt
        updatedAt: new Date().toISOString(), // Fresh updatedAt
      });
    });
    
    const { result } = renderHook(() => useUpdateReview({ mockFn: mockSuccessFn }), {
      wrapper: MockProvider,
    });

    let review;
    await act(async () => {
      review = await result.current[0](updateReviewOptions);
    });

    expect(mockSuccessFn).toHaveBeenCalledWith(updateReviewOptions);
    expect(review).toBeInstanceOf(Review);
    expect(review?.id).toBe(updateReviewOptions.id);
    expect(review?.rating).toBe(updateReviewOptions.rating);
    expect(review?.comment).toBe(updateReviewOptions.comment);
  });

  it('should handle update review error', async () => {
    const mockErrorFn = vi.fn(async () => {
      throw new Error('Simulated update failure');
    });

    const { result } = renderHook(() => useUpdateReview({ mockFn: mockErrorFn }), {
      wrapper: MockProvider,
    });

    const updateReviewOptions = {
      id: 'test-review-id-fail-update',
      rating: 1,
      comment: 'This update should fail.',
    };
    
    let review;
    await act(async () => {
      review = await result.current[0](updateReviewOptions);
    });

    expect(mockErrorFn).toHaveBeenCalledWith(updateReviewOptions);
    expect(review).toBeNull();
  });
});