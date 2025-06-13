import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { ForumsNode } from './forums.node.runtime.js';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';

export function forumsGqlSchema(forumsMain: ForumsNode): GqlSchema {
  return {
    typeDefs: gql`
      type Forum {
        id: ID!
        name: String!
        description: String!
        createdAt: String!
        updatedAt: String!
        imageUrl: String
      }

      type Topic {
        id: ID!
        forumId: ID!
        title: String!
        content: String!
        createdAt: String!
        updatedAt: String!
        userId: ID!
      }

      type Post {
        id: ID!
        topicId: ID!
        content: String!
        createdAt: String!
        updatedAt: String!
        userId: ID!
      }

      input CreateForumOptionsInput {
        name: String!
        description: String!
        imageUrl: String
      }

      input GetForumOptionsInput {
        id: ID!
      }

      input UpdateForumOptionsInput {
        id: ID!
        name: String
        description: String
        imageUrl: String
      }

      input DeleteForumOptionsInput {
        id: ID!
      }

      input ListForumsOptionsInput {
        offset: Int
        limit: Int
        search: String
      }

      input SearchForumsOptionsInput {
        query: String!
        limit: Int
        offset: Int
      }

      input CreateTopicOptionsInput {
        forumId: ID!
        title: String!
        content: String!
      }

      input GetTopicOptionsInput {
        id: ID!
      }

      input UpdateTopicOptionsInput {
        id: ID!
        title: String
        content: String
      }

      input DeleteTopicOptionsInput {
        id: ID!
      }

      input ListTopicsOptionsInput {
        forumId: ID!
        offset: Int
        limit: Int
      }

      input CreatePostOptionsInput {
        topicId: ID!
        content: String!
      }

      input GetPostOptionsInput {
        id: ID!
      }

      input UpdatePostOptionsInput {
        id: ID!
        content: String
      }

      input DeletePostOptionsInput {
        id: ID!
      }

      input ListPostsOptionsInput {
        topicId: ID!
        offset: Int
        limit: Int
      }

      type Query {
        getForum(options: GetForumOptionsInput!): Forum!
        listForums(options: ListForumsOptionsInput): [Forum!]!
        getTopic(options: GetTopicOptionsInput!): Topic!
        listTopics(options: ListTopicsOptionsInput!): [Topic!]!
        getPost(options: GetPostOptionsInput!): Post!
        listPosts(options: ListPostsOptionsInput!): [Post!]!
        searchForums(options: SearchForumsOptionsInput!): [Forum!]!
      }

      type Mutation {
        createForum(options: CreateForumOptionsInput!): Forum!
        updateForum(options: UpdateForumOptionsInput!): Forum!
        deleteForum(options: DeleteForumOptionsInput!): Boolean!
        createTopic(options: CreateTopicOptionsInput!): Topic!
        updateTopic(options: UpdateTopicOptionsInput!): Topic!
        deleteTopic(options: DeleteTopicOptionsInput!): Boolean!
        createPost(options: CreatePostOptionsInput!): Post!
        updatePost(options: UpdatePostOptionsInput!): Post!
        deletePost(options: DeletePostOptionsInput!): Boolean!
      }
    `,
    resolvers: {
      Query: {
        getForum: async (obj, { options }, context) => {
          return forumsMain.getForum(options, context.session?.user);
        },
        listForums: async (obj, { options }, context) => {
          return forumsMain.listForums(options, context.session?.user);
        },
        getTopic: async (obj, { options }, context) => {
          return forumsMain.getTopic(options, context.session?.user);
        },
        listTopics: async (obj, { options }, context) => {
          return forumsMain.listTopics(options, context.session?.user);
        },
        getPost: async (obj, { options }, context) => {
          return forumsMain.getPost(options, context.session?.user);
        },
        listPosts: async (obj, { options }, context) => {
          return forumsMain.listPosts(options, context.session?.user);
        },
        searchForums: async (obj, { options }, context) => {
          return forumsMain.searchForums(options, context.session?.user);
        },
      },
      Mutation: {
        createForum: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return forumsMain.createForum(options, user);
        },
        updateForum: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return forumsMain.updateForum(options, user);
        },
        deleteForum: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          await forumsMain.deleteForum(options, user);
          return true;
        },
        createTopic: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return forumsMain.createTopic(options, user);
        },
        updateTopic: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return forumsMain.updateTopic(options, user);
        },
        deleteTopic: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          await forumsMain.deleteTopic(options, user);
          return true;
        },
        createPost: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return forumsMain.createPost(options, user);
        },
        updatePost: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return forumsMain.updatePost(options, user);
        },
        deletePost: async (obj, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          await forumsMain.deletePost(options, user);
          return true;
        },
      },
    },
  };
}