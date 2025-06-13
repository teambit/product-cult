import { useQuery, gql, ApolloError, ApolloQueryResult, NetworkStatus } from '@apollo/client';
import { UserProfile, PlainUserProfile } from '@infinity/people.entities.user-profile';
import { GetUserProfileOptionsInput } from './get-user-profile-options-input-type.js';

/**
 * GraphQL query to fetch a user profile.
 */
const GET_USER_PROFILE_QUERY = gql`
  query GetUserProfile($options: GetUserProfileOptionsInput!) {
    getUserProfile(options: $options) {
      userId
      name
      imageUrl
      bio
      company
      email
      createdAt
      updatedAt
    }
  }
`;

/**
 * Defines the options for the useGetUserProfile hook.
 */
export type UseGetUserProfileOptions = {
  /**
   * Variables for the GraphQL query, requires userId.
   */
  variables: GetUserProfileOptionsInput;
  /**
   * If provided, the hook will return this mock data instead of fetching from the server.
   * The user profile entity that will be returned.
   */
  mockData?: UserProfile;
  /**
   * If true, the query will be skipped. Defaults to false.
   * This is useful for scenarios where the query should not run immediately.
   */
  skip?: boolean;
};

/**
 * Defines the return structure of the useGetUserProfile hook.
 */
export type UseGetUserProfileReturn = {
  /**
   * The fetched user profile, if available.
   * Instance of UserProfile entity.
   */
  userProfile?: UserProfile;
  /**
   * Boolean indicating if the query is currently in flight.
   */
  loading: boolean;
  /**
   * Error object if the query failed.
   */
  error?: ApolloError;
  /**
   * Function to refetch the user profile.
   * Takes optional variables to override the initial ones.
   */
  refetch: (
    variables?: Partial<GetUserProfileOptionsInput>
  ) => Promise<ApolloQueryResult<{ getUserProfile: PlainUserProfile }>>;
};

/**
 * Custom React hook to fetch a single user profile.
 *
 * @param options - Options for the hook, including query variables, mockData, and skip.
 * @returns An object containing the userProfile, loading state, error state, and a refetch function.
 */
export function useGetUserProfile(options: UseGetUserProfileOptions): UseGetUserProfileReturn {
  const { variables, mockData, skip: explicitSkip } = options;
  const effectiveSkip = explicitSkip || !!mockData;

  const { data, loading, error, refetch } = useQuery<{ getUserProfile: PlainUserProfile }, { options: GetUserProfileOptionsInput }>(
    GET_USER_PROFILE_QUERY,
    {
      variables: { options: variables }, // GraphQL schema expects variables wrapped in "options"
      skip: effectiveSkip,
      fetchPolicy: 'cache-and-network', // Ensures data is fresh but uses cache if available
    }
  );

  if (mockData) {
    return {
      userProfile: mockData,
      loading: false,
      error: undefined,
      refetch: (refetchVariables?: Partial<GetUserProfileOptionsInput>) =>
        Promise.resolve({
          data: { getUserProfile: mockData.toObject() },
          loading: false,
          networkStatus: NetworkStatus.ready,
        } as ApolloQueryResult<{ getUserProfile: PlainUserProfile }>),
    };
  }

  const userProfile = data?.getUserProfile ? UserProfile.from(data.getUserProfile) : undefined;

  return {
    userProfile,
    loading,
    error,
    refetch: (refetchVariables?: Partial<GetUserProfileOptionsInput>) => {
      // The refetch function from useQuery expects the full variable structure.
      const newVariables = refetchVariables ? { options: { ...variables, ...refetchVariables } } : undefined;
      return refetch(newVariables);
    }
  };
}