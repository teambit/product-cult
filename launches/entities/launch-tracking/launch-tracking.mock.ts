import { LaunchTracking } from './launch-tracking.js';
import type { PlainLaunchTracking } from './plain-launch-tracking-type.js';
import type { NotificationPreferences } from './notification-preferences-type.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a single mock LaunchTracking instance with default data, allowing for partial overrides.
 * This is useful for testing and development scenarios where LaunchTracking objects are needed.
 * @param overrides Optional. An object containing properties to override in the default mock LaunchTracking.
 * @returns A mock LaunchTracking instance.
 */
export function mockLaunchTracking(overrides?: Partial<PlainLaunchTracking>): LaunchTracking {
  const defaultNotificationPreferences: NotificationPreferences = {
    emailEnabled: true,
    pushEnabled: false,
    inAppEnabled: true,
  };

  const defaultTracking: PlainLaunchTracking = {
    id: uuidv4(),
    userId: `user-${uuidv4()}`,
    launchId: `launch-${uuidv4()}`,
    notificationPreferences: { ...defaultNotificationPreferences },
    ...overrides,
  };
  
  // Ensure notificationPreferences are fully applied if overridden
  if (overrides?.notificationPreferences) {
    defaultTracking.notificationPreferences = {
      ...defaultNotificationPreferences,
      ...overrides.notificationPreferences,
    };
  }


  return LaunchTracking.from(defaultTracking);
}

/**
 * Provides an array of predefined mock LaunchTracking instances for development and testing.
 * This function utilizes mockLaunchTracking to generate varied tracking entries.
 * @returns An array containing diverse mock LaunchTracking objects.
 */
export function mockLaunchTrackings(): LaunchTracking[] {
  return [
    mockLaunchTracking({
      userId: 'user-123',
      launchId: 'launch-abc',
      notificationPreferences: {
        emailEnabled: true,
        pushEnabled: true,
        inAppEnabled: true,
      },
    }),
    mockLaunchTracking({
      userId: 'user-456',
      launchId: 'launch-def',
      notificationPreferences: {
        emailEnabled: false,
        pushEnabled: false,
        inAppEnabled: true,
      },
    }),
    mockLaunchTracking({
      userId: 'user-789',
      launchId: 'launch-ghi',
    }), // uses default notification preferences from mockLaunchTracking
  ];
}