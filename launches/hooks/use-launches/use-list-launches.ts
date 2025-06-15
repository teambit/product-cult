import { useQuery, gql } from '@apollo/client';
import { Launch } from '@infinity/launches.entities.launch';
import type { ListLaunchesVariables } from './list-launches-variables-type.js';
import type { UseListLaunchesHookOptions } from './use-list-launches-hook-options-type.js';

const LIST_LAUNCHES_QUERY = gql`
  query ListLaunches($options: ListLaunchesOptionsInput) {
    listLaunches(options: $options) {
      id
      productId
      name
      imageUrl
      tagline
      description
      launchDate
      status
      submittedBy
      createdAt
      updatedAt
    }
  }
`;

/**
 * Type for the data structure returned by the listLaunches query, with Launch entities.
 */
export type ListLaunchesData = {
  listLaunches?: Launch[];
};

// Type for the variables object that Apollo Client's useQuery expects for this specific query
type ApolloQueryVariables = { options?: ListLaunchesVariables };


/**
 * Represents the result of the useListLaunches hook.
 */
export type UseListLaunchesResult = {
  error?: string;
  data?: ListLaunchesData;
  loading?: boolean;
  variables?: ListLaunchesVariables; // User-facing variables type
  refetch: (variables?: Partial<ListLaunchesVariables>) => Promise<ListLaunchesData | undefined>;
};

/**
 * A React hook to fetch a list of launches, with optional filtering and pagination.
 *
 * @param queryVariables - Optional variables for filtering and pagination.
 * @param hookOptions - Optional hook configuration, like providing mock data.
 * @returns An object containing the query result (data, loading, error, refetch).
 *          The data field contains launches, transformed into Launch entities.
 */
export function useListLaunches(
  queryVariables?: ListLaunchesVariables,
  hookOptions?: UseListLaunchesHookOptions
): UseListLaunchesResult {
  const { mockData } = hookOptions || {};

  const { data: rawData, variables: apolloVariables, ...rest } = useQuery<{ listLaunches?: Launch[] /* raw GQL type */ }, ApolloQueryVariables>(
    LIST_LAUNCHES_QUERY,
    {
      variables: { options: queryVariables },
      skip: !!mockData, // Skip if mockData is provided
    }
  );

  if (mockData) {
    const resultData = { listLaunches: mockData };
    const mockResult: UseListLaunchesResult = {
      data: resultData,
      // error: undefined,
      // called: true,
      variables: queryVariables, // User-facing variables
      refetch: async (_vars?: Partial<ListLaunchesVariables>) => resultData,
    };

    return mockResult;
  }

  const launches = rawData?.listLaunches?.map(launch => Launch.from(launch));

  const refetchLaunches = async (newVariables?: Partial<ListLaunchesVariables>) => {
    const refetchApolloVariables = newVariables ? { options: newVariables } : (apolloVariables || { options: queryVariables });
    const result = await rest.refetch(refetchApolloVariables);
    return result.data?.listLaunches ? { listLaunches: result.data.listLaunches.map(l => Launch.from(l)) } : undefined;
  };

  return {
    ...rest,
    error: rest.error?.message,
    variables: queryVariables, // Expose user-friendly variables
    data: launches ? { listLaunches: launches } : undefined,
    refetch: refetchLaunches,
  };
}
