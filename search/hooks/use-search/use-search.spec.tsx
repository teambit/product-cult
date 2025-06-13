import { renderHook, act } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useSearch } from './use-search.js';
import { SearchResult } from '@infinity/search.entities.search-result';
import { vi } from 'vitest';

const mockSearchResults = [
  {
    id: '1',
    title: 'Test Product',
    description: 'A product for testing',
    type: 'product',
    data: { url: 'http://example.com' },
    imageUrl: 'http://example.com/image.jpg',
  },
];

describe('useSearch', () => {
  it('should return search results from mock data', async () => {
    const { result } = renderHook(() => useSearch(
      { query: 'test' },
      { mockData: mockSearchResults }
    ), {
      wrapper: MockProvider,
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.results.length).toBe(1);
    expect(result.current.results[0]).toBeInstanceOf(SearchResult);
    expect(result.current.results[0].title).toBe('Test Product');
  });

  it('should refetch and return mock data', async () => {
    const { result } = renderHook(() => useSearch(
      { query: 'test' },
      { mockData: mockSearchResults }
    ), {
      wrapper: MockProvider,
    });

    const refetch = vi.fn(() => Promise.resolve({ data: { search: mockSearchResults } } as any)); // Cast to any to satisfy ApolloQueryResult structure

    result.current.refetch = refetch;

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.results.length).toBe(1);
  });
});