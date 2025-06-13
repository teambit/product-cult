import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { PeopleNode } from './people.node.runtime.js';
import type { User } from '@infinity/product-hunt-platform.entities.user'; // Import User for context typing

export function peopleGqlSchema(peopleNode: PeopleNode): GqlSchema {
  return {
    typeDefs: gql`
      type UserProfile {
        userId: String!
        name: String!
        imageUrl: String
        bio: String!
        company: String
        email: String
        createdAt: String!
        updatedAt: String
      }

      input GetUserProfileOptionsInput {
        userId: String!
      }

      input UpdateUserProfileOptionsInput {
        bio: String
        displayName: String
        company: String
        imageUrl: String
      }

      input ListUserProfilesOptionsInput {
        offset: Int
        limit: Int
        search: String
      }

      type Query {
        getUserProfile(options: GetUserProfileOptionsInput!): UserProfile!
        listUserProfiles(options: ListUserProfilesOptionsInput): [UserProfile!]
      }

      type Mutation {
        updateUserProfile(options: UpdateUserProfileOptionsInput!): UserProfile!
      }
    `,
    resolvers: {
      Query: {
        getUserProfile: async (req, { options }, context) => {
          const user = context.session?.user as User | undefined;
          const userProfile = await peopleNode.getUserProfile(options, user);
          return userProfile.toObject();
        },
        listUserProfiles: async (req, { options }, context) => {
          const user = context.session?.user as User | undefined;
          const userProfiles = await peopleNode.listUserProfiles(options, user);
          return userProfiles.map((profile) => profile.toObject());
        },
      },
      Mutation: {
        updateUserProfile: async (req, { options }, context) => {
          const user = context.session?.user as User | undefined;
          if (!user) {
            throw new Error('Authentication required.'); // Unauthorized exception handled in node runtime
          }
          const updatedUserProfile = await peopleNode.updateUserProfile(options, user);
          return updatedUserProfile.toObject();
        },
      },
    },
  };
}