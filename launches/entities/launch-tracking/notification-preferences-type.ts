/**
 * Defines the notification preferences for a launch tracking entry.
 * Specifies which channels a user wants to receive notifications through.
 */
export type NotificationPreferences = {
  /**
   * Indicates if email notifications are enabled.
   */
  emailEnabled: boolean;

  /**
   * Indicates if push notifications are enabled.
   */
  pushEnabled: boolean;

  /**
   * Indicates if in-app notifications are enabled.
   */
  inAppEnabled: boolean;
};