import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type LoginUserOptions } from '@infinity/product-hunt-platform.hooks.use-auth';
import { Flex } from '@infinity/design.layouts.flex';
import { Heading } from '@infinity/design.typography.heading';
import { TextInput } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import classNames from 'classnames';
import styles from './login.module.scss';

export type LoginProps = {
  /**
   * Optional custom CSS class name to apply to the root login page element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root login page element.
   */
  style?: React.CSSProperties;
  /**
   * Callback fired when login is successful and navigation is about to occur.
   * Note: Navigation to '/' happens automatically on successful login if user becomes available.
   */
  onLoginSuccess?: () => void;
  /**
   * Callback fired when login attempt fails.
   * @param error - The error message or object.
   */
  onLoginError?: (error: string) => void;
};

/**
 * LoginPage component provides a user interface for authentication.
 * It includes fields for email and password, and a submit button.
 * If the user is already authenticated, it redirects to the homepage.
 */
export function Login({ className, style, onLoginSuccess, onLoginError }: LoginProps): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is already authenticated and initial auth loading is complete
    if (auth.user && !auth.loading) {
      navigate('/');
    }
  }, [auth.user, auth.loading, navigate]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setFormError(null);
    setIsLoggingIn(true);

    const loginOptions: LoginUserOptions = { email, password };

    try {
      const loggedInUser = await auth.login(loginOptions);
      if (loggedInUser) {
        // User is now set in auth.user, useEffect will handle navigation
        onLoginSuccess?.();
      } else {
        // Handle cases where login resolves but user is null (e.g., specific backend logic)
        const errorMsg = 'Login failed. Please check your credentials.';
        setFormError(errorMsg);
        onLoginError?.(errorMsg);
      }
    } catch (err) {
      let errorMsg = 'An unexpected error occurred. Please try again.';
      if (err instanceof Error) {
        errorMsg = err.message || errorMsg;
      } else if (typeof err === 'string') {
        errorMsg = err;
      }
      setFormError(errorMsg);
      onLoginError?.(errorMsg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Prevent rendering the form if initial auth state is loading and user might be redirected
  if (auth.loading) {
    return (
      <Flex className={styles.loadingContainer} justifyContent="center" alignItems="center">
        <Heading level={3}>Loading...</Heading>
      </Flex>
    );
  }


  // If user becomes authenticated while component is mounted but before redirect
  if (auth.user) {
     // This case should ideally be caught by useEffect, but as a fallback
    return (
      <Flex className={styles.loadingContainer} justifyContent="center" alignItems="center">
        <Heading level={3}>Redirecting...</Heading>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classNames(styles.loginPageContainer, className)}
      style={style}
    >
      <Flex
        as="form"
        direction="column"
        className={styles.loginForm}
        onSubmit={handleLogin}
        gap="var(--spacing-medium)"
      >
        <Heading level={1} visualLevel={2} className={styles.formTitle}>
          Login to Product Hunt
        </Heading>

        <TextInput
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          name="email"
          className={styles.inputField}
        />

        <TextInput
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          name="password"
          className={styles.inputField}
        />

        {formError ? <p className={styles.errorMessage}>{formError}</p> : null}

        <Button
          type="submit"
          appearance="primary"
          className={styles.submitButton}
          disabled={isLoggingIn || auth.loading}
        >
          {isLoggingIn ? 'Logging in...' : 'Login'}
        </Button>
         <p className={styles.signupPrompt}>
          Don&apos;t have an account? <a href="/signup" className={styles.signupLink}>Sign Up</a>
        </p>
      </Flex>
    </Flex>
  );
}