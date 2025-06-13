import { gql, useQuery, ApolloError, OperationVariables } from '@apollo/client';
import { Review } from '@infinity/reviews.entities.review';
import type { ListReviewsOptions as ListReviewsInputOptions } from './list-reviews-options-type.js';

const LIST_REVIEWS_QUERY = gql`
  query ListReviews($options: ListReviewsInput!) {
    listReviews(options: $options) {
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
 * Options for the useListReviews hook, including mock data support.
 */
export type UseListReviewsOptions = {
  /**
   * Input options for fetching the list of reviews.
   */
  options: ListReviewsInputOptions;
  /**
   * Optional mock data to be used instead of fetching.
   */
  mockData?: Review[];
};

/**
 * Represents the result of the useListReviews hook.
 */
export type UseListReviewsResult = {
  /**
   * The fetched list of reviews.
   */
  reviews?: Review[];
  /**
   * Loading state of the query.
   */
  loading: boolean;
  /**
   * Error object if the query fails.
   */
  error?: ApolloError;
  /**
   * Function to refetch the list of reviews.
   */
  refetch: (variables?: Partial<OperationVariables>) => Promise<unknown>;
};

/**
 * A React hook for fetching a list of reviews.
 * It handles data fetching, loading, and error states, and supports mock data.
 * @param params Parameters for the hook, including query options and optional mock data.
 * @returns An object containing the list of reviews, loading state, error state, and refetch function.
 */
export function useListReviews(params: UseListReviewsOptions): UseListReviewsResult {
  const { options, mockData } = params;

  const { data, loading, error, refetch } = useQuery(LIST_REVIEWS_QUERY, {
    variables: { options },
    skip: !!mockData,
  });

  if (mockData) {
    return {
      reviews: mockData,
      loading: false,
      error: undefined,
      refetch: async () => Promise.resolve(), // No-op refetch for mock data
    };
  }

  const reviews = data?.listReviews
    ? data.listReviews.map((reviewData: any) => Review.from(reviewData))
    : undefined;

  return { reviews, loading, error, refetch };
}