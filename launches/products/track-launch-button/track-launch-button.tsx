import React from 'react';
import classNames from 'classnames';
import { LaunchTrackingButton as PlatformLaunchTrackingButton } from '@infinity/launches.ui.launch-tracking-button';
import type { NotificationPreferencesType } from './notification-preferences-type.js';
import type { LaunchType } from './launch-type.js';
import styles from './track-launch-button.module.scss';

/**
 * Props for the TrackLaunchButton component.
 * This component serves as an adapter for the ProductAction slot,
 * allowing users to track a specific product launch. It wraps the
 * PlatformLaunchTrackingButton to integrate it into product-related contexts.
 */
export type TrackLaunchButtonProps = {
  /**
   * The launch object containing details like ID, name, etc.
   * This is typically provided by the context rendering the product action,
   * such as a product detail page. It must include at least the launch ID.
   */
  launch: LaunchType;

  /**
   * The unique identifier of the current user.
   * This is required to associate the tracking action with a specific user
   * and is passed to the underlying tracking mechanism.
   */
  userId: string;

  /**
   * Initial tracking state of the launch for the current user.
   * Set to true if the user is already tracking this launch, false otherwise.
   * This allows the button to reflect the correct state upon rendering.
   * Defaults to false.
   */
  initialTracked?: boolean;

  /**
   * Initial notification preferences to be used when tracking is enabled.
   * If not provided, the underlying LaunchTrackingButton component will use its
   * default notification preferences.
   */
  initialNotificationPreferences?: NotificationPreferencesType;

  /**
   * Callback function invoked when the tracking status (tracked/untracked) changes
   * as a result of user interaction with the button.
   * It receives the new tracking state (boolean), the launch ID (string), the user ID (string),
   * and the notification preferences associated with this tracking action.
   */
  onTrackChange?: (
    tracked: boolean,
    launchId: string,
    userId: string,
    preferences: NotificationPreferencesType
  ) => void;

  /**
   * An optional CSS class name to apply to the root wrapper of the component.
   * This allows for custom styling, spacing, or integration with utility CSS frameworks.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the component's root wrapper element.
   * While available for specific overrides, it is generally recommended to use
   * the `className` prop and SCSS modules for styling to maintain consistency.
   */
  style?: React.CSSProperties;
};

/**
 * TrackLaunchButton is a composite component designed to be used as a "Product Action".
 * It enables users to track or untrack a specific product's launch by wrapping and
 * configuring the PlatformLaunchTrackingButton. This component ensures seamless
 * integration into product detail pages or similar contexts where users can interact
 * with launch-specific actions.
 */
export function TrackLaunchButton({
  launch,
  userId,
  initialTracked = false,
  initialNotificationPreferences,
  onTrackChange,
  className,
  style,
}: TrackLaunchButtonProps): React.JSX.Element {
  // Ensure that essential launch data, particularly the ID, is available.
  // If not, the button cannot function correctly and should not be rendered,
  // or a disabled/placeholder state could be shown based on UX requirements.
  if (!launch || !launch.id) {
    // Intentionally returning an empty fragment if launch data is insufficient.
    // In a real application, logging a warning or showing a placeholder might be preferable.
    return <></>;
  }

  return (
    <div
      className={classNames(styles.trackLaunchButtonWrapper, className)}
      style={style}
    >
      <PlatformLaunchTrackingButton
        launchId={launch.id}
        userId={userId}
        initialTracked={initialTracked}
        initialNotificationPreferences={initialNotificationPreferences}
        onTrackChange={onTrackChange}
      />
    </div>
  );
}