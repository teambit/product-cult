import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { SearchNode } from './search.node.runtime.js'; // Corrected import path
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';
import { AccessDenied } from '@bitdev/symphony.exceptions.access-denied';

export function searchGqlSchema(searchNode: SearchNode): GqlSchema {
  return {
    typeDefs: gql`
      scalar JSON

      enum SortOrder {
        ASC
        DESC
      }

      input SearchOptionsInput {
        query: String!
        limit: Int
        offset: Int
        searchType: String
        sortBy: String
        sortOrder: SortOrder
        filters: JSON
      }

      input RegisterSearchTypeOptionsInput {
        name: String!
        label: String!
        description: String!
      }

      input IndexContentOptionsInput {
        type: String!
        id: String!
        data: JSON
      }

      type SearchResult {
        type: String!
        id: String!
        title: String!
        description: String!
        imageUrl: String
        data: JSON
      }

      type SearchType {
        name: String!
        label: String!
        description: String!
      }

      type Query {
        search(options: SearchOptionsInput!): [SearchResult]
        listSearchTypes: [SearchType]
      }

      type Mutation {
        registerSearchType(options: RegisterSearchTypeOptionsInput!): Boolean
        indexContent(options: IndexContentOptionsInput!): Boolean
      }
    `,
    resolvers: {
      // JSON: require('graphql-type-json'),
      Query: {
        search: async (_: any, { options }: { options: any }) => {
          const results = await searchNode.search(options);
          return results.map(result => result.toObject());
        },
        listSearchTypes: async () => {
          return searchNode.listSearchTypes();
        },
      },
      Mutation: {
        registerSearchType: async (_: any, { options }: { options: any }) => {
          searchNode.registerSearchType(options);
          return true;
        },
        indexContent: async (_: any, { options }: { options: any }, context: any) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          // Assuming user must be admin to index content
          if (!user.roles || !user.roles.includes('admin')) {
            throw new AccessDenied('Only administrators can index content.');
          }
          await searchNode.indexContent(options);
          return true;
        },
      },
    },
  };
}