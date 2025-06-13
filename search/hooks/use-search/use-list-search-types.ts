import { gql, useQuery, ApolloError, ApolloQueryResult, NetworkStatus } from '@apollo/client';
import type { SearchType } from './search-type-type.js';

const LIST_SEARCH_TYPES_GQL = gql`
  query ListSearchTypes {
    listSearchTypes {
      name
      label
      description
    }
  }
`;

/**
 * Options for the useListSearchTypes hook, allowing for mock data provision.
 */
export type UseListSearchTypesOptions = {
  /**
   * Optional mock data for search types.
   * If provided, the hook will not make a network request.
   */
  mockData?: SearchType[];
};

/**
 * The result type returned by the useListSearchTypes hook.
 */
export type UseListSearchTypesResult = {
  /**
   * An array of SearchType objects. Defaults to an empty array.
   */
  searchTypes: SearchType[];
  /**
   * Boolean indicating if the query is currently in flight.
   */
  loading: boolean;
  /**
   * Error object if the query failed.
   */
  error?: ApolloError;
  /**
   * Function to refetch the list of search types.
   * @returns A promise that resolves with the new query result.
   */
  refetch: () => Promise<ApolloQueryResult<{ listSearchTypes: SearchType[] }>>;
};

/**
 * Custom React hook to fetch the list of available search types.
 * It uses Apollo Client's useQuery and supports mock data for testing.
 *
 * @param hookOptions - Optional configuration for the hook, primarily for providing mock data.
 * @returns An object containing the list of search types, loading state, error information, and a refetch function.
 */
export function useListSearchTypes(
  hookOptions?: UseListSearchTypesOptions
): UseListSearchTypesResult {
  const { data, loading, error, refetch } = useQuery<{ listSearchTypes: SearchType[] }>(
    LIST_SEARCH_TYPES_GQL,
    {
      skip: !!hookOptions?.mockData,
      fetchPolicy: 'cache-and-network',
    }
  );

  if (hookOptions?.mockData) {
    return {
      searchTypes: hookOptions.mockData,
      loading: false,
      error: undefined,
      refetch: async () => {
        // In a mock scenario, refetch resolves with the initial mock data.
        return {
          data: { listSearchTypes: hookOptions.mockData! },
          loading: false,
          networkStatus: NetworkStatus.ready,
        } as ApolloQueryResult<{ listSearchTypes: SearchType[] }>;
      },
    };
  }

  const searchTypes = data?.listSearchTypes || [];

  return {
    searchTypes,
    loading,
    error,
    refetch,
  };
}