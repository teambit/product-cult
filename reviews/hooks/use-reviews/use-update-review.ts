import { gql, useMutation, ApolloError } from '@apollo/client';
import { Review } from '@infinity/reviews.entities.review';
import type { UpdateReviewOptions } from './update-review-options-type.js';

const UPDATE_REVIEW_MUTATION = gql`
  mutation UpdateReview($options: UpdateReviewInput!) {
    updateReview(options: $options) {
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
 * Options for the useUpdateReview hook itself, for testing purposes.
 */
export type UseUpdateReviewHookOptions = {
  /**
   * A mock function to simulate the update operation.
   */
  mockFn?: (options: UpdateReviewOptions) => Promise<Review | null>;
};

/**
 * Represents the result of the useUpdateReview hook.
 */
export type UseUpdateReviewResult = [
  (options: UpdateReviewOptions) => Promise<Review | null>,
  {
    data?: Review | null;
    loading: boolean;
    error?: ApolloError;
  }
];

/**
 * A React hook for updating an existing review.
 * It provides a function to execute the mutation and tracks the mutation's state.
 * @param hookInternalOptions Optional parameters for the hook, primarily for testing.
 * @returns A tuple containing the mutation function and an object with the mutation state (data, loading, error).
 */
export function useUpdateReview(hookInternalOptions?: UseUpdateReviewHookOptions): UseUpdateReviewResult {
  const [updateReviewMutationApollo, { data, loading, error }] = useMutation(UPDATE_REVIEW_MUTATION);

  const handleUpdateReview = async (options: UpdateReviewOptions): Promise<Review | null> => {
    try {
      if (hookInternalOptions?.mockFn) {
        return await hookInternalOptions.mockFn(options);
      }
      const result = await updateReviewMutationApollo({
        variables: { options },
      });
      if (result.data?.updateReview) {
        return Review.from(result.data.updateReview);
      }
      return null;
    } catch (err) {
      // console.error('Update review error:', err);
      return null;
    }
  };

  const reviewData = data?.updateReview ? Review.from(data.updateReview) : null;

  return [handleUpdateReview, { data: reviewData, loading, error }];
}