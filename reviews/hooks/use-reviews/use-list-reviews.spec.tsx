import { renderHook } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useListReviews } from './use-list-reviews.js';
import { mockReviews } from '@infinity/reviews.entities.review';

describe('useListReviews', () => {
  it('should successfully list reviews', async () => {
    const mockData = mockReviews();
    const { result } = renderHook(() => useListReviews({ options: {}, mockData }), {
      wrapper: MockProvider,
    });

    expect(result.current.reviews).toBe(mockData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});