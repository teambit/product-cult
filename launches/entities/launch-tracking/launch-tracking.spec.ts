import { LaunchTracking } from './launch-tracking.js';
import { mockLaunchTracking } from './launch-tracking.mock.js';

describe('LaunchTracking', () => {
  it('should create a LaunchTracking instance from a plain object', () => {
    const plainTracking = {
      id: '123',
      userId: 'user1',
      launchId: 'launch1',
      notificationPreferences: { emailEnabled: true, pushEnabled: false, inAppEnabled: true },
    };
    const launchTracking = LaunchTracking.from(plainTracking);
    expect(launchTracking).toBeInstanceOf(LaunchTracking);
    expect(launchTracking.id).toBe(plainTracking.id);
    expect(launchTracking.userId).toBe(plainTracking.userId);
    expect(launchTracking.launchId).toBe(plainTracking.launchId);
  });

  it('should serialize a LaunchTracking instance to a plain object', () => {
    const notificationPreferences = { emailEnabled: true, pushEnabled: false, inAppEnabled: true };
    const launchTracking = new LaunchTracking('123', 'user1', 'launch1', notificationPreferences);
    const plainObject = launchTracking.toObject();
    expect(plainObject.id).toBe('123');
    expect(plainObject.userId).toBe('user1');
    expect(plainObject.launchId).toBe('launch1');
    expect(plainObject.notificationPreferences).toEqual(notificationPreferences);
  });

  it('should create a mock LaunchTracking instance', () => {
    const mock = mockLaunchTracking();
    expect(mock).toBeInstanceOf(LaunchTracking);
  });
});