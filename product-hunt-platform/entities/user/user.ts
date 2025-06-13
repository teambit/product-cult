import type { PlainUser } from './plain-user-type.js';

/**
 * Represents a user in the Product Hunt platform.
 * This class encapsulates user data and provides methods for serialization
 * and deserialization. It aligns with the User entity defined in the platform's API.
 */
export class User {
  /**
   * Constructs a new User instance.
   * @param userId Unique identifier for the user.
   * @param email Email address of the user.
   * @param username Username of the user.
   * @param imageUrl Optional URL of the user's avatar image.
   * @param roles Optional array of roles assigned to the user. Defaults to an empty array.
   */
  constructor(
    /**
     * Unique identifier for the user.
     */
    readonly userId: string,

    /**
     * Email address of the user.
     */
    readonly email: string,

    /**
     * Username of the user.
     */
    readonly username: string,

    /**
     * URL of the user's avatar image. Optional.
     */
    readonly imageUrl?: string,

    /**
     * Array of roles assigned to the user. Defaults to an empty array.
     * These roles can be used for authorization purposes within the platform.
     */
    readonly roles: readonly string[] = []
  ) {}

  /**
   * Gets the unique identifier of the user.
   * This serves as the primary 'id' for the entity, consistent with `userId`.
   * @returns The user's unique ID.
   */
  get id(): string {
    return this.userId;
  }

  /**
   * Serializes the User instance into a plain JavaScript object.
   * This method includes the virtual 'id' property (same as userId) along with all other user properties.
   * The structure is compatible with the PlainUser type.
   * @returns The plain object representation of the user, including 'id'.
   */
  toObject(): PlainUser & { id: string } {
    return {
      id: this.id,
      userId: this.userId,
      email: this.email,
      username: this.username,
      imageUrl: this.imageUrl,
      roles: [...this.roles], // Return a new array to ensure immutability of the instance's roles
    };
  }

  /**
   * Creates a User instance from a plain user object.
   * This method is used to reconstruct a User entity from data that conforms to PlainUser,
   * such as data retrieved from an API or storage.
   * @param plainUser The plain object containing user data.
   *                  Must include 'userId', 'email', and 'username'.
   *                  'imageUrl' and 'roles' are optional.
   * @returns A new User instance.
   */
  static from(plainUser: PlainUser): User {
    return new User(
      plainUser.userId,
      plainUser.email,
      plainUser.username,
      plainUser.imageUrl,
      plainUser.roles || [] // Ensure roles is an array, defaulting to empty if undefined or null
    );
  }
}