import { gql, useQuery } from '@apollo/client';
import type { ApolloError, ApolloQueryResult, OperationVariables } from '@apollo/client';
import { Forum } from '@infinity/forums.entities.forum';
import type { ListForumsOptions } from './list-forums-options-type.js';

/**
 * GraphQL query to list forums.
 */
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

/**
 * Represents the result of the useListForums hook.
 */
export type UseListForumsResult = {
  /**
   * An array of forums. Undefined if the query is loading or an error occurred.
   */
  forums?: Forum[];
  /**
   * Boolean indicating if the query is currently in progress.
   */
  loading: boolean;
  /**
   * Error object if the query failed.
   */
  error?: ApolloError;
  /**
   * Function to refetch the list of forums.
   */
  refetch: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
};

/**
 * Options for the useListForums hook.
 */
export type UseListForumsHookOptions = {
  /**
   * Variables to pass to the listForums query.
   */
  queryOptions?: ListForumsOptions;
  /**
   * Mock data to be used instead of fetching from the server.
   * If provided, the actual GraphQL query will be skipped.
   */
  mockData?: Forum[];
};

/**
 * Custom React hook to fetch a list of forums.
 *
 * @param hookOptions - Optional configuration for the hook, including query variables and mock data.
 * @returns An object containing the list of forums, loading state, error state, and a refetch function.
 */
export function useListForums(hookOptions?: UseListForumsHookOptions): UseListForumsResult {
  const { queryOptions, mockData } = hookOptions || {};

  const { data, loading, error, refetch } = useQuery(LIST_FORUMS_QUERY, {
    variables: { options: queryOptions },
    skip: !!mockData,
  });

  if (mockData) {
    return {
      forums: mockData,
      loading: false,
      error: undefined,
      refetch: async () => ({ data: { listForums: mockData.map(f => f.toObject()) } } as ApolloQueryResult<any>), // Simplified refetch for mock
    };
  }

  const forums = data?.listForums?.map((forumData: any) => Forum.from(forumData));

  return {
    forums,
    loading,
    error,
    refetch,
  };
}