import { renderHook, waitFor } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useGetForum } from './use-get-forum.js';
import { mockForums } from '@infinity/forums.entities.forum';
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';

const GET_FORUM_QUERY = gql`
  query GetForum($options: GetForumOptionsInput!) {
    getForum(options: $options) {
      id
      name
      description
      createdAt
      updatedAt
      imageUrl
    }
  }
`;

describe('useGetForum', () => {
  it('should return a forum', async () => {
    const mockForum = mockForums()[0];
    const mocks = [
      {
        request: {
          query: GET_FORUM_QUERY,
          variables: { options: { id: mockForum.id } },
        },
        result: {
          data: {
            getForum: mockForum.toObject(),
          },
        },
      },
    ];

    const { result } = renderHook(() => useGetForum({ queryOptions: { id: mockForum.id } }), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.forum).toBeDefined();
    expect(result.current.forum?.id).toBe(mockForum.id);
  });

  it('should handle errors', async () => {
    const mockForum = mockForums()[0];

    const mocks = [
      {
        request: {
          query: GET_FORUM_QUERY,
          variables: { options: { id: mockForum.id } },
        },
        error: new Error('Failed to fetch'),
      },
    ];

    const { result } = renderHook(() => useGetForum({ queryOptions: { id: mockForum.id } }), {
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
    const mockForum = mockForums()[0];

    const { result } = renderHook(() => useGetForum({ queryOptions: { id: mockForum.id }, mockData: mockForum }), {
      wrapper: MockProvider,
    });

    expect(result.current.forum).toBeDefined();
    expect(result.current.forum?.id).toBe(mockForum.id);
    expect(result.current.loading).toBe(false);
  });
});