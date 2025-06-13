import { useQuery, gql, ApolloError, ApolloQueryResult } from '@apollo/client';
import { ForumPost } from '@infinity/forums.entities.forum-post';
import { useMemo } from 'react';
import type { ListPostsOptionsInput } from './list-posts-options-input-type.js';

const LIST_FORUM_POSTS_QUERY = gql`
  query ListPosts($options: ListPostsOptionsInput!) {
    listPosts(options: $options) {
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
 * Type for the raw data returned by the ListPosts GraphQL query.
 */
type ListPostsQueryData = {
  listPosts: Array<{
    id: string;
    topicId: string;
    content: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

/**
 * Type for the variables used in the ListPosts GraphQL query.
 */
type ListPostsQueryVariables = {
  options: ListPostsOptionsInput;
};

/**
 * Optional parameters for the useListForumPosts hook, primarily for testing.
 */
export type UseListForumPostsOptions = {
  /**
   * Mock data to be used instead of fetching from the server.
   * If provided, the actual GraphQL query will be skipped.
   */
  mockData?: ForumPost[];
};

/**
 * The result type returned by the useListForumPosts hook.
 */
export type UseListForumPostsResult = {
  /**
   * An array of ForumPost entities, or undefined if loading or an error occurred.
   */
  posts: ForumPost[] | undefined;
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
    variables?: Partial<ListPostsQueryVariables>
  ) => Promise<ApolloQueryResult<ListPostsQueryData>>;
};

/**
 * React hook to fetch a list of forum posts for a specific topic.
 * It utilizes GraphQL and Apollo Client for data fetching.
 * Supports pagination through offset and limit parameters.
 *
 * @param variables - The input variables for the query, including topicId, offset, and limit.
 * @param options - Optional configuration, such as providing mockData for testing purposes.
 * @returns An object containing the fetched posts, loading state, error information, and a refetch function.
 */
export function useListForumPosts(
  variables: ListPostsOptionsInput,
  options?: UseListForumPostsOptions
): UseListForumPostsResult {
  const { data, loading, error, refetch } = useQuery< // Was useQuery
    ListPostsQueryData,
    ListPostsQueryVariables
  >(LIST_FORUM_POSTS_QUERY, {
    variables: { options: variables },
    skip: !!options?.mockData,
    fetchPolicy: options?.mockData ? 'standby' : 'cache-first',
  });

  const posts = useMemo(() => {
    if (options?.mockData) {
      return options.mockData;
    }
    return data?.listPosts.map((postData) => ForumPost.from(postData));
  }, [data, options?.mockData]);

  if (options?.mockData) {
    const mockPlainPosts = options.mockData.map(p => p.toObject());
    return {
      posts: options.mockData,
      loading: false,
      error: undefined,
      refetch: (_vars?: Partial<ListPostsQueryVariables>) =>
        Promise.resolve({
          data: { listPosts: mockPlainPosts },
          loading: false,
          networkStatus: 7, // Represents 'ready' state in Apollo Client
        } as ApolloQueryResult<ListPostsQueryData>),
    };
  }

  return {
    posts,
    loading,
    error,
    refetch,
  };
}