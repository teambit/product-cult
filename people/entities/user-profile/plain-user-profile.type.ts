/**
 * Represents the plain object structure of a user profile.
 * This type is used for serialization and deserialization purposes.
 */
export type PlainUserProfile = {
  /**
   * Unique identifier for the user.
   */
  userId: string;

  /**
   * Display name of the user.
   */
  name: string;

  /**
   * URL of the user's avatar image.
   * Corresponds to 'avatar' from the user prompt.
   */
  imageUrl?: string;

  /**
   * Short biography of the user.
   */
  bio: string;

  /**
   * Company the user is associated with.
   */
  company?: string;

  /**
   * Email address of the user.
   */
  email?: string;

  /**
   * Physical location of the user.
   */
  location?: string;

  /**
   * A record of social media profile links, where keys are platform names (e.g., "twitter", "linkedin")
   * and values are the URLs.
   */
  socialMediaLinks?: Record<string, string>;

  /**
   * ISO string representing the creation date of the profile.
   */
  createdAt: string;

  /**
   * ISO string representing the last update date of the profile.
   */
  updatedAt?: string;
};