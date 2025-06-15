import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { UpvotesNode } from './upvotes.node.runtime.js';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';

/**
 * Creates the GraphQL schema and resolvers for the Upvotes API.
 * @param upvotesNode - The UpvotesNode runtime instance providing the business logic.
 * @returns An object containing the GraphQL type definitions and resolvers.
 */
export function upvotesGqlSchema(upvotesNode: UpvotesNode): GqlSchema {
  return {
    typeDefs: gql`
      type Upvote {
        id: String!
        userId: String!
        itemId: String!
        itemType: String!
        createdAt: String!
      }

      input CreateUpvoteOptionsInput {
        itemId: String!
        itemType: String!
      }

      input DeleteUpvoteOptionsInput {
        itemId: String!
        itemType: String!
      }

      input GetUpvoteOptionsInput {
        id: String!
      }

      input ListUpvotesOptionsInput {
        itemId: String
        itemType: String
        userId: String
        offset: Int
        limit: Int
      }

      input GetUpvoteCountOptionsInput {
        itemId: String!
        itemType: String!
      }

      input GetUserUpvoteStatusOptionsInput {
        itemId: String!
        itemType: String!
      }

      type Query {
        getUpvote(options: GetUpvoteOptionsInput!): Upvote
        listUpvotes(options: ListUpvotesOptionsInput!): [Upvote!]
        getUpvoteCount(options: GetUpvoteCountOptionsInput!): Int!
        getUserUpvoteStatus(options: GetUserUpvoteStatusOptionsInput!): Boolean!
      }

      type Mutation {
        createUpvote(options: CreateUpvoteOptionsInput!): Upvote!
        deleteUpvote(options: DeleteUpvoteOptionsInput!): Upvote!
      }
    `,
    resolvers: {
      Query: {
        /**
         * Resolves the getUpvote query.
         * @param _ - The root object (unused).
         * @param options - Input options for retrieving the upvote.
         * @param context - The GraphQL context, including session and user information.
         * @returns The Upvote object or null if not found.
         */
        getUpvote: async (_, { options }, context) => {
          const user = context.session?.user; // User is optional for public retrieval
          const upvote = await upvotesNode.getUpvote(options, user);
          return upvote ? upvote.toObject() : null;
        },
        /**
         * Resolves the listUpvotes query.
         * @param _ - The root object (unused).
         * @param options - Input options for filtering and paginating upvotes.
         * @param context - The GraphQL context, including session and user information.
         * @returns An array of Upvote objects.
         */
        listUpvotes: async (_, { options }, context) => {
          const user = context.session?.user; // User is optional for public listing
          const upvotes = await upvotesNode.listUpvotes(options, user);
          return upvotes.map((upvote) => upvote.toObject());
        },
        /**
         * Resolves the getUpvoteCount query.
         * @param _ - The root object (unused).
         * @param options - Input options for counting upvotes for a specific item.
         * @returns The count of upvotes as an integer.
         */
        getUpvoteCount: async (_, { options }) => {
          return upvotesNode.getUpvoteCount(options);
        },
        /**
         * Resolves the getUserUpvoteStatus query.
         * @param _ - The root object (unused).
         * @param options - Input options for checking user's upvote status for an item.
         * @param context - The GraphQL context, including session and user information.
         * @returns True if the user has upvoted the item, false otherwise.
         */
        getUserUpvoteStatus: async (_, { options }, context) => {
          const user = context.session?.user;
          return upvotesNode.getUserUpvoteStatus(options, user);
        },
      },
      Mutation: {
        /**
         * Resolves the createUpvote mutation.
         * @param _ - The root object (unused).
         * @param options - Input options for creating the upvote.
         * @param context - The GraphQL context, including session and user information.
         * @returns The newly created Upvote object.
         * @throws Unauthorized if no user is authenticated.
         */
        createUpvote: async (_, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized('Authentication required to create an upvote.');
          const upvote = await upvotesNode.createUpvote(options, user);
          return upvote.toObject();
        },
        /**
         * Resolves the deleteUpvote mutation.
         * @param _ - The root object (unused).
         * @param options - Input options for deleting the upvote.
         * @param context - The GraphQL context, including session and user information.
         * @returns The deleted Upvote object.
         * @throws Unauthorized if no user is authenticated.
         * @throws NotFound if the upvote to delete is not found for the user.
         */
        deleteUpvote: async (_, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized('Authentication required to delete an upvote.');
          const upvote = await upvotesNode.deleteUpvote(options, user);
          return upvote.toObject();
        },
      },
    },
  };
}