/**
 * Represents a product launch entity.
 * This type definition is based on the high-level API type for Launch.
 */
export type Launch = {
  /**
   * The unique identifier for the launch.
   */
  id: string;
  /**
   * The ID of the product associated with this launch.
   */
  productId: string;
  /**
   * The name of the product being launched.
   */
  name: string;
  /**
   * A short, catchy tagline for the launch.
   */
  tagline: string;
  /**
   * A detailed description of the product launch.
   */
  description: string;
  /**
   * The scheduled date and time of the launch, in ISO 8601 format.
   */
  launchDate: string;
  /**
   * The current status of the launch (e.g., 'upcoming', 'live', 'ended').
   */
  status: string;
  /**
   * The ID of the user who submitted this launch.
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