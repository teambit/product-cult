/**
 * Defines the input structure for updating a user profile.
 * All fields are optional, allowing for partial updates to the profile.
 */
export type UpdateUserProfileOptionsInput = {
  /**
   * The new biography for the user.
   * If provided, this will replace the existing bio.
   */
  bio?: string;
  /**
   * The new display name for the user.
   * If provided, this will replace the existing display name.
   */
  displayName?: string;
  /**
   * The new company affiliation for the user.
   * If provided, this will update the user's company information.
   */
  company?: string;
  /**
   * The new URL for the user's avatar image.
   * If provided, this will update the user's profile picture.
   */
  imageUrl?: string;
};