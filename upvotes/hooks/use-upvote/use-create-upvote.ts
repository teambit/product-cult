import { useCallback } from 'react';
import { gql, useMutation, ApolloError } from '@apollo/client';
import { Upvote, type PlainUpvote } from '@infinity/upvotes.entities.upvote';
import type { CreateUpvoteOptionsType } from './create-upvote-options-type.js';

const CREATE_UPVOTE_MUTATION = gql`
  mutation CreateUpvote($options: CreateUpvoteOptionsInput!) {
    createUpvote(options: $options) {
      id
      userId
      itemId
      itemType
      createdAt
    }
  }
`;

/**
 * Type for the function returned by useCreateUpvote to execute the mutation.
 * It takes mutation options and returns a promise with the mutation result.
 */
export type CreateUpvoteFunction = (
  options: CreateUpvoteOptionsType
) => Promise<{ data?: { createUpvote: Upvote }; error?: ApolloError }>;


/**
 * Represents the result of the createUpvote mutation hook.
 */
export type UseCreateUpvoteResult = [
  CreateUpvoteFunction,
  {
    /**
     * The created Upvote entity, if the mutation was successful.
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
 * React hook to create an upvote for an item.
 * This hook encapsulates the GraphQL mutation logic for creating an upvote.
 * @returns A tuple containing the mutation execution function and an object with mutation state (data, loading, error, reset).
 */
export function useCreateUpvote(): UseCreateUpvoteResult {
  const [mutate, { data: mutationData, loading, error, reset }] = useMutation<
    { createUpvote: PlainUpvote },
    { options: CreateUpvoteOptionsType }
  >(CREATE_UPVOTE_MUTATION);

  const createUpvote: CreateUpvoteFunction = useCallback(async (options) => {
    try {
      const result = await mutate({ variables: { options } });
      if (result.data?.createUpvote) {
        return { data: { createUpvote: Upvote.from(result.data.createUpvote) } };
      }
      // If result.data is null/undefined but no error was thrown by Apollo,
      // it might indicate a GraphQL error returned in the `errors` array.
      return { data: undefined, error: result.errors && result.errors.length > 0 ? new ApolloError({ graphQLErrors: result.errors }) : undefined };
    } catch (err) {
      // err is typically an ApolloError if the mutation hook itself throws
      return { data: undefined, error: err instanceof ApolloError ? err : new ApolloError({ networkError: err as Error }) };
    }
  }, [mutate]);
  
  const upvoteEntity = mutationData?.createUpvote ? Upvote.from(mutationData.createUpvote) : undefined;

  return [createUpvote, { data: upvoteEntity, loading, error, reset }];
}