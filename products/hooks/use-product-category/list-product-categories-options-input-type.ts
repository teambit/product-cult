/**
 * Defines the input options for listing product categories.
 * Corresponds to the ListProductCategoriesOptionsInput in the GraphQL schema.
 */
export type ListProductCategoriesOptionsInput = {
  /**
   * The maximum number of product categories to return.
   */
  limit?: number;
  /**
   * The number of product categories to skip before starting to collect the result set.
   */
  offset?: number;
};