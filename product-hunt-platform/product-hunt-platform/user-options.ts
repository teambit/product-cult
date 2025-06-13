/**
 * Options for creating a new user.
 */
export type CreateUserOptions = {
  email: string;
  password: string;
  name: string;
};

/**
 * Options for logging in a user.
 */
export type LoginUserOptions = {
  email: string;
  password: string;
};

/**
 * Options for updating an existing user's profile.
 */
export type UpdateUserOptions = {
  name?: string;
  password?: string;
  avatar?: string; // Renamed from 'imageUrl' to 'avatar' to match GraphQL input
};

/**
 * Options for retrieving a specific user's profile by ID.
 */
export type GetUserOptions = {
  userId: string;
};

/**
 * Options for listing users with pagination and search.
 */
export type ListUsersOptions = {
  offset?: number;
  limit?: number;
  search?: string;
};