/**
 * Represents the plain JavaScript object structure of a forum.
 * This type is used for serialization and deserialization.
 */
export type PlainForum = {
  /**
   * Unique identifier for the forum.
   */
  id: string;

  /**
   * Name of the forum.
   */
  name: string;

  /**
   * Description of the forum.
   */
  description: string;

  /**
   * ISO date string representing when the forum was created.
   */
  createdAt: string;

  /**
   * ISO date string representing when the forum was last updated.
   */
  updatedAt: string;

  /**
   * Optional URL for an image representing the forum.
   */
  imageUrl?: string;
};