import { v4 as uuidv4 } from 'uuid';
import type { PlainForum } from './plain-forum-type.js';

/**
 * Represents a forum entity.
 * Forums are spaces for discussions around specific topics.
 */
export class Forum {
  /**
   * Unique identifier for the forum.
   */
  readonly id: string;

  /**
   * Creates an instance of a Forum.
   * @param name Name of the forum.
   * @param description Description of the forum.
   * @param createdAt ISO date string of creation.
   * @param updatedAt ISO date string of last update.
   * @param imageUrl Optional URL for the forum's image.
   * @param id Optional unique identifier. If not provided, a new UUID will be generated.
   */
  constructor(
    /**
     * Name of the forum.
     */
    readonly name: string,
    /**
     * Description of the forum.
     */
    readonly description: string,
    /**
     * ISO date string representing when the forum was created.
     */
    readonly createdAt: string,
    /**
     * ISO date string representing when the forum was last updated.
     */
    readonly updatedAt: string,
    /**
     * Optional URL for an image representing the forum.
     */
    readonly imageUrl?: string,
    id?: string
  ) {
    this.id = id || uuidv4();
  }

  /**
   * Serializes the Forum instance into a plain JavaScript object.
   * @returns A PlainForum object.
   */
  toObject(): PlainForum {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      imageUrl: this.imageUrl,
    };
  }

  /**
   * Creates a Forum instance from a plain JavaScript object.
   * If an id is not provided in the plain object, a new UUID will be generated.
   * @param plainForum The plain JavaScript object.
   * @returns A new Forum instance.
   */
  static from(plainForum: PlainForum): Forum {
    return new Forum(
      plainForum.name,
      plainForum.description,
      plainForum.createdAt,
      plainForum.updatedAt,
      plainForum.imageUrl,
      plainForum.id
    );
  }
}