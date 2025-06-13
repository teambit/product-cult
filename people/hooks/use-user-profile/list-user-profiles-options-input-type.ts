/**
 * Defines the input structure for listing user profiles.
 * This type allows for pagination and search functionality when querying a list of user profiles.
 */
export type ListUserProfilesOptionsInput = {
  /**
   * The number of profiles to skip before starting to collect the result set.
   * Useful for pagination.
   */
  offset?: number;
  /**
   * The maximum number of profiles to return in a single query.
   * Useful for pagination.
   */
  limit?: number;
  /**
   * A search term to filter profiles. The search is typically performed across
   * fields like name, bio, etc.
   */
  search?: string;
};