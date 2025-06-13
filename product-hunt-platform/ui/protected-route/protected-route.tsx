import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@infinity/product-hunt-platform.hooks.use-auth';
import { Spinner } from '@infinity/design.loaders.spinner';
import styles from './protected-route.module.scss';

/**
 * Props for the ProtectedRoute component.
 */
export type ProtectedRouteProps = {
  /**
   * The content to render if the user is authenticated.
   * This is typically a React Router Route or Outlet component.
   */
  children: ReactNode;
  /**
   * The path to redirect to if the user is not authenticated.
   * Defaults to the root path "/".
   */
  redirectTo?: string;
  /**
   * Optional CSS class name to apply to the root element of the component.
   * This is primarily effective when the component is rendering its loading state.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the component's root element.
   * This is primarily effective for the loading state container.
   */
  style?: React.CSSProperties;
};

/**
 * ProtectedRoute is a wrapper component that ensures a user is authenticated
 * before rendering its children. If the user is not authenticated, it redirects
 * them to a specified route. It displays a loading indicator while checking
 * the authentication status.
 */
export function ProtectedRoute({
  children,
  redirectTo = '/',
  className,
  style,
}: ProtectedRouteProps): React.JSX.Element {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className={`${styles.loadingContainer}${className ? ` ${className}` : ''}`}
        style={style}
        role="status"
        aria-live="polite"
      >
        <Spinner size="large" ariaLabel="Authenticating user..." />
      </div>
    );
  }

  if (!user) {
    // If loading is complete and there is no authenticated user,
    // redirect to the specified path.
    // The 'replace' prop ensures the redirect replaces the current entry in history,
    // so the user cannot navigate back to the protected route via the browser's back button.
    return <Navigate to={redirectTo} replace />;
  }

  // If the user is authenticated (user object exists), render the children.
  // The children are expected to be React elements, typically defining further routes or page content.
  return <>{children}</>;
}