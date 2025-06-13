import { UserProfile } from './user-profile.js';
import type { PlainUserProfile } from './plain-user-profile.type.js';

/**
 * Creates a mock UserProfile instance.
 * Allows overriding default mock values with provided properties.
 * @param {Partial<PlainUserProfile>} [overrides] - Optional properties to override the default mock values.
 * @returns {UserProfile} A mock UserProfile instance.
 */
export function createMockUserProfile(overrides?: Partial<PlainUserProfile>): UserProfile {
  const now = new Date().toISOString();
  const defaultProfile: PlainUserProfile = {
    userId: `user-${Math.random().toString(36).substring(2, 9)}`,
    name: 'Mock User',
    bio: 'This is a mock bio for a mock user.',
    createdAt: now,
    imageUrl: 'https://example.com/mock-avatar.png',
    company: 'Mock Company Inc.',
    email: 'mock.user@example.com',
    location: 'Mockville, Mockland',
    socialMediaLinks: {
      twitter: 'https://twitter.com/mockuser',
      linkedin: 'https://linkedin.com/in/mockuser',
    },
    updatedAt: now,
    ...overrides,
  };
  return UserProfile.from(defaultProfile);
}

/**
 * Provides an array of predefined mock UserProfile instances.
 * Useful for populating lists or demonstrations.
 * @returns {UserProfile[]} An array of mock UserProfile instances.
 */
export function mockUserProfiles(): UserProfile[] {
  return [
    UserProfile.from({
      userId: 'user1',
      name: 'Alice Wonderland',
      bio: 'Curiouser and curiouser! Exploring the digital rabbit hole.',
      createdAt: new Date('2023-01-15T10:00:00.000Z').toISOString(),
      imageUrl: 'https://example.com/alice.png',
      company: 'Wonderland Creations',
      email: 'alice@example.com',
      location: 'Fantasy Land',
      socialMediaLinks: {
        instagram: 'https://instagram.com/alice_w',
      },
      updatedAt: new Date('2023-10-20T14:30:00.000Z').toISOString(),
    }),
    UserProfile.from({
      userId: 'user2',
      name: 'Bob The Builder',
      bio: 'Can we fix it? Yes, we can! Building cool stuff online.',
      createdAt: new Date('2022-11-01T08:00:00.000Z').toISOString(),
      imageUrl: 'https://example.com/bob.png',
      company: 'BuildIt Solutions',
      email: 'bob@example.com',
      location: 'Construction City',
      socialMediaLinks: {
        github: 'https://github.com/bobthebuilder',
        linkedin: 'https://linkedin.com/in/bobbuilder',
      },
      // Bob's profile was never updated
    }),
    UserProfile.from({
      userId: 'user3',
      name: 'Charlie Brown',
      bio: 'Good grief! Just trying to fly a kite in this digital world.',
      createdAt: new Date('2023-05-05T12:00:00.000Z').toISOString(),
      // No image URL for Charlie
      company: 'Peanuts Corp.',
      email: 'charlie@example.com',
      location: 'Hometown, USA',
      socialMediaLinks: {}, // No social media links
      updatedAt: new Date('2023-05-05T12:00:00.000Z').toISOString(),
    }),
  ];
}