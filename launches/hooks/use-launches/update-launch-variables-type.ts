/**
 * Defines the type for variables required by the updateLaunch mutation.
 * The 'id' is mandatory, while other fields are optional for partial updates.
 */
export type UpdateLaunchVariables = {
  /**
   * The unique identifier of the launch to update.
   */
  id: string;
  /**
   * New name for the launch.
   */
  name?: string;
  /**
   * New tagline for the launch.
   */
  tagline?: string;
  /**
   * New detailed description for the launch.
   */
  description?: string;
  /**
   * New scheduled launch date (ISO 8601 format).
   */
  launchDate?: string;
  /**
   * New status for the launch (e.g., "upcoming", "live", "archived").
   */
  status?: string;
};