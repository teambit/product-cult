import React from 'react';
import classNames from 'classnames';
import { Button } from '@infinity/design.actions.button';
import { UpvoteIcon } from '@infinity/upvotes.icons.upvote-icon';
import { useUpvote } from '@infinity/upvotes.hooks.use-upvote';
import styles from './upvote-button.module.scss';

export type UpvoteButtonProps = {
  /**
   * Unique identifier of the item (e.g., product, launch) to be upvoted.
   * This is crucial for the hook to target the correct item.
   */
  itemId: string;
  /**
   * Specifies the type of the item being upvoted (e.g., "product", "launch").
   * Used by the hook to categorize the upvote.
   */
  itemType: string;
  /**
   * Optional initial upvote count to display before the actual count is fetched.
   * This enhances perceived performance and is useful for SSR or optimistic UI.
   */
  initialCount?: number;
  /**
   * Optional initial upvoted status for the current user regarding this item.
   * Useful for SSR or to reflect a known state before the hook initializes client-side.
   */
  initialHasUpvoted?: boolean;
  /**
   * An optional CSS class name to apply to the root element of the upvote button.
   * This allows for further customization or integration with global styling patterns.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root button element.
   * While available for specific overrides, it's generally recommended to use
   * the `className` prop and SCSS modules for consistent and maintainable styling.
   */
  style?: React.CSSProperties;
  /**
   * Defines the size of the upvote icon within the button.
   * It accepts a number (pixel value) or a string (e.g., '1.5em', '20px').
   * This primarily affects the icon; overall button size is managed by its styles and padding.
   * @default 20
   */
  size?: string | number;
};

/**
 * UpvoteButton is an interactive component that allows users to upvote or remove their upvote
 * for a specific item. It displays the current upvote count and visually reflects the user's
 * vote status using an icon. The component leverages the `useUpvote` hook for its core logic,
 * ensuring optimistic updates and data synchronization.
 */
export function UpvoteButton({
  itemId,
  itemType,
  initialCount,
  initialHasUpvoted,
  className,
  style,
  size = 20, // Default icon size set to 20px for a compact look
}: UpvoteButtonProps): React.JSX.Element {
  const {
    count,
    hasUpvoted,
    upvote,
    downvote,
    loadingAction,
    // errorAction, // Available for more specific error handling if needed
  } = useUpvote({
    itemId,
    itemType,
    initialCount,
    initialHasUpvoted,
  });

  const handleVoteToggle = async (): Promise<void> => {
    if (loadingAction) {
      return; // Prevent multiple actions while one is in progress
    }
    try {
      if (hasUpvoted) {
        await downvote();
      } else {
        await upvote();
      }
    } catch (error) {
      // Basic error logging. In a real app, this might involve user-facing feedback.
      // eslint-disable-next-line no-console
      console.error(`Failed to ${hasUpvoted ? 'downvote' : 'upvote'} item ${itemId}:`, error);
    }
  };

  // Determine the count to display, prioritizing live count, then initial, then 0.
  const displayCount = count !== undefined ? count : (initialCount !== undefined ? initialCount : 0);
  const accessibilityTitle = hasUpvoted ? `Remove upvote. Current count: ${displayCount}` : `Upvote this item. Current count: ${displayCount}`;

  return (
    <Button
      appearance="secondary" // Using 'secondary' appearance for a common upvote button style
      onClick={handleVoteToggle}
      disabled={loadingAction}
      className={classNames(styles.upvoteButton, className, { [styles.isActive]: hasUpvoted })}
      style={style}
      // title prop removed from Button as it's not supported by its ButtonProps
    >
      <UpvoteIcon
        isActive={hasUpvoted}
        size={size}
        className={styles.icon}
        title={accessibilityTitle} // Pass the descriptive title to the UpvoteIcon
      />
      <span className={styles.count}>{displayCount}</span>
    </Button>
  );
}