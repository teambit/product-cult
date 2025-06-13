import { v4 as uuidv4 } from 'uuid';
import type { PlainLaunch } from './plain-launch-type.js';

/**
 * Represents a product launch.
 * This class encapsulates the properties and behavior of a launch.
 */
export class Launch {
  /**
   * Unique identifier for the launch.
   */
  public readonly id: string;

  constructor(
    /**
     * Identifier of the product being launched.
     */
    public readonly productId: string,

    /**
     * Name of the launch.
     */
    public readonly name: string,

    /**
     * Tagline for the launch.
     */
    public readonly tagline: string,

    /**
     * Detailed description of the launch.
     */
    public readonly description: string,

    /**
     * Date and time of the launch, typically in ISO 8601 format.
     */
    public readonly launchDate: string,

    /**
     * Current status of the launch (e.g., "upcoming", "live", "archived").
     */
    public readonly status: string,

    /**
     * Identifier of the user who submitted the launch.
     */
    public readonly submittedBy: string,

    /**
     * Timestamp of when the launch was created, in ISO 8601 format.
     */
    public readonly createdAt: string,

    /**
     * Timestamp of when the launch was last updated, in ISO 8601 format.
     */
    public readonly updatedAt: string,

    /**
     * Optional unique identifier. If not provided, a new UUID will be generated.
     */
    id?: string
  ) {
    this.id = id || uuidv4();
  }

  /**
   * Serializes the Launch instance into a plain JavaScript object.
   * @returns A plain object representation of the launch.
   */
  toObject(): PlainLaunch {
    return {
      id: this.id,
      productId: this.productId,
      name: this.name,
      tagline: this.tagline,
      description: this.description,
      launchDate: this.launchDate,
      status: this.status,
      submittedBy: this.submittedBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a Launch instance from a plain JavaScript object.
   * @param plainLaunch - The plain object to create the launch from.
   * @returns A new Launch instance.
   */
  static from(plainLaunch: PlainLaunch): Launch {
    return new Launch(
      plainLaunch.productId,
      plainLaunch.name,
      plainLaunch.tagline,
      plainLaunch.description,
      plainLaunch.launchDate,
      plainLaunch.status,
      plainLaunch.submittedBy,
      plainLaunch.createdAt,
      plainLaunch.updatedAt,
      plainLaunch.id
    );
  }
}