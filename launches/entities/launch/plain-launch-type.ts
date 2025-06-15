/**
 * Represents the plain object structure for a Launch.
 * This type is used for de-serializing and serializing Launch data.
 */
export type PlainLaunch = {
  /**
   * Unique identifier for the launch.
   */
  id: string;

  /**
   * Identifier of the product being launched.
   */
  productId: string;

  /**
   * Name of the launch.
   */
  name: string;

  /**
   * Tagline for the launch.
   */
  tagline: string;

  /**
   * Detailed description of the launch.
   */
  description: string;

  /**
   * Date and time of the launch, typically in ISO 8601 format.
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
   * Timestamp of when the launch was created, in ISO 8601 format.
   */
  createdAt: string;

  /**
   * Timestamp of when the launch was last updated, in ISO 8601 format.
   */
  updatedAt: string;

  /**
   * image url
   */
  imageUrl?: string;
};