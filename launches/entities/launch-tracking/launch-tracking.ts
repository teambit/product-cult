import type { PlainLaunchTracking } from './plain-launch-tracking-type.js';
import type { NotificationPreferences } from './notification-preferences-type.js';

/**
 * Represents a user's tracking of a specific launch.
 * This class encapsulates the relationship between a user and a launch they are tracking,
 * including their notification preferences for that launch.
 */
export class LaunchTracking {
  /**
   * Constructs a new LaunchTracking instance.
   * @param id Unique identifier for the launch tracking entry.
   * @param userId Identifier of the user tracking the launch.
   * @param launchId Identifier of the launch being tracked.
   * @param notificationPreferences User's notification preferences for this launch.
   */
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly launchId: string,
    public readonly notificationPreferences: NotificationPreferences
  ) {}

  /**
   * Serializes the LaunchTracking instance into a plain JavaScript object.
   * @returns The plain object representation of the launch tracking entry.
   */
  toObject(): PlainLaunchTracking {
    return {
      id: this.id,
      userId: this.userId,
      launchId: this.launchId,
      notificationPreferences: { ...this.notificationPreferences }, // Return a copy
    };
  }

  /**
   * Creates a LaunchTracking instance from a plain launch tracking object.
   * This method is used to reconstruct a LaunchTracking entity from data,
   * such as data retrieved from an API or storage.
   * @param plainLaunchTracking The plain object containing launch tracking data.
   * @returns A new LaunchTracking instance.
   */
  static from(plainLaunchTracking: PlainLaunchTracking): LaunchTracking {
    return new LaunchTracking(
      plainLaunchTracking.id,
      plainLaunchTracking.userId,
      plainLaunchTracking.launchId,
      { ...plainLaunchTracking.notificationPreferences } // Create a new object for preferences
    );
  }
}