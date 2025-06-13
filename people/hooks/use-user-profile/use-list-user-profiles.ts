import { useQuery, gql, ApolloError, ApolloQueryResult, NetworkStatus } from '@apollo/client';
import { UserProfile, PlainUserProfile } from '@infinity/people.entities.user-profile';
import { ListUserProfilesOptionsInput } from './list-user-profiles-options-input-type.js';

/**
 * GraphQL query to list user profiles.
 */
const LIST_USER_PROFILES_QUERY = gql`
  query ListUserProfiles($options: ListUserProfilesOptionsInput) {
    listUserProfiles(options: $options) {
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
 * Defines the options for the useListUserProfiles hook.
 */
export type UseListUserProfilesOptions = {
  /**
   * Variables for the GraphQL query, such as offset, limit, and search term.
   * These options are optional for the query.
   */
  variables?: ListUserProfilesOptionsInput;
  /**
   * If provided, the hook will return this mock data instead of fetching from the server.
   * An array of UserProfile entities.
   */
  mockData?: UserProfile[];
  /**
   * If true, the query will be skipped. Defaults to false.
   */
  skip?: boolean;
};

/**
 * Defines the return structure of the useListUserProfiles hook.
 */
export type UseListUserProfilesReturn = {
  /**
   * An array of fetched user profiles, if available.
   * Instances of UserProfile entity.
   */
  userProfiles?: UserProfile[];
  /**
   * Boolean indicating if the query is currently in flight.
   */
  loading: boolean;
  /**
   * Error object if the query failed.
   */
  error?: ApolloError;
  /**
   * Function to refetch the list of user profiles.
   * Takes optional variables to override the initial ones.
   */
  refetch: (
    variables?: Partial<ListUserProfilesOptionsInput>
  ) => Promise<ApolloQueryResult<{ listUserProfiles: PlainUserProfile[] }>>;
};

/**
 * Custom React hook to list user profiles with optional pagination and search.
 *
 * @param options - Options for the hook, including query variables, mockData, and skip.
 * @returns An object containing userProfiles, loading state, error state, and a refetch function.
 */
export function useListUserProfiles(options?: UseListUserProfilesOptions): UseListUserProfilesReturn {
  const { variables, mockData, skip: explicitSkip } = options || {};
  const effectiveSkip = explicitSkip || !!mockData;
  const { data, loading, error, refetch } = useQuery<{ listUserProfiles: PlainUserProfile[] }, { options?: ListUserProfilesOptionsInput }>(
    LIST_USER_PROFILES_QUERY,
    {
      variables: variables ? { options: variables } : undefined, // GraphQL schema expects variables wrapped in "options"
      skip: effectiveSkip,
      fetchPolicy: 'cache-and-network',
    }
  );

  if (mockData) {
    return {
      userProfiles: mockData,
      loading: false,
      error: undefined,
      refetch: (refetchVariables?: Partial<ListUserProfilesOptionsInput>) =>
        Promise.resolve<ApolloQueryResult<{ listUserProfiles: PlainUserProfile[] }>>({
          data: { listUserProfiles: mockData.map(p => p.toObject()) },
          loading: false,
          networkStatus: NetworkStatus.ready,
        }),
    };
  }

  const userProfiles = data?.listUserProfiles?.map(plainProfile => UserProfile.from(plainProfile));

  return {
    userProfiles,
    loading,
    error,
    refetch: (refetchVariables?: Partial<ListUserProfilesOptionsInput>) => {
      const newVariables = refetchVariables ? { options: { ...variables, ...refetchVariables } } : (variables ? { options: variables } : undefined);
      return refetch(newVariables);
    }
  };
}