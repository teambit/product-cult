import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useUpvote, UseUpvoteResult } from '@infinity/upvotes.hooks.use-upvote';
import { PlainUpvote, mockUpvotes } from '@infinity/upvotes.entities.upvote';
import styles from './user-upvotes-page.module.scss';

/**
 * Props for the UserUpvotesPage component.
 */
export type UserUpvotesPageProps = {
  /**
   * Optional list of upvote data to display.
   * If not provided, the component will use internal mock data.
   * This is primarily for demonstration or if data is fetched by a parent component.
   */
  initialUserUpvotes?: PlainUpvote[];
  /**
   * Optional CSS class name to apply to the root element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element.
   */
  style?: React.CSSProperties;
};

type UpvotedItemCardProps = {
  /**
   * The upvote data for the item to display.
   */
  upvoteData: PlainUpvote;
  /**
   * Callback function invoked when the user removes an upvote.
   * The parent component should use this to update its list of displayed upvotes.
   * @param itemId The ID of the item whose upvote was removed.
   */
  onRemove: (itemId: string) => void;
};

const UpvotedItemCard: React.FC<UpvotedItemCardProps> = ({ upvoteData, onRemove }) => {
  const {
    count,
    hasUpvoted,
    downvote,
    loadingAction,
    loadingCount,
    errorAction,
    errorCount,
  }: UseUpvoteResult = useUpvote({
    itemId: upvoteData.itemId,
    itemType: upvoteData.itemType,
    initialHasUpvoted: true, // Assumed true as this card is for an item already upvoted
  });

  const handleRemoveUpvote = async () => {
    if (loadingAction) return;
    try {
      await downvote();
      // After successful downvote, the `hasUpvoted` state from the hook will update.
      // We also call onRemove to allow the parent to filter this item out immediately.
      onRemove(upvoteData.itemId);
    } catch (e) {
      // Error is typically handled by observing errorAction from the hook
      // console.error("Failed to remove upvote:", e);
    }
  };

  // If the hook indicates the item is no longer upvoted (e.g., after a successful downvote elsewhere or if initial state was wrong)
  // and it's not currently in a loading or error state for an action, remove it.
  // This handles cases where the state might change due to external factors reflected by the hook.
  useEffect(() => {
    if (hasUpvoted === false && !loadingAction && !errorAction) {
      onRemove(upvoteData.itemId);
    }
  }, [hasUpvoted, loadingAction, errorAction, onRemove, upvoteData.itemId]);


  return (
    <div className={styles.upvotedItemCard}>
      <div className={styles.itemDetails}>
        <h3 className={styles.itemId}>{upvoteData.itemType}: {upvoteData.itemId}</h3>
        <p className={styles.itemMeta}>
          Upvoted on: {new Date(upvoteData.createdAt).toLocaleDateString()}
        </p>
        <p className={styles.itemUpvoteCount}>
          Total Upvotes: {loadingCount ? '...' : (errorCount ? 'Error' : count ?? 'N/A')}
        </p>
      </div>
      <button
        onClick={handleRemoveUpvote}
        disabled={loadingAction}
        className={styles.removeButton}
        type="button"
      >
        {loadingAction ? 'Removing...' : 'Remove Upvote'}
      </button>
      {errorAction && <p className={styles.errorMessage}>Could not remove upvote. Please try again.</p>}
    </div>
  );
};

/**
 * UserUpvotesPage displays a list of items that the user has upvoted.
 * It uses the useUpvote hook for each item to allow removing the upvote and display current counts.
 */
export function UserUpvotesPage({
  initialUserUpvotes,
  className,
  style,
}: UserUpvotesPageProps) {
  const defaultMockUpvotes = useMemo(() => mockUpvotes().map(upvote => upvote.toObject()), []);
  
  const [displayedUpvotes, setDisplayedUpvotes] = useState<PlainUpvote[]>(
    initialUserUpvotes || defaultMockUpvotes
  );

  useEffect(() => {
    setDisplayedUpvotes(initialUserUpvotes || defaultMockUpvotes);
  }, [initialUserUpvotes, defaultMockUpvotes]);

  const handleItemRemoved = (itemId: string) => {
    setDisplayedUpvotes(prevUpvotes => prevUpvotes.filter(upvote => upvote.itemId !== itemId));
  };

  if (displayedUpvotes.length === 0) {
    return (
      <div className={classNames(styles.userUpvotesPage, styles.emptyState, className)} style={style}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Upvotes</h1>
        </header>
        <div className={styles.emptyContent}>
          <img 
            src="https://images.unsplash.com/photo-1638005120773-41587723489d?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHx1cHZvdGVzfGVufDF8MHx8b3JhbmdlfDE3NDk4MjMxNjN8MA&ixlib=rb-4.1.0" 
            alt="A serene field indicating emptiness" 
            className={styles.emptyStateImage} 
          />
          <p className={styles.emptyStateMessage}>
            You haven&apos;t upvoted any items yet, or all previously upvoted items have been removed.
          </p>
          <p className={styles.emptyStateSuggestion}>
            Explore products and launches to find something to support!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.userUpvotesPage, className)} style={style}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Upvotes</h1>
        <p className={styles.pageSubtitle}>
          Here are all the amazing products and launches you&apos;ve supported! You can manage your upvotes below.
        </p>
      </header>
      <div className={styles.upvotedItemsGrid}>
        {displayedUpvotes.map((upvote) => (
          <UpvotedItemCard
            key={upvote.id}
            upvoteData={upvote}
            onRemove={handleItemRemoved}
          />
        ))}
      </div>
    </div>
  );
}