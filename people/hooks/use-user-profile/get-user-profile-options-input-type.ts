/**
 * Defines the input structure for querying a specific user profile.
 * This type is used to pass variables to the getUserProfile GraphQL query.
 */
export type GetUserProfileOptionsInput = {
  /**
   * The unique identifier of the user whose profile is to be fetched.
   */
  userId: string;
};