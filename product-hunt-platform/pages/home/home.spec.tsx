import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import { mockUser } from '@infinity/product-hunt-platform.entities.user';
import { Home } from './home.js';
import styles from './home.module.scss';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { ApolloError } from '@apollo/client';

vi.mock('@infinity/product-hunt-platform.hooks.use-auth');

const mockedUseAuth = vi.mocked(useAuth);

describe('Home Component', () => {
  it('renders loading state', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      loading: true,
      error: undefined,
      login: vi.fn(),
      signup: vi.fn(),
      logout: vi.fn(),
      refetchCurrentUser: vi.fn(),
    });

    const { container } = render(
      <MockProvider>
        <Home />
      </MockProvider>
    );

    const loadingElement = container.querySelector(`.${styles.loadingState}`);
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement!.textContent).toBe('Loading your experience...');
  });

  it('renders error state', () => {
    mockedUseAuth.mockReturnValue({
      user: null,
      loading: false,
      error: new ApolloError({ errorMessage: 'Failed to fetch data' }),
      login: vi.fn(),
      signup: vi.fn(),
      logout: vi.fn(),
      refetchCurrentUser: vi.fn(),
    });

    const { container } = render(
      <MockProvider>
        <Home />
      </MockProvider>
    );

    const errorElement = container.querySelector(`.${styles.errorState}`);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement!.textContent).toBe('Oops! Something went wrong. Please try refreshing the page.');
  });
});
