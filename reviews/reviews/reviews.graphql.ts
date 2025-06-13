import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { ReviewsNode } from './reviews.node.runtime.js';
import { User } from '@infinity/product-hunt-platform.entities.user';
import { Unauthorized } from '@bitdev/symphony.exceptions.unauthorized';

export function reviewsGqlSchema(reviewsNode: ReviewsNode): GqlSchema {
  return {
    typeDefs: gql`
      type Review {
        id: ID!
        productId: String!
        userId: String!
        rating: Float!
        comment: String!
        createdAt: String!
        updatedAt: String!
        status: String!
      }

      type ReviewReport {
        id: ID!
        reviewId: String!
        userId: String!
        reason: String!
        createdAt: String!
      }

      input CreateReviewInput {
        productId: String!
        rating: Float!
        comment: String!
      }

      input UpdateReviewInput {
        id: ID!
        rating: Float
        comment: String
      }

      input DeleteReviewInput {
        id: ID!
      }

      input GetReviewInput {
        id: ID!
      }

      input ListReviewsInput {
        productId: String
        userId: String
        limit: Int
        offset: Int
        status: String
      }

      input ModerateReviewInput {
        id: ID!
        status: String!
      }

      input ListReportedReviewsInput {
        limit: Int
        offset: Int
      }

      input ReportReviewInput {
        reviewId: String!
        reason: String!
      }

      type Query {
        getReview(options: GetReviewInput!): Review
        listReviews(options: ListReviewsInput!): [Review]
        listReportedReviews(options: ListReportedReviewsInput!): [ReviewReport]
      }

      type Mutation {
        createReview(options: CreateReviewInput!): Review
        updateReview(options: UpdateReviewInput!): Review
        deleteReview(options: DeleteReviewInput!): Review
        moderateReview(options: ModerateReviewInput!): Review
        reportReview(options: ReportReviewInput!): ReviewReport
      }
    `,
    resolvers: {
      Query: {
        getReview: async (root, { options }, context) => {
          const user: User | undefined = context.session?.user ? User.from(context.session.user) : undefined;
          return reviewsNode.getReview(options, user);
        },
        listReviews: async (root, { options }, context) => {
          const user: User | undefined = context.session?.user ? User.from(context.session.user) : undefined;
          return reviewsNode.listReviews(options, user);
        },
        listReportedReviews: async (root, { options }, context) => {
          const user: User | null = context.session?.user ? User.from(context.session.user) : null;
          if (!user) throw new Unauthorized();
          return reviewsNode.listReportedReviews(options, user);
        },
      },
      Mutation: {
        createReview: async (root, { options }, context) => {
          const user: User | null = context.session?.user ? User.from(context.session.user) : null;
          if (!user) throw new Unauthorized();
          return reviewsNode.createReview(options, user);
        },
        updateReview: async (root, { options }, context) => {
          const user: User | null = context.session?.user ? User.from(context.session.user) : null;
          if (!user) throw new Unauthorized();
          return reviewsNode.updateReview(options, user);
        },
        deleteReview: async (root, { options }, context) => {
          const user: User | null = context.session?.user ? User.from(context.session.user) : null;
          if (!user) throw new Unauthorized();
          return reviewsNode.deleteReview(options, user);
        },
        moderateReview: async (root, { options }, context) => {
          const user: User | null = context.session?.user ? User.from(context.session.user) : null;
          if (!user) throw new Unauthorized();
          return reviewsNode.moderateReview(options, user);
        },
        reportReview: async (root, { options }, context) => {
          const user: User | null = context.session?.user ? User.from(context.session.user) : null;
          if (!user) throw new Unauthorized();
          return reviewsNode.reportReview(options, user);
        },
      },
    },
  };
}