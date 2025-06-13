/**
 * Defines the type for variables that can be used to filter and paginate the listLaunches query.
 * All properties are optional.
 */
export type ListLaunchesVariables = {
  /**
   * The maximum number of launches to return.
   */
  limit?: number;
  /**
   * The number of launches to skip before starting to collect the result set.
   */
  offset?: number;
  /**
   * Filter launches by product ID.
   */
  productId?: string;
  /**
   * Filter launches by status (e.g., "upcoming", "live", "archived").
   */
  status?: string;
  /**
   * Filter launches starting from this launch date (ISO 8601 format).
   */
  launchDateStart?: string;
  /**
   * Filter launches up to this launch date (ISO 8601 format).
   */
  launchDateEnd?: string;
};