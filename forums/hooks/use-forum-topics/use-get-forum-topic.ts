import { gql, useQuery, ApolloError } from '@apollo/client';
import { ForumTopic } from '@infinity/forums.entities.forum-topic';
import type { PlainForumTopic } from '@infinity/forums.entities.forum-topic';

const GET_FORUM_TOPIC_QUERY = gql`
  query GetForumTopic($options: GetTopicOptionsInput!) {
    getTopic(options: $options) {
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
 * Options for the useGetForumTopic hook.
 */
export type UseGetForumTopicOptions = {
  /**
   * The ID of the forum topic to fetch.
   */
  id: string;
  /**
   * Optional mock data to use instead of fetching from the server.
   * If provided, the hook will not make a network request.
   */
  mockData?: ForumTopic;
};

/**
 * Variables for the GET_FORUM_TOPIC_QUERY.
 */
type GetForumTopicQueryVariables = {
  options: {
    id: string;
  };
};

/**
 * Result structure from the GET_FORUM_TOPIC_QUERY.
 */
type GetForumTopicQueryResult = {
  getTopic: PlainForumTopic;
};

/**
 * Result of the useGetForumTopic hook.
 */
export type UseGetForumTopicResult = {
  /**
   * The fetched forum topic. Undefined if data is not yet loaded or if the topic is not found.
   */
  topic: ForumTopic | undefined;
  /**
   * True if the query is in progress, false otherwise.
   */
  loading: boolean;
  /**
   * An ApolloError object if the query failed, undefined otherwise.
   */
  error: ApolloError | undefined;
  /**
   * A function to refetch the forum topic.
   * @param variables - Optional new variables for the query.
   * @returns A promise that resolves with the new query result.
   */
  refetch: (
    variables?: Partial<GetForumTopicQueryVariables>
  ) => Promise<UseGetForumTopicResult>;
};

/**
 * Custom React hook to fetch a single forum topic by its ID.
 * It uses GraphQL and Apollo Client for data fetching.
 *
 * @param options - The options for fetching the forum topic, including its ID and optional mockData.
 * @returns An object containing the fetched topic, loading state, error information, and a refetch function.
 */
export function useGetForumTopic(
  options: UseGetForumTopicOptions
): UseGetForumTopicResult {
  const { id, mockData } = options;

  const mockRefetch = async (
    variables?: Partial<GetForumTopicQueryVariables>
  ): Promise<UseGetForumTopicResult> => {
    // If variables.options.id is different from initial mockData.id, this mock refetch would ideally fetch new mock data.
    // For simplicity, it returns the initial mockData if variables are not changing the ID, or undefined if they do and no new mock is found.
    const currentTopic = (variables?.options?.id && mockData?.id !== variables.options.id) ? undefined : mockData;
    return {
      topic: currentTopic,
      loading: false,
      error: undefined,
      refetch: mockRefetch,
    };
  };

  const {
    data,
    loading,
    error,
    refetch: apolloRefetch,
  } = useQuery<GetForumTopicQueryResult, GetForumTopicQueryVariables>(
    GET_FORUM_TOPIC_QUERY,
    {
      variables: { options: { id } },
      skip: !!mockData, // This will be false here
    }
  );

  if (mockData) {
    return {
      topic: mockData,
      loading: false,
      error: undefined,
      refetch: mockRefetch,
    };
  }

  const topic = data?.getTopic ? ForumTopic.from(data.getTopic) : undefined;

  const typedRefetch = async (
    variables?: Partial<GetForumTopicQueryVariables>
  ): Promise<UseGetForumTopicResult> => {
    const refetchResult = await apolloRefetch(variables);
    return {
      topic: refetchResult.data?.getTopic
        ? ForumTopic.from(refetchResult.data.getTopic)
        : undefined,
      loading: refetchResult.loading,
      error: refetchResult.error,
      refetch: typedRefetch,
    };
  };

  return {
    topic,
    loading,
    error,
    refetch: typedRefetch,
  };
}
