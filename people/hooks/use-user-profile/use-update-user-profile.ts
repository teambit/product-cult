import { useMutation, gql, ApolloError, FetchResult } from '@apollo/client';
import { UserProfile, PlainUserProfile } from '@infinity/people.entities.user-profile';
import { UpdateUserProfileOptionsInput } from './update-user-profile-options-input-type.js';

/**
 * GraphQL mutation to update a user profile.
 */
const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUserProfile($options: UpdateUserProfileOptionsInput!) {
    updateUserProfile(options: $options) {
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
 * Defines the structure of the data returned by the updateUserProfile mutation,
 * with the user profile entity transformed.
 */
export type UpdateUserProfileData = {
  /**
   * The updated user profile.
   * Instance of UserProfile entity.
   */
  updateUserProfile?: UserProfile;
};

/**
 * Defines the return structure of the useUpdateUserProfile hook.
 * It's a tuple containing the mutation function and an object with mutation state (data, loading, error).
 */
export type UseUpdateUserProfileReturn = [
  (options: { variables: UpdateUserProfileOptionsInput }) => Promise<FetchResult<UpdateUserProfileData>>,
  {
    /**
     * Data returned by the mutation, containing the updated user profile.
     */
    data?: UpdateUserProfileData;
    /**
     * Boolean indicating if the mutation is currently in flight.
     */
    loading: boolean;
    /**
     * Error object if the mutation failed.
     */
    error?: ApolloError;
  }
];

/**
 * Custom React hook to update a user profile.
 *
 * @returns A tuple:
 *          - The first element is an async function to execute the mutation.
 *            This function takes an object with `variables` (UpdateUserProfileOptionsInput).
 *          - The second element is an object containing the mutation's `data` (transformed),
 *            `loading` state, and `error` state.
 */
export function useUpdateUserProfile(): UseUpdateUserProfileReturn {
  const [mutate, { data: rawData, loading, error }] = useMutation<
    { updateUserProfile: PlainUserProfile }, // Raw GraphQL response type
    { options: UpdateUserProfileOptionsInput } // Variables type
  >(UPDATE_USER_PROFILE_MUTATION);

  const updateUserProfile = async (options: { variables: UpdateUserProfileOptionsInput }) => {
    // GraphQL schema expects variables wrapped in "options"
    const result = await mutate({ variables: { options: options.variables } });
    
    // Transform the raw data from the mutation into UserProfile entity
    const transformedData = result.data?.updateUserProfile
      ? UserProfile.from(result.data.updateUserProfile)
      : undefined;

    return {
      ...result,
      data: transformedData ? { updateUserProfile: transformedData } : undefined,
    };
  };

  // Transform the raw data in the state as well
  const stateData = rawData?.updateUserProfile
    ? { updateUserProfile: UserProfile.from(rawData.updateUserProfile) }
    : undefined;

  return [updateUserProfile, { data: stateData, loading, error }];
}