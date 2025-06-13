/**
 * Represents the structure of a product launch.
 * This type defines all the relevant information associated with a launch event,
 * such as its identifiers, descriptive content, dates, and status.
 */
export type LaunchType = {
  /**
   * The unique identifier for the launch.
   * This ID is primary key for referencing a specific launch.
   */
  id: string;

  /**
   * The identifier of the product to which this launch pertains.
   * This links the launch back to its parent product.
   */
  productId: string;

  /**
   * The official name of the launch.
   * This is a human-readable name displayed to users.
   */
  name: string;

  /**
   * A concise and catchy tagline for the launch.
   * Used for brief descriptions or promotional materials.
   */
  tagline: string;

  /**
   * A detailed description of the launch, providing more context and information.
   */
  description: string;

  /**
   * The scheduled date for the launch, typically in ISO string format (e.g., "2024-12-31T00:00:00.000Z").
   */
  launchDate: string;

  /**
   * The current status of the launch (e.g., "upcoming", "live", "completed", "cancelled").
   * This indicates the lifecycle stage of the launch.
   */
  status: string;

  /**
   * The identifier of the user who originally submitted or created the launch.
   */
  submittedBy: string;

  /**
   * The timestamp indicating when the launch record was created, in ISO string format.
   */
  createdAt: string;

  /**
   * The timestamp indicating the last time the launch record was updated, in ISO string format.
   */
  updatedAt: string;
};