/**
 * Represents a product launch.
 * This type aligns with the Launch entity defined in the GraphQL schema and scope API.
 */
export type Launch = {
  /**
   * Unique identifier for the launch.
   */
  id: string;
  /**
   * Identifier of the product associated with this launch.
   */
  productId: string;
  /**
   * Name of the product being launched.
   */
  name: string;
  /**
   * Short, catchy tagline for the launch.
   */
  tagline: string;
  /**
   * Detailed description of the product and its launch.
   */
  description: string;
  /**
   * Scheduled date and time of the launch (ISO 8601 format).
   */
  launchDate: string;
  /**
   * Current status of the launch (e.g., "upcoming", "live", "archived").
   */
  status: string;
  /**
   * Identifier of the user who submitted the launch.
   */
  submittedBy: string;
  /**
   * Timestamp of when the launch was created (ISO 8601 format).
   */
  createdAt: string;
  /**
   * Timestamp of the last update to the launch (ISO 8601 format).
   */
  updatedAt: string;
};