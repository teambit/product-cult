import { useMutation, gql } from '@apollo/client';
import type { MutationResult as ApolloMutationResult, FetchResult, MutationFunctionOptions } from '@apollo/client';
import { Launch } from '@infinity/launches.entities.launch';
import type { CreateLaunchVariables } from './create-launch-variables-type.js';

const CREATE_LAUNCH_MUTATION = gql`
  mutation CreateLaunch($options: CreateLaunchOptionsInput!) {
    createLaunch(options: $options) {
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
 * Type for the data structure returned by the createLaunch mutation, with Launch entity.
 */
export type CreateLaunchData = {
  createLaunch?: Launch;
};

/**
 * Represents the result of the createLaunch mutation.
 */
export type CreateLaunchMutationResult = Omit<ApolloMutationResult<CreateLaunchData>, 'data'> & {
  data?: CreateLaunchData;
};

/**
 * Type for the function that executes the createLaunch mutation.
 */
export type CreateLaunchFunction = (
  options?: MutationFunctionOptions<{ createLaunch: Launch /* raw GQL type */ }, CreateLaunchVariables>
) => Promise<FetchResult<CreateLaunchData>>;


/**
 * A React hook for creating a new launch.
 *
 * @returns A tuple containing the mutation execution function and the mutation result object.
 *          The result object's data field contains the created launch, transformed into a Launch entity.
 */
export function useCreateLaunch(): [CreateLaunchFunction, CreateLaunchMutationResult] {
  const [runMutation, mutationResult] = useMutation(
    CREATE_LAUNCH_MUTATION
  );

  const createLaunch: CreateLaunchFunction = async (options) => {
    const result = await runMutation({
      variables: {
        options: options?.variables
      }
    });
    return {
      ...result,
      data: result.data?.createLaunch ? { createLaunch: Launch.from(result.data.createLaunch) } : undefined,
    };
  };

  return [
    createLaunch,
    {
      ...mutationResult,
      data: mutationResult.data?.createLaunch
        ? { createLaunch: Launch.from(mutationResult.data.createLaunch) }
        : undefined,
    },
  ];
}