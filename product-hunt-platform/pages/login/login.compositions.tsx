import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Login, type LoginProps } from './login.js';

/**
 * Basic composition to display the Login form.
 * It relies on MockProvider to set up the necessary theming and routing context.
 * The useAuth hook will initialize; typically, this would mean no user is logged in,
 * and the form is ready for input.
 */
export const BasicLoginForm = () => {
  return (
    <MockProvider>
      <Login />
    </MockProvider>
  );
};

/**
 * Composition to demonstrate the Login form with interaction feedback.
 * Callbacks for `onLoginSuccess` and `onLoginError` are provided to show
 * when these events are triggered.
 *
 * Note: In a typical composition environment where Apollo mocks for `useAuth`'s
 * underlying GraphQL calls are not explicitly provided to `MockProvider`,
 * attempting to log in will likely result in an error from Apollo Client
 * (e.g., "No more mocked responses for the query..."). This would trigger `onLoginError`.
 */
export const InteractiveLoginForm = () => {
  const handleLoginSuccess = () => {
    // This callback is fired by the Login component if auth.login() resolves successfully with a user.
    // The Login component's internal useEffect would then handle navigation.
    alert('Login Success callback triggered! Redirecting...');
    console.log('Login Success callback triggered.');
  };

  const handleLoginError = (error: string) => {
    // This callback is fired if auth.login() fails or if there's an issue with the form.
    alert(`Login Error callback triggered: ${error}`);
    console.error('Login Error callback triggered:', error);
  };

  return (
    <MockProvider>
      <Login
        onLoginSuccess={handleLoginSuccess}
        onLoginError={handleLoginError}
      />
    </MockProvider>
  );
};

/**
 * Composition to showcase the Login form with custom styling via props.
 * The `className` and `style` props are applied to the root container of the Login component.
 */
export const StyledLoginForm = () => {
  const loginProps: LoginProps = {
    className: 'custom-login-page-container',
    style: {
      border: '2px dashed var(--colors-primary-default)',
      borderRadius: 'var(--borders-radius-pill)', // Example of using a different border radius
      padding: 'var(--spacing-small)', // Overriding default padding of the container for demo
    },
    onLoginSuccess: () => alert('Login Success (Styled)!'),
    onLoginError: (errorMessage) => alert(`Login Error (Styled): ${errorMessage}`),
  };

  return (
    <MockProvider>
      <>
        <style>{`
          .custom-login-page-container {
            // You can add specific styles for the custom-login-page-container class here if needed.
            // For example, to ensure it stands out if it's nested or has specific layout needs.
            // Note that this class is on the Login component's root, not the form itself.
          }
          .custom-login-page-container form {
            // Example of targeting the form inside the custom container for further styling.
            // Be cautious with deep selectors as they can be brittle.
            border: 2px solid var(--colors-secondary-default);
          }
        `}</style>
        <Login {...loginProps} />
      </>
    </MockProvider>
  );
};