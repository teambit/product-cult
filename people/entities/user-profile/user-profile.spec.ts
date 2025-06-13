import { describe, it, expect } from 'vitest';
import { UserProfile } from './user-profile.js';
import { createMockUserProfile } from './user-profile.mock.js';

describe('UserProfile', () => {
  it('should create a UserProfile instance from a plain object', () => {
    const plainObject = {
      userId: '123',
      name: 'John Doe',
      bio: 'Software Engineer',
      createdAt: new Date().toISOString(),
    };
    const userProfile = UserProfile.from(plainObject);
    expect(userProfile).toBeInstanceOf(UserProfile);
    expect(userProfile.userId).toBe(plainObject.userId);
    expect(userProfile.name).toBe(plainObject.name);
  });

  it('should serialize a UserProfile instance into a plain object', () => {
    const userProfile = createMockUserProfile();
    const plainObject = userProfile.toObject();
    expect(plainObject.userId).toBe(userProfile.userId);
    expect(plainObject.name).toBe(userProfile.name);
  });

  it('should create a mock UserProfile with overridden properties', () => {
    const overrides = { name: 'Custom Name', bio: 'Custom Bio' };
    const mockProfile = createMockUserProfile(overrides);
    expect(mockProfile.name).toBe(overrides.name);
    expect(mockProfile.bio).toBe(overrides.bio);
  });
});