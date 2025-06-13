import { gql, useQuery } from '@apollo/client';
import type { ApolloError, ApolloQueryResult, OperationVariables } from '@apollo/client';
import { Forum } from '@infinity/forums.entities.forum';
import type { GetForumOptions } from './get-forum-options-type.js';

/**
 * GraphQL query to get a single forum by ID.
 */
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

/**
 * Represents the result of the useGetForum hook.
 */
export type UseGetForumResult = {
  /**
   * The fetched forum. Undefined if the query is loading, an error occurred, or the forum was not found.
   */
  forum?: Forum;
  /**
   * Boolean indicating if the query is currently in progress.
   */
  loading: boolean;
  /**
   * Error object if the query failed.
   */
  error?: ApolloError;
  /**
   * Function to refetch the forum.
   */
  refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
};

/**
 * Options for the useGetForum hook.
 */
export type UseGetForumHookOptions = {
  /**
   * Variables to pass to the getForum query, requires an ID.
   */
  queryOptions: GetForumOptions;
  /**
   * Mock data to be used instead of fetching from the server.
   * If provided, the actual GraphQL query will be skipped.
   */
  mockData?: Forum;
};

/**
 * Custom React hook to fetch a single forum by its ID.
 *
 * @param hookOptions - Configuration for the hook, including query variables (ID is required) and optional mock data.
 * @returns An object containing the forum, loading state, error state, and a refetch function.
 */
export function useGetForum(hookOptions: UseGetForumHookOptions): UseGetForumResult {
  const { queryOptions, mockData } = hookOptions;

  const { data, loading, error, refetch } = useQuery(GET_FORUM_QUERY, {
    variables: { options: queryOptions },
    skip: !queryOptions.id || !!mockData, // Skip if no ID or if mockData is provided
  });

  if (mockData) {
    return {
      forum: mockData,
      loading: false,
      error: undefined,
      refetch: async () => ({ data: { getForum: mockData.toObject() } } as ApolloQueryResult<any>), // Simplified refetch for mock
    };
  }

  const forum = data?.getForum ? Forum.from(data.getForum) : undefined;

  return {
    forum,
    loading,
    error,
    refetch,
  };
}