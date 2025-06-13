import { useState } from 'react';
import { gql, useQuery, useMutation, ApolloError, useApolloClient, ApolloQueryResult } from '@apollo/client';
import { User } from '@infinity/product-hunt-platform.entities.user';
import type { CreateUserOptions } from './create-user-options-type.js';
import type { LoginUserOptions } from './login-user-options-type.js';
import type { AuthContextValue } from './auth-context-value-type.js';

const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    getCurrentUser {
      userId
      email
      username
      imageUrl
      roles
    }
  }
`;

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($options: LoginUserOptions!) {
    loginUser(options: $options) {
      userId
      email
      username
      imageUrl
      roles
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($options: CreateUserOptions!) {
    createUser(options: $options) {
      userId
      email
      username
      imageUrl
      roles
    }
  }
`;

const LOGOUT_USER_MUTATION = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

/**
 * Options for the useAuth hook.
 */
type UseAuthOptions = {
  /**
   * Optional mock user data to initialize the hook with.
   * If provided, the initial `getCurrentUser` query will be skipped.
   */
  mockUser?: User;
};

/**
 * A React hook for managing user authentication state.
 * It fetches the authenticated user upon hook invocation and provides methods
 * for signup, login, and logout using GraphQL mutations.
 *
 * @param options - Optional configuration for the hook, such as providing mock user data for testing.
 * @returns An object containing the current user, authentication methods (login, signup, logout),
 *          loading and error states for the initial user fetch, and a method to refetch the current user.
 */
export function useAuth(options?: UseAuthOptions): AuthContextValue {
  const apolloClient = useApolloClient();
  const [internalUser, setInternalUser] = useState<User | null>(options?.mockUser || null);

  const {
    data: currentUserData,
    loading: currentUserLoading,
    error: currentUserError,
    refetch: refetchCurrentUser,
  } = useQuery(GET_CURRENT_USER_QUERY, {
    skip: !!options?.mockUser,
    onCompleted: (data) => {
      if (data?.getCurrentUser) {
        setInternalUser(User.from(data.getCurrentUser));
      } else {
        setInternalUser(null);
      }
    },
    onError: () => {
      setInternalUser(null);
    },
  });

  const [loginMutation] = useMutation(LOGIN_USER_MUTATION);
  const [signupMutation] = useMutation(CREATE_USER_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_USER_MUTATION);

  /**
   * Attempts to log in a user with the provided credentials.
   * Updates the internal user state upon successful login.
   * @param loginOptions - The user's email and password.
   * @returns A promise that resolves with the User object if successful, or null otherwise.
   */
  const login = async (loginOptions: LoginUserOptions): Promise<User | null> => {
    try {
      const result = await loginMutation({ variables: { options: loginOptions } });
      if (result.data?.loginUser) {
        const loggedInUser = User.from(result.data.loginUser);
        setInternalUser(loggedInUser);
        return loggedInUser;
      }
      setInternalUser(null); // Ensure user is cleared if loginUser returns null
      return null;
    } catch (err) {
      setInternalUser(null); // Ensure user is cleared on error
      throw err; // Re-throw to allow calling code to handle
    }
  };

  /**
   * Attempts to sign up a new user with the provided details.
   * Updates the internal user state upon successful signup.
   * @param signupOptions - The new user's email, password, and name.
   * @returns A promise that resolves with the User object if successful, or null otherwise.
   */
  const signup = async (signupOptions: CreateUserOptions): Promise<User | null> => {
    try {
      const result = await signupMutation({ variables: { options: signupOptions } });
      if (result.data?.createUser) {
        const signedUpUser = User.from(result.data.createUser);
        setInternalUser(signedUpUser);
        return signedUpUser;
      }
      setInternalUser(null); // Ensure user is cleared if createUser returns null
      return null;
    } catch (err) {
      setInternalUser(null); // Ensure user is cleared on error
      throw err; // Re-throw to allow calling code to handle
    }
  };

  /**
   * Logs out the currently authenticated user.
   * Clears the internal user state and resets the Apollo Client store upon successful logout.
   * @returns A promise that resolves with true if logout was successful, false otherwise.
   */
  const logout = async (): Promise<boolean> => {
    try {
      const result = await logoutMutation();
      if (result.data?.logoutUser) {
        setInternalUser(null);
        await apolloClient.resetStore();
        return true;
      }
      return false;
    } catch (err) {
      // Log error or handle as needed, but ensure a boolean is returned
      return false;
    }
  };

  const userToReturn = options?.mockUser ? options.mockUser : internalUser;

  return {
    user: userToReturn,
    login,
    signup,
    logout,
    loading: options?.mockUser ? false : currentUserLoading,
    error: options?.mockUser ? undefined : currentUserError,
    refetchCurrentUser,
  };
}