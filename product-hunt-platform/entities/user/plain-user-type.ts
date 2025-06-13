/**
 * Represents the plain object structure of a user.
 * This type is used for serialization and deserialization of User objects,
 * and aligns with the User type defined in the GraphQL schema.
 */
export type PlainUser = {
  /**
   * Unique identifier for the user.
   * Corresponds to the 'userId' property. This field is mandatory.
   */
  userId: string;

  /**
   * Email address of the user. This field is mandatory.
   */
  email: string;

  /**
   * Username of the user. This field is mandatory.
   */
  username: string;

  /**
   * URL of the user's avatar image. Optional.
   * If not provided, it implies the user has no avatar or a default might be used.
   */
  imageUrl?: string;

  /**
   * Array of roles assigned to the user. Optional.
   * If not provided, it defaults to an empty array, indicating no specific roles.
   * Roles are represented as strings.
   */
  roles?: readonly string[];
};