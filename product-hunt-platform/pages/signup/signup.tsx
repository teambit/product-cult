import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Flex } from '@infinity/design.layouts.flex';
import { Heading } from '@infinity/design.typography.heading';
import { TextInput } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import { useAuth, type CreateUserOptions } from '@infinity/product-hunt-platform.hooks.use-auth';
import styles from './signup.module.scss';

/**
 * Props for the Signup component.
 */
export type SignupProps = {
  /**
   * Optional custom CSS class name to apply to the root element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element.
   * Prefer using `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};

/**
 * Signup page component for the Product Hunt platform.
 * Allows new users to create an account. Redirects to the homepage if already authenticated.
 */
export function Signup({ className, style }: SignupProps): React.JSX.Element {
  const auth = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (auth.user && !auth.loading) {
      window.location.href = '/';
    }
  }, [auth.user, auth.loading, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignupError(null);
    setIsSubmitting(true);

    const options: CreateUserOptions = { name, email, password };

    try {
      const newUser = await auth.signup(options);
      if (newUser) {
        window.location.href = '/';
      } else {
        setSignupError('Signup failed. Please check your details and try again.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setSignupError(error.message || 'An unexpected error occurred during signup.');
      } else {
        setSignupError('An unexpected error occurred during signup.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (auth.loading) {
    return (
      <Flex justifyContent="center" alignItems="center" className={styles.loadingContainer}>
        <p>Loading...</p>
      </Flex>
    );
  }

  if (auth.user) {
    return null; // Should be redirected by useEffect
  }

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classNames(styles.signupContainer, className)}
      style={style}
    >
      <div className={styles.formWrapper}>
        <Heading level={1} className={styles.title}>
          Create Account
        </Heading>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Flex direction="column" className={styles.formFields}>
            <TextInput
              id="signup-name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={setName}
              name="name"
            />
            <TextInput
              id="signup-email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={setEmail}
              name="email"
            />
            <TextInput
              id="signup-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              name="password"
            />
          </Flex>
          {signupError ? <p className={styles.errorText}>{signupError}</p> : null}
          <Button type="submit" appearance="primary" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
      </div>
    </Flex>
  );
}
