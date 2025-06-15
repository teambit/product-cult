import { gql, useQuery, type ApolloError, type ApolloQueryResult } from '@apollo/client';
import type { GetUpvoteCountOptionsType } from './get-upvote-count-options-type.js';

const GET_UPVOTE_COUNT_QUERY = gql`
  query GetUpvoteCount($options: GetUpvoteCountOptionsInput!) {
    getUpvoteCount(options: $options)
  }
`;

/**
 * Represents the result of the getUpvoteCount query.
 */
export type UseGetUpvoteCountResult = {
  /**
   * The number of upvotes for the item. Undefined if loading or error.
   */
  count?: number;
  /**
   * True if the query is in progress.
   */
  loading: boolean;
  /**
   * Error object if the query failed.
   */
  error?: ApolloError;
  /**
   * Function to refetch the upvote count.
   */
  refetch: (variables?: { options: GetUpvoteCountOptionsType }) => Promise<ApolloQueryResult<{ getUpvoteCount: number }>>;
};

/**
 * Options for the useGetUpvoteCount hook.
 */
export type UseGetUpvoteCountOptions = {
  /**
   * Mock data to return instead of fetching.
   * If provided, the hook will not make a network request.
   */
  mockData?: number;
};

/**
 * React hook to fetch the upvote count for a specific item.
 * @param itemId - Identifier of the item.
 * @param itemType - Type of the item (e.g., "product", "launch").
 * @param hookOptions - Optional configuration for the hook, including mockData for testing.
 * @returns An object containing the count, loading state, error state, and refetch function.
 */
export function useGetUpvoteCount(
  itemId: string,
  itemType: string,
  hookOptions?: UseGetUpvoteCountOptions
): UseGetUpvoteCountResult {
  const queryInputOptions: GetUpvoteCountOptionsType = { itemId, itemType };

  const { data, loading, error, refetch } = useQuery<{ getUpvoteCount: number }, { options: GetUpvoteCountOptionsType }>(
    GET_UPVOTE_COUNT_QUERY,
    {
      variables: { options: queryInputOptions },
      skip: hookOptions?.mockData !== undefined, 
      fetchPolicy: 'network-only', 
    }
  );

  if (hookOptions?.mockData !== undefined) {
    return {
      count: hookOptions.mockData,
      loading: false,
      error: undefined,
      refetch: (variables?: { options: GetUpvoteCountOptionsType }) => 
        Promise.resolve({ data: { getUpvoteCount: hookOptions.mockData as number }, loading: false, networkStatus: 7, client: {} as any }),
    };
  }

  return {
    count: data?.getUpvoteCount,
    loading,
    error,
    refetch,
  };
}