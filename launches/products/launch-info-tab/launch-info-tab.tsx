import React from 'react';
import classNames from 'classnames';
import { useListLaunches, type UseListLaunchesHookOptions } from '@infinity/launches.hooks.use-launches'; 
import { Launch } from '@infinity/launches.entities.launch';
import { Paragraph } from '@infinity/design.typography.paragraph';
import styles from './launch-info-tab.module.scss';

/**
 * Props for the LaunchInfoTab component.
 */
export type LaunchInfoTabProps = {
  /**
   * The ID of the product for which to display launch information.
   * This ID is used to fetch relevant launch data.
   */
  productId: string;
  /**
   * Optional CSS class name(s) to apply to the root element of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   * Prefer using `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
  /**
   * Optional mock data for launches. If provided, the component will use this data
   * instead of making a network request. Useful for testing or specific scenarios.
   * This should be an array of Launch entity types.
   */
  mockLaunchesData?: Launch[];
};

/**
 * LaunchInfoTab is a component designed to be used as a tab in a product details view.
 * It fetches and displays information about launches associated with a specific product.
 */
export function LaunchInfoTab({
  productId,
  className,
  style,
  mockLaunchesData,
}: LaunchInfoTabProps): React.JSX.Element {
  const hookOptions: UseListLaunchesHookOptions | undefined = mockLaunchesData
    ? { mockData: mockLaunchesData }
    : undefined;

  const { data, loading, error } = useListLaunches(
    { productId },
    hookOptions
  );

  if (loading) {
    return (
      <div className={classNames(styles.launchInfoTab, styles.centeredMessage, className)} style={style}>
        <Paragraph className={styles.loadingMessage}>Loading launch information...</Paragraph>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(styles.launchInfoTab, styles.centeredMessage, className)} style={style}>
        <Paragraph className={styles.errorMessage}>
          Failed to load launch information. Please try again later.
        </Paragraph>
      </div>
    );
  }

  const launches = data?.listLaunches?.slice() // Create a copy before sorting
    ?.sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime());

  if (!launches || launches.length === 0) {
    return (
      <div className={classNames(styles.launchInfoTab, styles.centeredMessage, className)} style={style}>
        <Paragraph className={styles.noLaunchesMessage}>
          No launch information available for this product yet.
        </Paragraph>
      </div>
    );
  }

  // Displaying the most recent launch
  const latestLaunch = launches[0];
  const formattedLaunchDate = new Date(latestLaunch.launchDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const statusClassName = styles[`status${latestLaunch.status.charAt(0).toUpperCase() + latestLaunch.status.slice(1).toLowerCase()}`] || styles.statusDefault;


  return (
    <div className={classNames(styles.launchInfoTab, className)} style={style}>
      <Paragraph element="h3" className={styles.launchName}>
        {latestLaunch.name}
      </Paragraph>
      <Paragraph className={styles.launchTagline}>
        {latestLaunch.tagline}
      </Paragraph>
      <Paragraph className={styles.launchDescription}>
        {latestLaunch.description}
      </Paragraph>
      <div className={styles.metaInfo}>
        <Paragraph className={styles.metaItem} element="div">
          <span className={styles.metaLabel}>Launch Date:</span>
          <span>{formattedLaunchDate}</span>
        </Paragraph>
        <Paragraph className={styles.metaItem} element="div">
          <span className={styles.metaLabel}>Status:</span>
          <span className={classNames(styles.statusBadge, statusClassName)}>
            {latestLaunch.status}
          </span>
        </Paragraph>
      </div>
    </div>
  );
}
