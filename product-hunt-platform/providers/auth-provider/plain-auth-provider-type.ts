/**
 * Defines the structure for a plain object representation of an AuthProvider.
 * This type is used for serialization and deserialization purposes.
 */
export type PlainAuthProvider = {
  /**
   * Unique identifier for the auth provider.
   * This ID should be unique across all authentication providers.
   */
  id: string;

  /**
   * Name of the authentication provider.
   * For example, 'google', 'github', 'credentials'.
   */
  providerName: string;

  /**
   * Indicates if the authentication provider is currently active and usable.
   * True if enabled, false otherwise.
   */
  isEnabled: boolean;
};