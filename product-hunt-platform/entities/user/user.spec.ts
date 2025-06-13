import { describe, it, expect } from 'vitest';
import { User } from './user.js';
import { mockUser } from './user.mock.js';

describe('User', () => {
  it('should create a User instance from a plain object', () => {
    const plainUser = {
      userId: 'test-id',
      email: 'test@example.com',
      username: 'testuser',
    };
    const user = User.from(plainUser);
    expect(user.userId).toBe(plainUser.userId);
    expect(user.email).toBe(plainUser.email);
    expect(user.username).toBe(plainUser.username);
  });

  it('should serialize a User instance to a plain object including the id', () => {
    const user = mockUser({ userId: 'test-id', email: 'test@example.com', username: 'testuser' });
    const plainUser = user.toObject();
    expect(plainUser.id).toBe(user.userId);
    expect(plainUser.userId).toBe(user.userId);
    expect(plainUser.email).toBe(user.email);
    expect(plainUser.username).toBe(user.username);
  });

  it('should return a mock user with the provided overrides', () => {
    const mock = mockUser({ username: 'override' });
    expect(mock.username).toBe('override');
  });
});