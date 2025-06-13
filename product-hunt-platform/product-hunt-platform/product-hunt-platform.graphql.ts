import { GqlSchema } from '@bitdev/symphony.backends.backend-server';
import { gql } from 'graphql-tag';
import type { ProductHuntPlatformNode } from './product-hunt-platform.node.runtime.js';
import { User } from '@infinity/product-hunt-platform.entities.user';
import { NotFound } from '@bitdev/symphony.exceptions.not-found';
import { AccessDenied } from '@bitdev/symphony.exceptions.access-denied';

export function productHuntPlatformGqlSchema(productHuntPlatformMain: ProductHuntPlatformNode): GqlSchema {
  return {
    typeDefs: gql`
      type PlatformManifest {
        name: String!
        version: String!
      }

      type User {
        userId: String!
        email: String!
        username: String!
        imageUrl: String
        roles: [String]
      }

      input CreateUserOptions {
        email: String!
        password: String!
        name: String!
      }

      input LoginUserOptions {
        email: String!
        password: String!
      }

      input UpdateUserOptions {
        name: String
        password: String
        avatar: String
      }

      input ListUsersOptions {
        offset: Int
        limit: Int
        search: String
      }

      input GetUserOptions {
        userId: String!
      }

      type Query {
        getCurrentUser: User
        getUser(options: GetUserOptions!): User
        listUsers(options: ListUsersOptions): [User]
        getPlatformManifest: PlatformManifest!
        isAuthenticated: Boolean!
      }

      type Mutation {
        createUser(options: CreateUserOptions!): User
        loginUser(options: LoginUserOptions!): User
        logoutUser: Boolean!
        updateUser(options: UpdateUserOptions): User
      }
    `,
    resolvers: {
      Query: {
        getCurrentUser: (_: any, __: any, context: any) => {
          if (!context.session?.user) {
            return undefined;
          }
          const userObj = context.session?.user;
          const user = User.from(userObj);
          return user.toObject();
        },
        getUser: async (_: any, { options }: any, context: any) => {
          if (!context.session?.user) {
            throw new AccessDenied('Authentication required');
          }
          const user = await productHuntPlatformMain.getUser(options, User.from(context.session.user));
          if (!user) throw new NotFound(`User with id ${options.userId} not found`);
          return user.toObject();
        },
        listUsers: async (_: any, { options }: any, context: any) => {
          if (!context.session?.user) {
            throw new AccessDenied('Authentication required');
          }
          const users = await productHuntPlatformMain.listUsers(options || {}, User.from(context.session.user));
          return users.map((user) => user.toObject());
        },
        getPlatformManifest: async () => {
          return productHuntPlatformMain.getPlatformManifest();
        },
        isAuthenticated: (_: any, __: any, context: any) => {
          return Boolean(context.session?.user);
        },
      },
      Mutation: {
        createUser: async (_: any, { options }: any, context: any) => {
          if (context.session?.user) throw new Error('Already logged in');
          const user = await productHuntPlatformMain.createUser({
            email: options.email,
            password: options.password,
            name: options.name,
          });
          const userObj = user.toObject();
          context.session.user = userObj;
          return userObj;
        },
        loginUser: async (_: any, { options }: any, context: any) => {
          if (context.session?.user) throw new Error('Already logged in');
          const user = await productHuntPlatformMain.loginUser({
            email: options.email,
            password: options.password,
          });
          if (!user) throw new Error('Login failed: Invalid credentials');
          const userObj = user.toObject();
          context.session.user = userObj;
          return userObj;
        },
        logoutUser: (_: any, __: any, context: any) => {
          if (context.session) {
            context.session.destroy();
            return true;
          }
          return false;
        },
        updateUser: async (_: any, { options }: any, context: any) => {
          if (!context.session?.user) {
            throw new AccessDenied('Authentication required');
          }
          const currentUser = User.from(context.session.user);
          const updatedUser = await productHuntPlatformMain.updateUser(options, currentUser);
          if (!updatedUser) throw new Error('User update failed');
          context.session.user = updatedUser.toObject(); // Update session with new user data
          return updatedUser.toObject();
        },
      },
    },
  };
}