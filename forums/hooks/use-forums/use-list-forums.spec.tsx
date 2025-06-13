import { renderHook, waitFor } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { mockForums } from '@infinity/forums.entities.forum';
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { useListForums } from './use-list-forums.js';

const LIST_FORUMS_QUERY = gql`
  query ListForums($options: ListForumsOptionsInput) {
    listForums(options: $options) {
      id
      name
      description
      createdAt
      updatedAt
      imageUrl
    }
  }
`;

describe('useListForums', () => {
  it('should return a list of forums', async () => {
    const mockData = mockForums();
    const { result } = renderHook(() => useListForums({ mockData }), {
      wrapper: ({ children }) => (
        <MockedProvider addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.forums).toBeDefined();
    expect(result.current.forums?.length).toBe(mockData.length);
  });

  it('should handle errors', async () => {
    const mocks = [
      {
        request: {
          query: LIST_FORUMS_QUERY,
          variables: { options: {} },
        },
        error: new Error('Failed to fetch'),
      },
    ];

    const { result } = renderHook(() => useListForums(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should use mock data if provided', async () => {
    const mockData = mockForums([{ name: 'Mock Forum' }]);

    const { result } = renderHook(() => useListForums({ mockData }), {
      wrapper: MockProvider,
    });

    expect(result.current.forums).toBeDefined();
    expect(result.current.forums?.length).toBe(mockData.length);
    expect(result.current.forums?.[0].name).toBe('Mock Forum');
    expect(result.current.loading).toBe(false);
  });
});