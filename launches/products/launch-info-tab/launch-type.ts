/**
 * Represents a product launch.
 * This type mirrors the Launch entity defined in the GraphQL schema and system-wide APIs.
 */
export type Launch = {
  /**
   * The unique identifier of the launch.
   */
  id: string;
  /**
   * The ID of the product associated with this launch.
   */
  productId: string;
  /**
   * The name of the launch.
   */
  name: string;
  /**
   * The tagline or short description for the launch.
   */
  tagline: string;
  /**
   * A detailed description of the launch.
   */
  description: string;
  /**
   * The scheduled or actual launch date, typically in ISO 8601 format.
   */
  launchDate: string;
  /**
   * The current status of the launch (e.g., "upcoming", "live", "archived").
   */
  status: string;
  /**
   * The identifier of the user who submitted the launch.
   */
  submittedBy: string;
  /**
   * The timestamp when the launch record was created, in ISO 8601 format.
   */
  createdAt: string;
  /**
   * The timestamp when the launch record was last updated, in ISO 8601 format.
   */
  updatedAt: string;
};