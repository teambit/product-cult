import React from 'react';
import classNames from 'classnames';
import type { Launch } from '@infinity/launches.entities.launch';
import { LaunchCard } from '@infinity/launches.ui.launch-card';
import styles from './launch-list.module.scss';

export type LaunchListProps = {
  /**
   * An array of Launch objects to display.
   * Each launch will be rendered as a LaunchCard.
   */
  launches: Launch[];
  /**
   * Optional custom CSS class name to apply to the list's root element.
   * This allows for further styling and customization via external CSS.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the list's root element.
   * While available, it's generally recommended to use `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};

/**
 * LaunchList is a component that displays a collection of product launches.
 * It accepts an array of Launch objects and renders each one using the LaunchCard component,
 * arranged in a responsive grid layout.
 */
export function LaunchList({
  launches,
  className,
  style,
}: LaunchListProps): React.JSX.Element {
  if (!launches || launches.length === 0) {
    return (
      <div
        className={classNames(styles.emptyStateContainer, className)}
        style={style}
      >
        <div className={styles.emptyStateContent}>
          <p>No launches to display at the moment.</p>
          <p className={styles.emptyStateSubtext}>Check back later for new and exciting product launches!</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.launchListGrid, className)}
      style={style}
    >
      {launches.map((launch) => (
        <LaunchCard key={launch.id} launch={launch} />
      ))}
    </div>
  );
}