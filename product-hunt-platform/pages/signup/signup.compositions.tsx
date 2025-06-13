import React from 'react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Flex } from '@infinity/design.layouts.flex';
import { Heading } from '@infinity/design.typography.heading';
import { Signup } from './signup.js';
import { useAuth, type AuthContextValue } from '@infinity/product-hunt-platform.hooks.use-auth';
import type { User } from '@infinity/product-hunt-platform.entities.user';

// Helper Home Page for redirection tests
const HomePageForTest = () => {
  const location = useLocation();
  // To display current auth state, call the useAuth hook
  const authState: AuthContextValue = useAuth();
  return (
    <Flex direction="column" alignItems="center" justifyContent="center" style={{ padding: 'var(--spacing-large)', minHeight: '300px', backgroundColor: 'var(--colors-surface-background)', color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)' }}>
      <Heading level={2}>Welcome!</Heading>
      <p>Current Path: {location.pathname}</p>
      {authState.user && <p>User: {(authState.user as User).username}</p>}
      {!authState.user && authState.loading && <p>Loading user data...</p>}
      {!authState.user && !authState.loading && <p>No user is logged in.</p>}
    </Flex>
  );
};

export const DefaultSignupForm = () => {
  return (
    <MemoryRouter initialEntries={['/signup']}>
      <InfinityTheme>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePageForTest />} />
        </Routes>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const SignupFormWhenAuthenticatedUser = () => {
  // Behavior will depend on the actual useAuth hook's state when this composition is rendered.
  // If a user is authenticated by the actual auth provider, Signup component should redirect.
  return (
    <MemoryRouter initialEntries={['/signup']}> {/* Start at /signup path */}
      <InfinityTheme>
        <Routes>
          <Route path="/signup" element={<Signup />} /> {/* Signup component should redirect if user is authenticated */}
          <Route path="/" element={<HomePageForTest />} /> {/* Target for redirection */}
        </Routes>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const SignupFormHandlesSignupError = () => {
  // Behavior will depend on the actual useAuth hook and Signup component's error handling.
  // Errors will be displayed if they occur during the actual signup process.
  return (
    <MemoryRouter initialEntries={['/signup']}>
      <InfinityTheme>
        <Routes>
          <Route path="/signup" element={<Signup />} /> {/* Signup form should display errors from actual signup attempts */}
          <Route path="/" element={<HomePageForTest />} />
        </Routes>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const SignupFormDuringAuthLoading = () => {
  // Behavior will depend on the actual useAuth hook's loading state.
  // Signup component should show its loading state if auth is loading.
    return (
      <MemoryRouter initialEntries={['/signup']}>
        <InfinityTheme>
          <Routes>
            <Route path="/signup" element={<Signup />} /> {/* Signup page should show its loading state */}
            <Route path="/" element={<HomePageForTest />} />
          </Routes>
        </InfinityTheme>
      </MemoryRouter>
    );
  };