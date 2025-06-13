/**
 * Represents a user in the system for authorization checks.
 * This structure should align with the User entity provided by the authentication/identity platform.
 */
export type User = {
  /**
   * The unique identifier for the user, often the primary key or subject ID.
   */
  id: string;
  /**
   * The user's specific ID within the application or system, if different from `id`.
   */
  userId: string;
  /**
   * The user's email address.
   */
  email: string;
  /**
   * The user's chosen username or display name.
   */
  username: string;
  /**
   * Optional array of roles assigned to the user (e.g., 'admin', 'moderator').
   */
  roles?: string[];
  /**
   * A method to get the plain object representation of the user.
   * The actual return type would be PlainUser or a similar serializable object.
   */
  toObject: () => any; 
};

/**
 * Options for creating a new forum.
 */
export type CreateForumOptions = {
  /**
   * The name of the forum.
   */
  name: string;
  /**
   * A description for the forum.
   */
  description: string;
  /**
   * Optional URL for an image representing the forum.
   */
  imageUrl?: string;
};

/**
 * Options for retrieving a specific forum by ID.
 */
export type GetForumOptions = {
  /**
   * The unique identifier of the forum.
   */
  id: string;
};

/**
 * Options for updating an existing forum.
 */
export type UpdateForumOptions = {
  /**
   * The unique identifier of the forum to update.
   */
  id: string;
  /**
   * Optional new name for the forum.
   */
  name?: string;
  /**
   * Optional new description for the forum.
   */
  description?: string;
  /**
   * Optional new image URL for the forum.
   */
  imageUrl?: string;
};

/**
 * Options for deleting a forum by ID.
 */
export type DeleteForumOptions = {
  /**
   * The unique identifier of the forum to delete.
   */
  id: string;
};

/**
 * Options for listing forums with pagination and search.
 */
export type ListForumsOptions = {
  /**
   * Number of forums to skip for pagination.
   */
  offset?: number;
  /**
   * Maximum number of forums to return.
   */
  limit?: number;
  /**
   * A search term to filter forums by name or description.
   */
  search?: string;
};

/**
 * Options for searching forums based on a query.
 */
export type SearchForumsOptions = {
  /**
   * The query string to search for.
   */
  query: string;
  /**
   * Maximum number of results to return.
   */
  limit?: number;
  /**
   * Number of results to skip for pagination.
   */
  offset?: number;
};

/**
 * Options for creating a new topic.
 */
export type CreateTopicOptions = {
  /**
   * The unique identifier of the forum the topic belongs to.
   */
  forumId: string;
  /**
   * The title of the topic.
   */
  title: string;
  /**
   * The main content of the topic.
   */
  content: string;
};

/**
 * Options for retrieving a specific topic by ID.
 */
export type GetTopicOptions = {
  /**
   * The unique identifier of the topic.
   */
  id: string;
};

/**
 * Options for updating an existing topic.
 */
export type UpdateTopicOptions = {
  /**
   * The unique identifier of the topic to update.
   */
  id: string;
  /**
   * Optional new title for the topic.
   */
  title?: string;
  /**
   * Optional new content for the topic.
   */
  content?: string;
};

/**
 * Options for deleting a topic by ID.
 */
export type DeleteTopicOptions = {
  /**
   * The unique identifier of the topic to delete.
   */
  id: string;
};

/**
 * Options for listing topics within a specific forum with pagination.
 */
export type ListTopicsOptions = {
  /**
   * The unique identifier of the forum to list topics from.
   */
  forumId: string;
  /**
   * Number of topics to skip for pagination.
   */
  offset?: number;
  /**
   * Maximum number of topics to return.
   */
  limit?: number;
};

/**
 * Options for creating a new post.
 */
export type CreatePostOptions = {
  /**
   * The unique identifier of the topic the post belongs to.
   */
  topicId: string;
  /**
   * The content of the post.
   */
  content: string;
};

/**
 * Options for retrieving a specific post by ID.
 */
export type GetPostOptions = {
  /**
   * The unique identifier of the post.
   */
  id: string;
};

/**
 * Options for updating an existing post.
 */
export type UpdatePostOptions = {
  /**
   * The unique identifier of the post to update.
   */
  id: string;
  /**
   * Optional new content for the post.
   */
  content?: string;
};

/**
 * Options for deleting a post by ID.
 */
export type DeletePostOptions = {
  /**
   * The unique identifier of the post to delete.
   */
  id: string;
};

/**
 * Options for listing posts within a specific topic with pagination.
 */
export type ListPostsOptions = {
  /**
   * The unique identifier of the topic to list posts from.
   */
  topicId: string;
  /**
   * Number of posts to skip for pagination.
   */
  offset?: number;
  /**
   * Maximum number of posts to return.
   */
  limit?: number;
};