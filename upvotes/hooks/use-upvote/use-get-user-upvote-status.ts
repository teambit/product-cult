import { gql, useQuery, type ApolloError, type ApolloQueryResult } from '@apollo/client';
import type { GetUserUpvoteStatusOptionsType } from './get-user-upvote-status-options-type.js';

const GET_USER_UPVOTE_STATUS_QUERY = gql`
  query GetUserUpvoteStatus($options: GetUserUpvoteStatusOptionsInput!) {
    getUserUpvoteStatus(options: $options)
  }
`;

/**
 * Represents the result of the getUserUpvoteStatus query.
 */
export type UseGetUserUpvoteStatusResult = {
  /**
   * True if the user has upvoted the item, false otherwise. Undefined if loading or error.
   */
  hasUpvoted?: boolean;
  /**
   * True if the query is in progress.
   */
  loading: boolean;
  /**
   * Error object if the query failed.
   */
  error?: ApolloError;
  /**
   * Function to refetch the user's upvote status.
   */
  refetch: (variables?: { options: GetUserUpvoteStatusOptionsType }) => Promise<ApolloQueryResult<{ getUserUpvoteStatus: boolean }>>;
};

/**
 * Options for the useGetUserUpvoteStatus hook.
 */
export type UseGetUserUpvoteStatusOptions = {
  /**
   * Mock data to return instead of fetching.
   * If provided, the hook will not make a network request.
   */
  mockData?: boolean;
};

/**
 * React hook to check if the current user has upvoted a specific item.
 * The user context is typically handled by the GraphQL server based on the request.
 * @param itemId - Identifier of the item.
 * @param itemType - Type of the item (e.g., "product", "launch").
 * @param hookOptions - Optional configuration for the hook, including mockData for testing.
 * @returns An object containing the upvote status, loading state, error state, and refetch function.
 */
export function useGetUserUpvoteStatus(
  itemId: string,
  itemType: string,
  hookOptions?: UseGetUserUpvoteStatusOptions
): UseGetUserUpvoteStatusResult {
  const queryInputOptions: GetUserUpvoteStatusOptionsType = { itemId, itemType };

  const { data, loading, error, refetch } = useQuery<{ getUserUpvoteStatus: boolean }, { options: GetUserUpvoteStatusOptionsType }>(
    GET_USER_UPVOTE_STATUS_QUERY,
    {
      variables: { options: queryInputOptions },
      skip: hookOptions?.mockData !== undefined,
      fetchPolicy: 'network-only', 
    }
  );

  if (hookOptions?.mockData !== undefined) {
    return {
      hasUpvoted: hookOptions.mockData,
      loading: false,
      error: undefined,
      refetch: (variables?: { options: GetUserUpvoteStatusOptionsType }) => 
        Promise.resolve({ data: { getUserUpvoteStatus: hookOptions.mockData as boolean }, loading: false, networkStatus: 7, client: {} as any }),
    };
  }

  return {
    hasUpvoted: data?.getUserUpvoteStatus,
    loading,
    error,
    refetch,
  };
}