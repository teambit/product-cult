
// TODO: Resolve missing package import: @apollo/client
import { useQuery, gql, ApolloError, ApolloQueryResult } from '@apollo/client';
import { ForumPost } from '@infinity/forums.entities.forum-post';
import { useMemo } from 'react';
import type { GetPostOptionsInput } from './get-post-options-input-type.js';

const GET_FORUM_POST_QUERY = gql`
  query GetPost($options: GetPostOptionsInput!) {
    getPost(options: $options) {
      id
      topicId
      content
      userId
      createdAt
      updatedAt
    }
  }
`;

/**
 * Type for the raw data returned by the GetPost GraphQL query.
 */
type GetPostQueryData = {
  getPost: {
    id: string;
    topicId: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
};

/**
 * Type for the variables used in the GetPost GraphQL query.
 */
type GetPostQueryVariables = {
  options: GetPostOptionsInput;
};

/**
 * Optional parameters for the useForumPost hook, primarily for testing.
 */
export type UseForumPostOptions = {
  /**
   * Mock data to be used instead of fetching from the server.
   * If provided, the actual GraphQL query will be skipped.
   */
  mockData?: ForumPost;
};

/**
 * The result type returned by the useForumPost hook.
 */
export type UseForumPostResult = {
  /**
   * The ForumPost entity, or undefined if loading, not found, or an error occurred.
   */
  post: ForumPost | undefined;
  /**
   * Boolean indicating if the query is currently in progress.
   */
  loading: boolean;
  /**
   * An ApolloError object if the query resulted in an error, otherwise undefined.
   */
  error: ApolloError | undefined;
  /**
   * Function to manually refetch the query.
   * Can accept new variables.
   */
  refetch: (
    variables?: Partial<GetPostQueryVariables>
  ) => Promise<ApolloQueryResult<GetPostQueryData>>;
};

/**
 * React hook to fetch a single forum post by its ID.
 * It utilizes GraphQL and Apollo Client for data fetching.
 *
 * @param variables - The input variables for the query, including the post ID.
 * @param options - Optional configuration, such as providing mockData for testing purposes.
 * @returns An object containing the fetched post, loading state, error information, and a refetch function.
 */
export function useForumPost(
  variables: GetPostOptionsInput,
  options?: UseForumPostOptions
): UseForumPostResult {
  const { data, loading, error, refetch } = useQuery<
    GetPostQueryData,
    GetPostQueryVariables
  >(GET_FORUM_POST_QUERY, {
    variables: { options: variables },
    skip: !!options?.mockData,
    fetchPolicy: options?.mockData ? 'standby' : 'cache-first',
  });

  const post = useMemo(() => {
    if (options?.mockData) {
      return options.mockData;
    }
    return data?.getPost ? ForumPost.from(data.getPost) : undefined;
  }, [data, options?.mockData]);

  if (options?.mockData) {
    const mockPlainPost = options.mockData.toObject();
    return {
      post: options.mockData,
      loading: false,
      error: undefined,
      refetch: (_vars?: Partial<GetPostQueryVariables>) =>
        Promise.resolve({
          data: { getPost: mockPlainPost },
          loading: false,
          networkStatus: 7, // Represents 'ready' state in Apollo Client
        } as ApolloQueryResult<GetPostQueryData>),
    };
  }

  return {
    post,
    loading,
    error,
    refetch,
  };
}