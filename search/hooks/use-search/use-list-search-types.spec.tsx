import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useListSearchTypes } from './use-list-search-types.js';
import { vi } from 'vitest';

const mockSearchTypes = [
  {
    name: 'product',
    label: 'Products',
    description: 'All products',
  },
];

describe('useListSearchTypes', () => {
  it('should return search types from mock data', async () => {
    const { result } = renderHook(() => useListSearchTypes({ mockData: mockSearchTypes }), {
      wrapper: MockProvider,
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.searchTypes.length).toBe(1);
    expect(result.current.searchTypes[0].name).toBe('product');
  });

  it('should refetch and return mock data', async () => {
    const { result } = renderHook(() => useListSearchTypes({ mockData: mockSearchTypes }), {
      wrapper: MockProvider,
    });

    const refetch = vi.fn(() => Promise.resolve({ data: { listSearchTypes: mockSearchTypes } } as any)); // Cast to any to satisfy ApolloQueryResult structure

    result.current.refetch = refetch;

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.searchTypes.length).toBe(1);
  });
});