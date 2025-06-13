import { User } from '@infinity/product-hunt-platform.entities.user';
import { ApolloError, ApolloQueryResult } from '@apollo/client';
import type { CreateUserOptions } from './create-user-options-type.js';
import type { LoginUserOptions } from './login-user-options-type.js';

/**
 * Defines the shape of the value returned by the useAuth hook.
 * It includes the current user, authentication methods, and loading/error states.
 */
export type AuthContextValue = {
  /**
   * The currently authenticated user object, or null if no user is logged in.
   */
  user: User | null;
  /**
   * Function to attempt to log in a user.
   * @param options - The login credentials (email and password).
   * @returns A promise that resolves with the User object if login is successful, or null otherwise. Rejects on network or GraphQL errors.
   */
  login: (options: LoginUserOptions) => Promise<User | null>;
  /**
   * Function to attempt to sign up a new user.
   * @param options - The details for the new user (email, password, name).
   * @returns A promise that resolves with the User object if signup is successful, or null otherwise. Rejects on network or GraphQL errors.
   */
  signup: (options: CreateUserOptions) => Promise<User | null>;
  /**
   * Function to log out the currently authenticated user.
   * @returns A promise that resolves with true if logout is successful, false otherwise.
   */
  logout: () => Promise<boolean>;
  /**
   * Boolean indicating if the initial `getCurrentUser` query is in progress.
   * True if loading, false otherwise. This does not reflect loading states of login, signup, or logout operations.
   */
  loading: boolean;
  /**
   * An ApolloError object if the initial `getCurrentUser` query failed.
   * Undefined otherwise. This does not reflect errors from login, signup, or logout operations.
   */
  error?: ApolloError;
  /**
   * Function to manually refetch the current user's data.
   * Useful for refreshing user state after external changes.
   * @returns A promise that resolves with the ApolloQueryResult.
   */
  refetchCurrentUser: () => Promise<ApolloQueryResult<any>>;
};