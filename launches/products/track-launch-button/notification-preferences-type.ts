/**
 * Defines the structure for user notification preferences related to a tracked launch.
 * This allows users to specify how they wish to be notified about updates or events
 * concerning a launch they are following.
 */
export type NotificationPreferencesType = {
  /**
   * Indicates whether email notifications are enabled for the tracked launch.
   * If true, the user will receive email updates.
   */
  emailEnabled: boolean;

  /**
   * Indicates whether push notifications (e.g., mobile or web push) are enabled for the tracked launch.
   * If true, the user will receive push notifications.
   */
  pushEnabled: boolean;

  /**
   * Indicates whether in-app notifications (notifications displayed within the platform)
   * are enabled for the tracked launch. If true, the user will see notifications inside the application.
   */
  inAppEnabled: boolean;
};