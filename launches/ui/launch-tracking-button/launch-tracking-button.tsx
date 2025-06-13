import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Button } from '@infinity/design.actions.button';
import type { NotificationPreferences } from '@infinity/launches.entities.launch-tracking';
import styles from './launch-tracking-button.module.scss';

/**
 * Default notification preferences for new tracking instances.
 * Email is enabled by default, while push and in-app notifications can be configured.
 */
const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  emailEnabled: true,
  pushEnabled: false,
  inAppEnabled: true,
};

/**
 * Props for the LaunchTrackingButton component.
 * These props define the behavior and appearance of the button used for tracking product launches.
 */
export type LaunchTrackingButtonProps = {
  /**
   * The unique identifier of the launch to be tracked.
   * This ID is crucial for identifying which launch the tracking action applies to.
   */
  launchId: string;

  /**
   * The unique identifier of the user performing the tracking action.
   * This ID helps associate the tracking activity with a specific user account for backend operations.
   */
  userId: string;

  /**
   * Initial tracking state of the launch.
   * Set to true if the user is already tracking this launch, false otherwise.
   * This allows the button to reflect the current tracking status upon rendering.
   * @default false
   */
  initialTracked?: boolean;

  /**
   * Initial notification preferences to be used when tracking is enabled.
   * If not provided, default preferences will be applied.
   * These preferences determine how the user receives updates for the tracked launch (e.g., via email, push).
   * @default { emailEnabled: true, pushEnabled: false, inAppEnabled: true }
   */
  initialNotificationPreferences?: NotificationPreferences;

  /**
   * Callback function invoked when the tracking status (tracked/untracked) changes as a result of user interaction.
   * It receives the new tracking state (boolean), the launch ID (string), the user ID (string),
   * and the notification preferences associated with this tracking action.
   * This callback allows parent components to handle API calls or other side effects.
   */
  onTrackChange?: (
    tracked: boolean,
    launchId: string,
    userId: string,
    preferences: NotificationPreferences
  ) => void;

  /**
   * An optional CSS class name to apply to the root element of the button.
   * This allows for applying custom styles or integrating with utility CSS frameworks,
   * augmenting the default styling of the button.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the button's root element.
   * While available for specific overrides, it's generally recommended to use
   * the `className` prop and SCSS modules for styling to maintain consistency and reusability.
   */
  style?: React.CSSProperties;
};

/**
 * A button component that allows users to track or untrack a specific product launch.
 * It visually indicates the current tracking status and triggers a callback when this status changes,
 * enabling integration with backend services for managing launch tracking and notifications.
 * The button's appearance and text update dynamically based on whether the launch is being tracked.
 */
export function LaunchTrackingButton({
  launchId,
  userId,
  initialTracked = false,
  initialNotificationPreferences = DEFAULT_NOTIFICATION_PREFERENCES,
  onTrackChange,
  className,
  style,
}: LaunchTrackingButtonProps): React.JSX.Element {
  const [isTracked, setIsTracked] = useState<boolean>(initialTracked);

  // Effect to synchronize the internal tracking state if the `initialTracked` prop changes externally.
  // This ensures the button accurately reflects the tracking status if it's updated by a parent component.
  useEffect(() => {
    setIsTracked(initialTracked);
  }, [initialTracked]);

  /**
   * Handles the click event on the button.
   * It toggles the internal tracking state (`isTracked`) and, if an `onTrackChange` callback is provided,
   * invokes it with the new state, relevant identifiers (launchId, userId), and notification preferences.
   */
  const handleToggleTracking = () => {
    const newTrackedState = !isTracked;
    setIsTracked(newTrackedState);
    if (onTrackChange) {
      onTrackChange(
        newTrackedState,
        launchId,
        userId,
        initialNotificationPreferences // Pass the preferences that would apply if tracking is enabled
      );
    }
  };

  return (
    <Button
      appearance={isTracked ? 'secondary' : 'primary'}
      onClick={handleToggleTracking}
      className={classNames(styles.launchTrackingButton, className)}
      style={style}
      // `aria-pressed` indicates the state of a toggle button to assistive technologies.
      aria-pressed={isTracked}
    >
      {isTracked ? 'Stop Tracking' : 'Track Launch'}
    </Button>
  );
}