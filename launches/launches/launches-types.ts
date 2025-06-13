/**
 * Options for creating a new product launch.
 */
export type CreateLaunchOptions = {
  productId: string;
  name: string;
  tagline: string;
  description: string;
  launchDate: string;
};

/**
 * Options for retrieving a product launch by ID.
 */
export type GetLaunchOptions = {
  id: string;
};

/**
 * Options for updating an existing product launch.
 */
export type UpdateLaunchOptions = {
  id: string;
  name?: string;
  tagline?: string;
  description?: string;
  launchDate?: string;
  status?: string;
};

/**
 * Options for deleting a product launch by ID.
 */
export type DeleteLaunchOptions = {
  id: string;
};

/**
 * Options for listing product launches.
 */
export type ListLaunchesOptions = {
  limit?: number;
  offset?: number;
  productId?: string;
  status?: string;
  launchDateStart?: string;
  launchDateEnd?: string;
};

/**
 * Options for submitting a product launch for review.
 */
export type SubmitLaunchOptions = {
  launchId: string;
};

/**
 * Options for approving a product launch.
 */
export type ApproveLaunchOptions = {
  launchId: string;
};

/**
 * Options for rejecting a product launch.
 */
export type RejectLaunchOptions = {
  launchId: string;
};