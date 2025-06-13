import { gql, useMutation, ApolloError } from '@apollo/client';
import { Review } from '@infinity/reviews.entities.review';
import type { DeleteReviewOptions } from './delete-review-options-type.js';

const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReview($options: DeleteReviewInput!) {
    deleteReview(options: $options) {
      id # According to schema, deleteReview returns a Review object.
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
 * Options for the useDeleteReview hook itself, for testing purposes.
 */
export type UseDeleteReviewHookOptions = {
  /**
   * A mock function to simulate the delete operation.
   */
  mockFn?: (options: DeleteReviewOptions) => Promise<Review | null>;
};

/**
 * Represents the result of the useDeleteReview hook.
 */
export type UseDeleteReviewResult = [
  (options: DeleteReviewOptions) => Promise<Review | null>,
  {
    data?: Review | null; 
    loading: boolean;
    error?: ApolloError;
  }
];

/**
 * A React hook for deleting an existing review.
 * It provides a function to execute the mutation and tracks the mutation's state.
 * @param hookInternalOptions Optional parameters for the hook, primarily for testing.
 * @returns A tuple containing the mutation function and an object with the mutation state (data, loading, error).
 */
export function useDeleteReview(hookInternalOptions?: UseDeleteReviewHookOptions): UseDeleteReviewResult {
  const [deleteReviewMutationApollo, { data, loading, error }] = useMutation(DELETE_REVIEW_MUTATION);

  const handleDeleteReview = async (options: DeleteReviewOptions): Promise<Review | null> => {
    try {
      if (hookInternalOptions?.mockFn) {
        return await hookInternalOptions.mockFn(options);
      }
      const result = await deleteReviewMutationApollo({
        variables: { options },
      });
      if (result.data?.deleteReview) {
        return Review.from(result.data.deleteReview); 
      }
      return null;
    } catch (err) {
      // console.error('Delete review error:', err);
      return null;
    }
  };
  
  const reviewData = data?.deleteReview ? Review.from(data.deleteReview) : null;

  return [handleDeleteReview, { data: reviewData, loading, error }];
}