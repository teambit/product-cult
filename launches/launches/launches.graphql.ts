import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { LaunchesNode } from './launches.node.runtime.js';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';

export function launchesGqlSchema(launchesMain: LaunchesNode): GqlSchema {
  return {
    typeDefs: gql`
      type Launch {
        id: String!
        productId: String!
        name: String!
        tagline: String!
        description: String!
        launchDate: String!
        status: String!
        submittedBy: String!
        createdAt: String
        updatedAt: String
      }

      input CreateLaunchOptionsInput {
        productId: String!
        name: String!
        tagline: String!
        description: String!
        launchDate: String!
      }

      input GetLaunchOptionsInput {
        id: String!
      }

      input UpdateLaunchOptionsInput {
        id: String!
        name: String
        tagline: String
        description: String
        launchDate: String
        status: String
      }

      input DeleteLaunchOptionsInput {
        id: String!
      }

      input ListLaunchesOptionsInput {
        limit: Int
        offset: Int
        productId: String
        status: String
        launchDateStart: String
        launchDateEnd: String
      }

      input SubmitLaunchOptionsInput {
        launchId: String!
      }

      input ApproveLaunchOptionsInput {
        launchId: String!
      }

      input RejectLaunchOptionsInput {
        launchId: String!
      }

      type Query {
        getLaunch(options: GetLaunchOptionsInput!): Launch
        listLaunches(options: ListLaunchesOptionsInput): [Launch]
      }

      type Mutation {
        createLaunch(options: CreateLaunchOptionsInput!): Launch
        updateLaunch(options: UpdateLaunchOptionsInput!): Launch
        deleteLaunch(options: DeleteLaunchOptionsInput!): Launch
        submitLaunch(options: SubmitLaunchOptionsInput!): Launch
        approveLaunch(options: ApproveLaunchOptionsInput!): Launch
        rejectLaunch(options: RejectLaunchOptionsInput!): Launch
      }
    `,
    resolvers: {
      Query: {
        getLaunch: async (req, { options }, context) => {
          const user = context.session?.user;
          return (await launchesMain.getLaunch(options, user)).toObject();
        },
        listLaunches: async (req, { options }, context) => {
          const user = context.session?.user;
          const launches = await launchesMain.listLaunches(options, user);
          return launches.map((launch) => launch.toObject());
        },
      },
      Mutation: {
        createLaunch: async (req, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return (await launchesMain.createLaunch(options, user)).toObject();
        },
        updateLaunch: async (req, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return (await launchesMain.updateLaunch(options, user)).toObject();
        },
        deleteLaunch: async (req, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return (await launchesMain.deleteLaunch(options, user)).toObject();
        },
        submitLaunch: async (req, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return (await launchesMain.submitLaunch(options, user)).toObject();
        },
        approveLaunch: async (req, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return (await launchesMain.approveLaunch(options, user)).toObject();
        },
        rejectLaunch: async (req, { options }, context) => {
          const user = context.session?.user;
          if (!user) throw new Unauthorized();
          return (await launchesMain.rejectLaunch(options, user)).toObject();
        },
      },
    },
  };
}