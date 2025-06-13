import React from 'react';
import classNames from 'classnames';
import { LaunchList } from '@infinity/launches.ui.launch-list';
import type { Launch } from '@infinity/launches.entities.launch';
import styles from './user-launches-tab.module.scss';

/**
 * Props for the UserLaunchesTab component.
 */
export type UserLaunchesTabProps = {
  /**
   * The ID of the user whose launches are to be displayed.
   * This ID is conceptually important for identifying the user context.
   */
  userId: string;
  /**
   * The list of launches to display.
   */
  launches?: Launch[];
  /**
   * Flag indicating if the launches are currently being loaded.
   */
  loading?: boolean;
  /**
   * An error object if fetching launches failed.
   */
  error?: Error | null;
  /**
   * Optional custom CSS class name to apply to the component's root element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the component's root element.
   */
  style?: React.CSSProperties;
};

/**
 * UserLaunchesTab is a component designed to be used within a user's profile.
 * It displays a list of product launches, typically submitted by that specific user.
 * The component expects launch data, loading state, and error state to be passed as props.
 */
export function UserLaunchesTab({
  // userId prop is part of the interface but not directly used in this revised rendering logic
  // as data fetching is now externalized. It's kept for semantic API consistency.
  // userId, 
  launches: launchesProp,
  loading,
  userId,
  error,
  className,
  style,
}: UserLaunchesTabProps) {
  if (loading) {
    return (
      <div
        className={classNames(
          styles.userLaunchesTabContainer,
          styles.loadingState,
          className
        )}
        style={style}
      >
        <div className={styles.loadingSpinner}></div>
        <p>Loading submitted launches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={classNames(
          styles.userLaunchesTabContainer,
          styles.errorState,
          className
        )}
        style={style}
      >
        <p>We encountered an issue loading your launches. Please try again later.</p>
        {/* {error.message && process.env.NODE_ENV === 'development' && <p>Error: {error.message}</p>} */}
      </div>
    );
  }

  const launchesToRender: Launch[] = launchesProp || [];

  // LaunchList component handles the empty state internally if launchesToRender array is empty.
  return (
    <div
      className={classNames(styles.userLaunchesTabContainer, className)}
      style={style}
    >
      <LaunchList launches={launchesToRender} />
    </div>
  );
}