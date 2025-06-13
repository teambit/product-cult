import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { mockUser } from '@infinity/product-hunt-platform.entities.user';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useAuth } from './use-auth.js';
import { gql } from '@apollo/client';
import { MockedProvider as ApolloMockedProvider } from '@apollo/client/testing';

// GraphQL query/mutation definitions (copied from use-auth.tsx for testing purposes)
const GET_CURRENT_USER_QUERY_GQL = gql`
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

const LOGIN_USER_MUTATION_GQL = gql`
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

const LOGOUT_USER_MUTATION_GQL = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

describe('useAuth', () => {
  it('should return the mock user when mockUser option is provided', () => {
    const mockUserData = mockUser({ username: 'testuser' });
    const { result } = renderHook(() => useAuth({ mockUser: mockUserData }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.user?.username).toBe('testuser');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should update the user state after a successful login', async () => {
    const mockLoggedInUser = mockUser({ username: 'loggedinuser' });
    const loginCredentials = { email: 'test@example.com', password: 'password' };

    const mocks = [
      {
        request: { query: GET_CURRENT_USER_QUERY_GQL },
        result: { data: { getCurrentUser: null } },
      },
      {
        request: {
          query: LOGIN_USER_MUTATION_GQL,
          variables: { options: loginCredentials },
        },
        result: {
          data: {
            loginUser: {
              userId: mockLoggedInUser.id,
              email: mockLoggedInUser.email,
              username: mockLoggedInUser.username,
              imageUrl: mockLoggedInUser.imageUrl,
              roles: mockLoggedInUser.roles,
            },
          },
        },
      },
    ];

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MockProvider>
          <ApolloMockedProvider mocks={mocks} addTypename={false}>
            {children}
          </ApolloMockedProvider>
        </MockProvider>
      ),
    });

    // Wait for initial GET_CURRENT_USER_QUERY to resolve if necessary
    // For @apollo/client/testing MockedProvider, this usually resolves synchronously or very quickly.
    // If tests were flaky, one might add a await new Promise(resolve => setTimeout(resolve, 0)); here.
    // However, `act` should handle updates.

    let loggedInUser;
    await act(async () => {
      loggedInUser = await result.current.login(loginCredentials);
    });

    expect(loggedInUser?.username).toBe('loggedinuser');
    expect(result.current.user?.username).toBe('loggedinuser');
  });
});
