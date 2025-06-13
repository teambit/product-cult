import { useMutation, gql } from '@apollo/client';
import type { MutationResult as ApolloMutationResult, FetchResult, MutationFunctionOptions } from '@apollo/client';
import { Launch } from '@infinity/launches.entities.launch';
import type { UpdateLaunchVariables } from './update-launch-variables-type.js';

const UPDATE_LAUNCH_MUTATION = gql`
  mutation UpdateLaunch($options: UpdateLaunchOptionsInput!) {
    updateLaunch(options: $options) {
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
 * Type for the data structure returned by the updateLaunch mutation, with Launch entity.
 */
export type UpdateLaunchData = {
  updateLaunch?: Launch;
};

/**
 * Represents the result of the updateLaunch mutation.
 */
export type UpdateLaunchMutationResult = Omit<ApolloMutationResult<UpdateLaunchData>, 'data'> & {
  data?: UpdateLaunchData;
};

/**
 * Type for the function that executes the updateLaunch mutation.
 */
export type UpdateLaunchFunction = (
  options?: MutationFunctionOptions<{ updateLaunch: Launch /* raw GQL type */ }, UpdateLaunchVariables>
) => Promise<FetchResult<UpdateLaunchData>>;

/**
 * A React hook for updating an existing launch.
 *
 * @returns A tuple containing the mutation execution function and the mutation result object.
 *          The result object's data field contains the updated launch, transformed into a Launch entity.
 */
export function useUpdateLaunch(): [UpdateLaunchFunction, UpdateLaunchMutationResult] {
  const [runMutation, mutationResult] = useMutation<{ updateLaunch: Launch /* raw GQL type */ }, UpdateLaunchVariables>(
    UPDATE_LAUNCH_MUTATION
  );

  const updateLaunch: UpdateLaunchFunction = async (options) => {
    const result = await runMutation(options);
    return {
      ...result,
      data: result.data?.updateLaunch ? { updateLaunch: Launch.from(result.data.updateLaunch) } : undefined,
    };
  };

  return [
    updateLaunch,
    {
      ...mutationResult,
      data: mutationResult.data?.updateLaunch
        ? { updateLaunch: Launch.from(mutationResult.data.updateLaunch) }
        : undefined,
    },
  ];
}