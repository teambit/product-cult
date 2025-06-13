/**
 * Defines the structure for user notification preferences related to a launch.
 * This type is used by components like LaunchTrackingButton to manage how a user
 * wishes to be notified about updates to a specific launch they are tracking.
 */
export type NotificationPreferences = {
  /**
   * Indicates whether email notifications are enabled for the tracked launch.
   * If true, the user will receive email updates.
   */
  emailEnabled: boolean;

  /**
   * Indicates whether push notifications (mobile or web) are enabled for the tracked launch.
   * If true, the user will receive push notifications.
   */
  pushEnabled: boolean;

  /**
   * Indicates whether in-app notifications are enabled for the tracked launch.
   * If true, the user will see notifications within the application itself.
   */
  inAppEnabled: boolean;
};