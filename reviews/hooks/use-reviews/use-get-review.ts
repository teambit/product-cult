import { gql, useQuery, ApolloError, OperationVariables } from '@apollo/client';
import { Review } from '@infinity/reviews.entities.review';
import type { GetReviewOptions as GetReviewInputOptions } from './get-review-options-type.js';

const GET_REVIEW_QUERY = gql`
  query GetReview($options: GetReviewInput!) {
    getReview(options: $options) {
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
 * Options for the useGetReview hook, including mock data support.
 */
export type UseGetReviewOptions = {
  /**
   * Input options for fetching the review.
   */
  options: GetReviewInputOptions;
  /**
   * Optional mock data to be used instead of fetching.
   */
  mockData?: Review;
};

/**
 * Represents the result of the useGetReview hook.
 */
export type UseGetReviewResult = {
  /**
   * The fetched review data.
   */
  review?: Review;
  /**
   * Loading state of the query.
   */
  loading: boolean;
  /**
   * Error object if the query fails.
   */
  error?: ApolloError;
  /**
   * Function to refetch the review data.
   */
  refetch: (variables?: Partial<OperationVariables>) => Promise<unknown>;
};

/**
 * A React hook for fetching a single review by its ID.
 * It handles data fetching, loading, and error states, and supports mock data.
 * @param params Parameters for the hook, including query options and optional mock data.
 * @returns An object containing the review data, loading state, error state, and refetch function.
 */
export function useGetReview(params: UseGetReviewOptions): UseGetReviewResult {
  const { options, mockData } = params;

  const { data, loading, error, refetch } = useQuery(GET_REVIEW_QUERY, {
    variables: { options },
    skip: !!mockData,
  });

  if (mockData) {
    return {
      review: mockData,
      loading: false,
      error: undefined,
      refetch: async () => Promise.resolve(), // No-op refetch for mock data
    };
  }

  const review = data?.getReview ? Review.from(data.getReview) : undefined;

  return { review, loading, error, refetch };
}