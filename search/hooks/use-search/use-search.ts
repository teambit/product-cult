import { gql, useQuery, ApolloError, ApolloQueryResult, NetworkStatus } from '@apollo/client';
import { SearchResult, PlainSearchResult } from '@infinity/search.entities.search-result';
import type { SearchOptionsInput } from './search-options-input-type.js';

const SEARCH_QUERY_GQL = gql`
  query Search($options: SearchOptionsInput!) {
    search(options: $options) {
      id
      title
      description
      type
      data
      imageUrl
    }
  }
`;

/**
 * Options for the useSearch hook, allowing for mock data provision.
 */
export type UseSearchOptions = {
  /**
   * Optional mock data to be used instead of fetching from the API.
   * If provided, the hook will not make a network request.
   */
  mockData?: PlainSearchResult[];
};

/**
 * The result type returned by the useSearch hook.
 */
export type UseSearchResult = {
  /**
   * An array of SearchResult entities. Defaults to an empty array.
   */
  results: SearchResult[];
  /**
   * Boolean indicating if the query is currently in flight.
   */
  loading: boolean;
  /**
   * Error object if the query failed.
   */
  error?: ApolloError;
  /**
   * Function to refetch the search query.
   * @param variables - Optional new variables for the query.
   * @returns A promise that resolves with the new query result.
   */
  refetch: (
    variables?: Partial<{ options: SearchOptionsInput }>
  ) => Promise<ApolloQueryResult<{ search: PlainSearchResult[] }>>;
};

/**
 * Custom React hook to fetch search results based on specified options.
 * It utilizes Apollo Client's useQuery for data fetching and supports mock data for testing.
 *
 * @param options - The search parameters (query, limit, offset, etc.).
 * @param hookOptions - Optional configuration for the hook, primarily for providing mock data.
 * @returns An object containing the search results, loading state, error information, and a refetch function.
 */
export function useSearch(
  options: SearchOptionsInput,
  hookOptions?: UseSearchOptions
): UseSearchResult {
  const { data, loading, error, refetch } = useQuery<{ search: PlainSearchResult[] }, { options: SearchOptionsInput }>(
    SEARCH_QUERY_GQL,
    {
      variables: { options },
      skip: !!hookOptions?.mockData,
      fetchPolicy: 'cache-and-network', // Ensures fresh data on subsequent calls and uses cache when available
    }
  );

  if (hookOptions?.mockData) {
    return {
      results: hookOptions.mockData.map(SearchResult.from),
      loading: false,
      error: undefined,
      refetch: async (_variables?: Partial<{ options: SearchOptionsInput }>) => {
        // In a mock scenario, refetch resolves with the initial mock data.
        return {
          data: { search: hookOptions.mockData! },
          loading: false,
          networkStatus: NetworkStatus.ready,
        } as ApolloQueryResult<{ search: PlainSearchResult[] }>;
      },
    };
  }

  const results = data?.search?.map(SearchResult.from) || [];

  return {
    results,
    loading,
    error,
    refetch,
  };
}