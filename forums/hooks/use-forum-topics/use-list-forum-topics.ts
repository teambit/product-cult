import { gql, useQuery, ApolloError } from '@apollo/client';
import { ForumTopic } from '@infinity/forums.entities.forum-topic';
import type { PlainForumTopic } from '@infinity/forums.entities.forum-topic';

const LIST_FORUM_TOPICS_QUERY = gql`
  query ListForumTopics($options: ListTopicsOptionsInput!) {
    listTopics(options: $options) {
      id
      forumId
      title
      content
      userId
      createdAt
      updatedAt
    }
  }
`;

/**
 * Options for the useListForumTopics hook.
 */
export type UseListForumTopicsOptions = {
  /**
   * The ID of the forum for which to list topics.
   */
  forumId: string;
  /**
   * The number of topics to skip for pagination.
   */
  offset?: number;
  /**
   * The maximum number of topics to return.
   */
  limit?: number;
  /**
   * Optional mock data to use instead of fetching from the server.
   * If provided, the hook will not make a network request.
   */
  mockData?: ForumTopic[];
};

/**
 * Variables for the LIST_FORUM_TOPICS_QUERY.
 */
type ListForumTopicsQueryVariables = {
  options: {
    forumId: string;
    offset?: number;
    limit?: number;
  };
};

/**
 * Result structure from the LIST_FORUM_TOPICS_QUERY.
 */
type ListForumTopicsQueryResult = {
  listTopics: PlainForumTopic[];
};

/**
 * Result of the useListForumTopics hook.
 */
export type UseListForumTopicsResult = {
  /**
   * An array of forum topics. Undefined if data is not yet loaded.
   */
  topics: ForumTopic[] | undefined;
  /**
   * True if the query is in progress, false otherwise.
   */
  loading: boolean;
  /**
   * An ApolloError object if the query failed, undefined otherwise.
   */
  error: ApolloError | undefined;
  /**
   * A function to refetch the list of forum topics.
   * @param variables - Optional new variables for the query.
   * @returns A promise that resolves with the new query result.
   */
  refetch: (
    variables?: Partial<ListForumTopicsQueryVariables>
  ) => Promise<UseListForumTopicsResult>;
};

/**
 * Custom React hook to fetch a list of forum topics for a given forum ID with pagination.
 * It uses GraphQL and Apollo Client for data fetching.
 *
 * @param options - The options for fetching forum topics, including forumId, offset, limit, and optional mockData.
 * @returns An object containing the fetched topics, loading state, error information, and a refetch function.
 */
export function useListForumTopics(
  options: UseListForumTopicsOptions
): UseListForumTopicsResult {
  const { forumId, offset, limit, mockData } = options;
  console.log(forumId, options);

  // Define mockRefetch function that adheres to UseListForumTopicsResult['refetch'] signature
  const mockRefetch = async (
    variables?: Partial<ListForumTopicsQueryVariables>
  ): Promise<UseListForumTopicsResult> => {
    // In a real scenario, this mock refetch could apply variables to filter/paginate mockData.
    // For this implementation, it returns the initial mockData.
    const currentTopics = variables && 'options' in variables && variables.options && 'forumId' in variables.options ? mockData?.filter(t => t.forumId === variables.options?.forumId) : mockData;
    return {
      topics: currentTopics,
      loading: false,
      error: undefined,
      refetch: mockRefetch, // Return itself for subsequent calls
    };
  };

  const {
    data,
    loading,
    error,
    refetch: apolloRefetch,
  } = useQuery<ListForumTopicsQueryResult, ListForumTopicsQueryVariables>(
    LIST_FORUM_TOPICS_QUERY,
    {
      variables: { options: { forumId, offset, limit } },
      skip: !!mockData, // This will be false here due to the early return for mockData
    }
  );

  if (mockData) {
    return {
      topics: mockData,
      loading: false,
      error: undefined,
      refetch: mockRefetch,
    };
  }

  const topics = data?.listTopics.map((topicData) =>
    ForumTopic.from(topicData)
  );

  const typedRefetch = async (
    variables?: Partial<ListForumTopicsQueryVariables>
  ): Promise<UseListForumTopicsResult> => {
    const refetchResult = await apolloRefetch(variables);
    return {
      topics: refetchResult.data?.listTopics.map((topicData) =>
        ForumTopic.from(topicData)
      ),
      loading: refetchResult.loading,
      error: refetchResult.error,
      refetch: typedRefetch,
    };
  };

  return {
    topics,
    loading,
    error,
    refetch: typedRefetch,
  };
}
