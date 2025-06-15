import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useUpvote } from './use-upvote.js';

const ITEM_ID = 'test-item';
const ITEM_TYPE = 'product';

describe('useUpvote', () => {
  it('should initialize with provided initial values', () => {
    const { result } = renderHook(() => useUpvote({
      itemId: ITEM_ID,
      itemType: ITEM_TYPE,
      initialCount: 5,
      initialHasUpvoted: true,
    }), { wrapper: MockProvider });

    expect(result.current.count).toBe(5);
    expect(result.current.hasUpvoted).toBe(true);
  });
});
