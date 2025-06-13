import { useMutation, gql } from '@apollo/client';
import type { MutationResult as ApolloMutationResult, FetchResult, MutationFunctionOptions } from '@apollo/client';
import { Launch } from '@infinity/launches.entities.launch'; // Assuming deleteLaunch returns a Launch object as per schema
import type { DeleteLaunchVariables } from './delete-launch-variables-type.js';

const DELETE_LAUNCH_MUTATION = gql`
  mutation DeleteLaunch($options: DeleteLaunchOptionsInput!) {
    deleteLaunch(options: $options) {
      # Per schema, deleteLaunch returns a Launch object.
      # Typically this might be just an ID or a status, but we follow the schema.
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
 * Type for the data structure returned by the deleteLaunch mutation.
 * According to the schema, it returns a Launch object.
 */
export type DeleteLaunchData = {
  deleteLaunch?: Launch; // Or a more specific type if the actual return is just { id: string } or status
};

/**
 * Represents the result of the deleteLaunch mutation.
 */
export type DeleteLaunchMutationResult = Omit<ApolloMutationResult<DeleteLaunchData>, 'data'> & {
  data?: DeleteLaunchData;
};

/**
 * Type for the function that executes the deleteLaunch mutation.
 */
export type DeleteLaunchFunction = (
  options?: MutationFunctionOptions<{ deleteLaunch: Launch /* raw GQL type */ }, DeleteLaunchVariables>
) => Promise<FetchResult<DeleteLaunchData>>;

/**
 * A React hook for deleting a launch.
 *
 * @returns A tuple containing the mutation execution function and the mutation result object.
 *          The result object's data field contains the (theoretically) returned launch data upon deletion, transformed.
 */
export function useDeleteLaunch(): [DeleteLaunchFunction, DeleteLaunchMutationResult] {
  const [runMutation, mutationResult] = useMutation<{ deleteLaunch: Launch /* raw GQL type */ }, DeleteLaunchVariables>(
    DELETE_LAUNCH_MUTATION
  );

  const deleteLaunch: DeleteLaunchFunction = async (options) => {
    const result = await runMutation(options);
    return {
      ...result,
      data: result.data?.deleteLaunch ? { deleteLaunch: Launch.from(result.data.deleteLaunch) } : undefined,
    };
  };

  return [
    deleteLaunch,
    {
      ...mutationResult,
      data: mutationResult.data?.deleteLaunch
        ? { deleteLaunch: Launch.from(mutationResult.data.deleteLaunch) }
        : undefined,
    },
  ];
}