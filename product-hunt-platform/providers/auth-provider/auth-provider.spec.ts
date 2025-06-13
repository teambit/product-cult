import { AuthProvider } from './auth-provider.js';
import { describe, it, expect } from 'vitest';

describe('AuthProvider', () => {
  it('should create an AuthProvider instance from a plain object', () => {
    const plainAuthProvider = {
      id: '123',
      providerName: 'google',
      isEnabled: true,
    };
    const authProvider = AuthProvider.from(plainAuthProvider);
    expect(authProvider).toBeInstanceOf(AuthProvider);
    expect(authProvider.id).toBe('123');
    expect(authProvider.providerName).toBe('google');
    expect(authProvider.isEnabled).toBe(true);
  });

  it('should serialize an AuthProvider instance to a plain object', () => {
    const authProvider = new AuthProvider('456', 'github', false);
    const plainObject = authProvider.toObject();
    expect(plainObject).toEqual({
      id: '456',
      providerName: 'github',
      isEnabled: false,
    });
  });

  it('should create an AuthProvider instance with the correct properties', () => {
    const authProvider = new AuthProvider('789', 'credentials', true);
    expect(authProvider.id).toBe('789');
    expect(authProvider.providerName).toBe('credentials');
    expect(authProvider.isEnabled).toBe(true);
  });
});