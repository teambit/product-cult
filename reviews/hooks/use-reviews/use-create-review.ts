import { gql, useMutation, ApolloError } from '@apollo/client';
import { Review } from '@infinity/reviews.entities.review';
import type { CreateReviewOptions } from './create-review-options-type.js';

const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($options: CreateReviewInput!) {
    createReview(options: $options) {
      id
      productId
      userId
      rating
      comment
      createdAt
      updatedAt
      status
    }
  }
`;

/**
 * Options for the useCreateReview hook itself, for testing purposes.
 */
export type UseCreateReviewHookOptions = {
  /**
   * A mock function to simulate the create operation.
   */
  mockFn?: (options: CreateReviewOptions) => Promise<Review | null>;
};

/**
 * Represents the result of the useCreateReview hook.
 */
export type UseCreateReviewResult = [
  (options: CreateReviewOptions) => Promise<Review | null>,
  {
    data?: Review | null;
    loading: boolean;
    error?: ApolloError;
  }
];

/**
 * A React hook for creating a new review.
 * It provides a function to execute the mutation and tracks the mutation's state.
 * @param hookInternalOptions Optional parameters for the hook, primarily for testing.
 * @returns A tuple containing the mutation function and an object with the mutation state (data, loading, error).
 */
export function useCreateReview(hookInternalOptions?: UseCreateReviewHookOptions): UseCreateReviewResult {
  const [createReviewMutationApollo, { data, loading, error }] = useMutation(CREATE_REVIEW_MUTATION);

  const handleCreateReview = async (options: CreateReviewOptions): Promise<Review | null> => {
    try {
      if (hookInternalOptions?.mockFn) {
        return await hookInternalOptions.mockFn(options);
      }
      const result = await createReviewMutationApollo({
        variables: { options },
      });
      if (result.data?.createReview) {
        return Review.from(result.data.createReview);
      }
      return null;
    } catch (err) {
      // If it's an ApolloError, it's already captured by the `error` object from useMutation.
      // Otherwise, if mockFn throws or another error occurs, this catch handles it.
      // console.error('Create review error:', err); // Optional: log other types of errors
      return null;
    }
  };

  const reviewData = data?.createReview ? Review.from(data.createReview) : null;

  return [handleCreateReview, { data: reviewData, loading, error }];
}