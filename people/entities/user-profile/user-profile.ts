import type { PlainUserProfile } from './plain-user-profile.type.js';

/**
 * Represents a user profile entity.
 * Contains information about a user, including personal details, avatar, and social links.
 */
export class UserProfile {
  constructor(
    /**
     * Unique identifier for the user.
     * This is the primary ID for the user profile.
     */
    readonly userId: string,

    /**
     * Display name of the user.
     */
    readonly name: string,

    /**
     * Short biography of the user.
     */
    readonly bio: string,

    /**
     * ISO string representing the creation date of the profile.
     */
    readonly createdAt: string,

    /**
     * URL of the user's avatar image.
     * Optional.
     */
    readonly imageUrl?: string,

    /**
     * Company the user is associated with.
     * Optional.
     */
    readonly company?: string,

    /**
     * Email address of the user.
     * Optional.
     */
    readonly email?: string,

    /**
     * Physical location of the user.
     * Optional.
     */
    readonly location?: string,

    /**
     * A record of social media profile links.
     * Keys are platform names (e.g., "twitter", "linkedin"), values are URLs.
     * Optional. Defaults to an empty object.
     */
    readonly socialMediaLinks: Record<string, string> = {},

    /**
     * ISO string representing the last update date of the profile.
     * Optional.
     */
    readonly updatedAt?: string
  ) {}

  /**
   * Serializes the UserProfile instance into a plain JavaScript object.
   * The returned object includes the `userId` which serves as the unique identifier.
   * @returns {PlainUserProfile} A plain object representation of the user profile.
   */
  toObject(): PlainUserProfile {
    return {
      userId: this.userId,
      name: this.name,
      bio: this.bio,
      createdAt: this.createdAt,
      imageUrl: this.imageUrl,
      company: this.company,
      email: this.email,
      location: this.location,
      socialMediaLinks: this.socialMediaLinks,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Creates a UserProfile instance from a plain JavaScript object.
   * @param {PlainUserProfile} plainUserProfile - The plain object to convert.
   * @returns {UserProfile} A new instance of UserProfile.
   */
  static from(plainUserProfile: PlainUserProfile): UserProfile {
    return new UserProfile(
      plainUserProfile.userId,
      plainUserProfile.name,
      plainUserProfile.bio,
      plainUserProfile.createdAt,
      plainUserProfile.imageUrl,
      plainUserProfile.company,
      plainUserProfile.email,
      plainUserProfile.location,
      plainUserProfile.socialMediaLinks || {},
      plainUserProfile.updatedAt
    );
  }
}