/**
 * Defines the type for variables required by the createLaunch mutation.
 */
export type CreateLaunchVariables = {
  /**
   * The ID of the product being launched.
   */
  productId: string;
  /**
   * The name of the launch.
   */
  name: string;
  /**
   * The tagline for the launch.
   */
  tagline: string;
  /**
   * A detailed description of the launch.
   */
  description: string;
  /**
   * The scheduled launch date, typically in ISO 8601 format.
   */
  launchDate: string;
};