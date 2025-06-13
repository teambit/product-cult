/**
 * Represents a product launch, detailing its information, status, and scheduling.
 * This type aligns with the data structure used for launches throughout the platform.
 */
export type Launch = {
  /**
   * Unique identifier for the launch.
   * Example: "launch-123-abc"
   */
  id: string;
  /**
   * Identifier of the product associated with this launch.
   * Example: "prod-super-app"
   */
  productId: string;
  /**
   * The official name of the product being launched.
   * Example: "SuperApp X"
   */
  name: string;
  /**
   * A short, catchy phrase summarizing the product's value proposition for the launch.
   * Example: "The Future of Productivity."
   */
  tagline: string;
  /**
   * A detailed description of the product, its features, and what makes it special for this launch.
   * Example: "SuperApp X revolutionizes how you manage tasks, communicate with your team, and..."
   */
  description: string;
  /**
   * The scheduled date and time of the launch, in ISO 8601 format.
   * Example: "2024-12-01T10:00:00.000Z"
   */
  launchDate: string;
  /**
   * The current status of the launch (e.g., 'upcoming', 'live', 'past', 'cancelled').
   * Example: "upcoming"
   */
  status: string;
  /**
   * Identifier of the user who submitted this launch.
   * Example: "user-jane-doe"
   */
  submittedBy: string;
  /**
   * Timestamp of when the launch record was created, in ISO 8601 format.
   * Example: "2024-11-01T15:30:00.000Z"
   */
  createdAt: string;
  /**
   * Timestamp of when the launch record was last updated, in ISO 8601 format.
   * Example: "2024-11-15T09:45:00.000Z"
   */
  updatedAt: string;
};