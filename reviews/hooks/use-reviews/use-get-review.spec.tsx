import { renderHook } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useGetReview } from './use-get-review.js';
import { mockReview } from '@infinity/reviews.entities.review';

describe('useGetReview', () => {
  it('should successfully get a review', async () => {
    const mockData = mockReview();
    const { result } = renderHook(() => useGetReview({ options: { id: 'test-review-id' }, mockData }), {
      wrapper: MockProvider,
    });

    expect(result.current.review).toBe(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});