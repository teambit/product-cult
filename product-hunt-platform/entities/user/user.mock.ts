import { User } from './user.js';
import type { PlainUser } from './plain-user-type.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Creates a single mock User instance with default data, allowing for partial overrides.
 * This is useful for testing and development scenarios where User objects are needed.
 * @param overrides Optional. An object containing properties to override in the default mock User.
 *                  All properties of PlainUser can be overridden. If 'userId' is not provided, a new UUID is generated.
 * @returns A mock User instance.
 */
export function mockUser(overrides: Partial<PlainUser> = {}): User {
  const generatedId = uuidv4();
  // Generate default username and email based on the ID to ensure some uniqueness if not overridden
  const defaultUsername = `user_${generatedId.substring(0, 8)}`;
  const defaultEmail = `${defaultUsername}@example.com`;

  const data: PlainUser = {
    userId: overrides.userId !== undefined ? overrides.userId : generatedId,
    email: overrides.email !== undefined ? overrides.email : defaultEmail,
    username: overrides.username !== undefined ? overrides.username : defaultUsername,
    // If 'imageUrl' is explicitly part of overrides (even if undefined or null), use that value. Otherwise, provide a default.
    imageUrl: 'imageUrl' in overrides ? overrides.imageUrl : `https://i.pravatar.cc/150?u=${overrides.userId || generatedId}`,
    roles: overrides.roles !== undefined ? overrides.roles : ['user'],
  };

  return User.from(data);
}

/**
 * Provides an array of predefined mock User instances for development and testing.
 * This function utilizes mockUser to generate varied user profiles.
 * @returns An array containing diverse mock User objects.
 */
export function mockUsers(): User[] {
  return [
    mockUser({
      userId: 'user-example-jane-doe',
      email: 'jane.doe@example.com',
      username: 'janedoe',
      imageUrl: 'https://example.com/avatars/janedoe.png',
      roles: ['user', 'editor'],
    }),
    mockUser({
      userId: 'user-example-john-smith',
      email: 'john.smith@example.com',
      username: 'johnsmith',
      imageUrl: undefined, // Explicitly set to undefined for a user with no avatar
      roles: ['user'],
    }),
    mockUser({ // This user will mostly use generated defaults from mockUser
      username: 'defaultatron', // Override just one field
    }),
    mockUser({
      userId: 'user-example-admin-user',
      email: 'admin@example.com',
      username: 'adminboss',
      roles: ['admin', 'user'],
    }),
  ];
}