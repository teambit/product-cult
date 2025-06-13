import { useQuery, gql } from '@apollo/client';
import { Launch } from '@infinity/launches.entities.launch';
import type { GetLaunchVariables } from './get-launch-variables-type.js';
import type { UseGetLaunchHookOptions } from './use-get-launch-hook-options-type.js';

const GET_LAUNCH_QUERY = gql`
  query GetLaunch($options: GetLaunchOptionsInput!) {
    getLaunch(options: $options) {
      id
      productId
      name
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
 * Type for the data structure returned by the getLaunch query, with Launch entity.
 */
export type GetLaunchData = {
  getLaunch?: Launch;
};

/**
 * Represents the result of the useGetLaunch hook.
 * It extends ApolloQueryResult, providing processed launch data.
 */
export type UseGetLaunchResult = {
  data?: GetLaunchData;
  variables?: GetLaunchVariables; // User-facing variables type
  loading?: boolean;
  error?: string;
  refetch: (variables?: Partial<GetLaunchVariables>) => Promise<any>;
};

/**
 * A React hook to fetch a single launch by its ID.
 *
 * @param queryVariables - The variables for the query, primarily the launch ID.
 * @param hookOptions - Optional hook configuration, like providing mock data.
 * @returns An object containing the query result (data, loading, error, refetch).
 *          The data field contains the launch, transformed into a Launch entity.
 */
export function useGetLaunch(
  queryVariables: GetLaunchVariables,
  hookOptions?: UseGetLaunchHookOptions
): UseGetLaunchResult {
  const { mockData } = hookOptions || {};
  const { data: rawData, variables: apolloVariables, ...rest } = useQuery(
    GET_LAUNCH_QUERY,
    {
      variables: { options: queryVariables }, // GraphQL schema expects variables under "options"
      skip: !queryVariables || !queryVariables.id || !!mockData,
    }
  );

  if (mockData) {
    const resultData = { getLaunch: mockData };
    const mockResult: UseGetLaunchResult = {
      data: resultData,
      loading: false,
      error: undefined,
      refetch: () => undefined,
    };
    return mockResult;
  }

  const launch = rawData?.getLaunch ? Launch.from(rawData.getLaunch) : undefined;

  const refetchLaunch = async (newVariables?: Partial<GetLaunchVariables>) => {
    // If newVariables are provided, use them; otherwise, use existing queryVariables for the options.
    const refetchApolloVariables = newVariables ? { options: newVariables } : (apolloVariables || { options: queryVariables });
    const result = await rest.refetch(refetchApolloVariables);
    return result.data?.getLaunch ? { getLaunch: Launch.from(result.data.getLaunch) } : undefined;
  };

  return {
    ...rest,
    error: rest.error?.message,
    variables: queryVariables, // Expose user-friendly variables
    data: launch ? { getLaunch: launch } : undefined,
    refetch: refetchLaunch,
  };
}
