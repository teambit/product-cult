import React from 'react';
import classNames from 'classnames';
import { useUpvote } from '@infinity/upvotes.hooks.use-upvote';
import styles from './upvotes-dashboard-panel.module.scss';

/**
 * Default background image URL for the panel, themed around growth and statistics.
 */
const DEFAULT_BACKGROUND_IMAGE_URL = `https://images.unsplash.com/photo-1593507377427-517837375cca?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxncm93dGglMjBzdGF0aXN0aWNzJTIwZGFzaGJvYXJkfGVufDF8MHx8b3JhbmdlfDE3NDk4MjMxNjJ8MA&ixlib=rb-4.1.0`;

/**
 * Props for the UpvotesDashboardPanel component.
 */
export type UpvotesDashboardPanelProps = {
  /**
   * The unique identifier of the item for which to display upvote information.
   */
  itemId: string;
  /**
   * The type of the item (e.g., "product", "launch").
   */
  itemType: string;
  /**
   * Optional title for the dashboard panel.
   * @default 'Upvote Insights'
   */
  title?: string;
  /**
   * Optional class name to apply to the root element of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   */
  style?: React.CSSProperties;
  /**
   * Optional URL for a background image to enhance the panel's appearance.
   * Defaults to a pre-selected growth/statistics themed image if not provided.
   */
  backgroundImageUrl?: string;
};

/**
 * A dashboard panel component that displays a summary of upvotes for a specific item.
 * It fetches upvote data using the useUpvote hook and presents it in a concise,
 * visually appealing, and informative manner.
 */
export function UpvotesDashboardPanel({
  itemId,
  itemType,
  title = `Upvote Insights`,
  className,
  style,
  backgroundImageUrl = DEFAULT_BACKGROUND_IMAGE_URL,
}: UpvotesDashboardPanelProps) {
  const { count, loadingCount, errorCount, hasUpvoted, loadingStatus, errorStatus } = useUpvote({ itemId, itemType });

  const isLoading = loadingCount || loadingStatus;
  const hasError = errorCount || errorStatus;

  const panelStyle = {
    ...style,
    '--panel-background-image': `url(${backgroundImageUrl})`,
  } as React.CSSProperties;

  return (
    <div
      className={classNames(styles.upvotesDashboardPanel, className)}
      style={panelStyle}
    >
      <div className={styles.panelContent}>
        <h3 className={styles.panelTitle}>{title}</h3>

        {isLoading ? (
          <div className={styles.loadingIndicator}>Loading Insights...</div>
        ) : hasError ? (
          <div className={styles.errorIndicator}>
            Could not load upvote data.
          </div>
        ) : (
          <>
            <div className={styles.countSection}>
              <span className={styles.countValue}>{count ?? 0}</span>
              <span className={styles.countLabel}>Total Upvotes</span>
            </div>
            {typeof hasUpvoted === 'boolean' && (
              <div className={styles.userStatus}>
                {hasUpvoted ? `You've upvoted this` : `You haven't upvoted`}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}