import { gql, useMutation, ApolloError } from '@apollo/client';
import { Upvote, type PlainUpvote } from '@infinity/upvotes.entities.upvote';
import { useCallback } from 'react';
import type { DeleteUpvoteOptionsType } from './delete-upvote-options-type.js';

const DELETE_UPVOTE_MUTATION = gql`
  mutation DeleteUpvote($options: DeleteUpvoteOptionsInput!) {
    deleteUpvote(options: $options) {
      id
      userId
      itemId
      itemType
      createdAt
    }
  }
`;

/**
 * Type for the function returned by useDeleteUpvote to execute the mutation.
 * It takes mutation options and returns a promise with the mutation result.
 */
export type DeleteUpvoteFunction = (
  options: DeleteUpvoteOptionsType
) => Promise<{ data?: { deleteUpvote: Upvote }; error?: ApolloError }>;


/**
 * Represents the result of the deleteUpvote mutation hook.
 */
export type UseDeleteUpvoteResult = [
  DeleteUpvoteFunction,
  {
    /**
     * The deleted Upvote entity, if the mutation was successful.
     * This represents the state of the upvote before it was deleted.
     */
    data?: Upvote;
    /**
     * True if the mutation is in progress.
     */
    loading: boolean;
    /**
     * Error object if the mutation failed.
     */
    error?: ApolloError;
    /**
     * Function to reset the mutation state.
     */
    reset: () => void;
  }
];

/**
 * React hook to delete an upvote for an item (effectively acting as a downvote).
 * This hook encapsulates the GraphQL mutation logic for deleting an upvote.
 * @returns A tuple containing the mutation execution function and an object with mutation state (data, loading, error, reset).
 */
export function useDeleteUpvote(): UseDeleteUpvoteResult {
  const [mutate, { data: mutationData, loading, error, reset }] = useMutation<
    { deleteUpvote: PlainUpvote },
    { options: DeleteUpvoteOptionsType }
  >(DELETE_UPVOTE_MUTATION);

  const deleteUpvote: DeleteUpvoteFunction = useCallback(async (options) => {
    try {
      const result = await mutate({ variables: { options } });
      if (result.data?.deleteUpvote) {
        return { data: { deleteUpvote: Upvote.from(result.data.deleteUpvote) } };
      }
      return { data: undefined, error: result.errors && result.errors.length > 0 ? new ApolloError({ graphQLErrors: result.errors }) : undefined };
    } catch (err) {
      return { data: undefined, error: err instanceof ApolloError ? err : new ApolloError({ networkError: err as Error }) };
    }
  }, [mutate]);

  const upvoteEntity = mutationData?.deleteUpvote ? Upvote.from(mutationData.deleteUpvote) : undefined;

  return [deleteUpvote, { data: upvoteEntity, loading, error, reset }];
}