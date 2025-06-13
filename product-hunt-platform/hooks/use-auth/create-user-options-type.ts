/**
 * Defines the options required for creating a new user.
 * This type is used as input for the signup/createUser mutation.
 */
export type CreateUserOptions = {
  /**
   * The email address for the new user. Must be unique.
   */
  email: string;
  /**
   * The password for the new user.
   */
  password: string;
  /**
   * The chosen name for the new user. This might be used to derive a username or display name.
   */
  name: string;
};