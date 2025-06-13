/**
 * Defines the options required for a user to log in.
 * This type is used as input for the loginUser mutation.
 */
export type LoginUserOptions = {
  /**
   * The email address of the user attempting to log in.
   */
  email: string;
  /**
   * The password of the user attempting to log in.
   */
  password: string;
};