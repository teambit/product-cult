import type { NotificationPreferences } from './notification-preferences-type.js';

/**
 * Represents the plain object structure of a launch tracking entry.
 * This type is used for serialization and deserialization of LaunchTracking objects.
 */
export type PlainLaunchTracking = {
  /**
   * Unique identifier for the launch tracking entry.
   */
  id: string;

  /**
   * Identifier of the user tracking the launch.
   * Corresponds to the User entity's ID.
   */
  userId: string;

  /**
   * Identifier of the launch being tracked.
   * Corresponds to the Launch entity's ID.
   */
  launchId: string;

  /**
   * User's notification preferences for this specific launch tracking.
   */
  notificationPreferences: NotificationPreferences;
};