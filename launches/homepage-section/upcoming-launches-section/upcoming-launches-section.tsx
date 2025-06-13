import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { SectionLayout } from '@infinity/design.layouts.section-layout';
import { LaunchList } from '@infinity/launches.ui.launch-list';
import type { Launch } from '@infinity/launches.entities.launch'; // Changed import
import styles from './upcoming-launches-section.module.scss';
import { useListLaunches } from '@infinity/launches.hooks.use-launches';
import { Spinner } from '@infinity/design.loaders.spinner';

export type UpcomingLaunchesSectionProps = {
  /**
   * An array of Launch objects to display.
   * Each launch will be rendered as a LaunchCard via LaunchList.
   */
  launches?: Launch[];
  /**
   * Optional title for the section.
   * If a string is provided, it's rendered as an H2 heading by SectionLayout.
   * Defaults to "Upcoming Launches".
   */
  title?: React.ReactNode;
  /**
   * Optional subtitle, displayed below the title to provide additional detail.
   * If a string is provided, it's rendered as a styled paragraph by SectionLayout.
   * Defaults to "Be the first to discover tomorrow's innovations."
   */
  subtitle?: React.ReactNode;
  /**
   * Optional caption, usually displayed above the title for thematic context.
   * If a string is provided, it's rendered as a styled paragraph by SectionLayout.
   * Defaults to "Coming Soon".
   */
  caption?: React.ReactNode;
  /**
   * Optional URL for a "View All" link. If provided, a link/button will be rendered.
   */
  viewAllLink?: string;
  /**
   * Optional text for the "View All" link.
   * Defaults to "View All Upcoming Launches".
   */
  viewAllText?: string;
  /**
   * An optional CSS class name to apply to the root section element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root section element.
   */
  style?: React.CSSProperties;
};

const defaultLaunches: Launch[] = [];

export function UpcomingLaunchesSection({
  launches: baseLaunches = defaultLaunches,
  title = 'Upcoming Launches',
  subtitle = "Be the first to discover tomorrow's innovations.",
  caption = 'Coming Soon',
  viewAllLink,
  viewAllText = 'View All Upcoming Launches',
  className,
  style,
}: UpcomingLaunchesSectionProps): React.JSX.Element {
  const { data, loading } = useListLaunches({
    limit: 1
  });
  const launches = data?.listLaunches || baseLaunches;

  if (loading) {
    return (
      <div
        className={styles.loadingContainer}
        role="status"
        aria-live="polite"
      >
        <Spinner size="large" ariaLabel="Loading coming launches..." />
      </div>
    );
  }

  return (
    <SectionLayout
      title={title}
      subtitle={subtitle}
      caption={caption}
      className={classNames(styles.upcomingLaunchesSection, className)}
      style={style}
    >
      {launches.length > 0 ? (
        <LaunchList launches={launches} />
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateText}>No upcoming launches right now. Check back soon!</p>
        </div>
      )}
      {viewAllLink && (
        <div className={styles.viewAllContainer}>
          <Link to={viewAllLink} className={styles.viewAllLink}>
            {viewAllText}
          </Link>
        </div>
      )}
    </SectionLayout>
  );
}