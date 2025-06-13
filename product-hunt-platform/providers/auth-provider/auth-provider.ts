import type { PlainAuthProvider } from './plain-auth-provider-type.js';

/**
 * Represents an authentication provider configuration.
 * This class can be used to manage different ways a user can authenticate.
 */
export class AuthProvider {
  /**
   * Constructs an instance of AuthProvider.
   * @param id Unique identifier for the auth provider.
   * @param providerName Name of the authentication provider (e.g., 'google', 'credentials').
   * @param isEnabled Indicates if the provider is currently enabled.
   */
  constructor(
    readonly id: string,
    readonly providerName: string,
    readonly isEnabled: boolean,
  ) {}

  /**
   * Serializes the AuthProvider instance into a plain JavaScript object.
   * This is useful for transferring the auth provider data.
   * @returns A plain object representation of the AuthProvider, including its id.
   */
  toObject(): PlainAuthProvider {
    return {
      id: this.id,
      providerName: this.providerName,
      isEnabled: this.isEnabled,
    };
  }

  /**
   * Creates an AuthProvider instance from a plain JavaScript object.
   * This is useful for reconstructing an AuthProvider from stored or received data.
   * @param plainAuthProvider The plain object to convert.
   * @returns A new instance of AuthProvider.
   */
  static from(plainAuthProvider: PlainAuthProvider): AuthProvider {
    return new AuthProvider(
      plainAuthProvider.id,
      plainAuthProvider.providerName,
      plainAuthProvider.isEnabled
    );
  }
}