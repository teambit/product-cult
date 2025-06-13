/**
 * Defines the options for listing products.
 * Corresponds to the ListProductsOptionsInput in GraphQL schema.
 */
export type ListProductsOptions = {
  /**
   * Optional. The maximum number of products to return.
   */
  limit?: number;
  /**
   * Optional. The number of products to skip before starting to collect the result set.
   */
  offset?: number;
  /**
   * The ID of the category to filter products by.
   */
  categoryId: string;
  /**
   * Optional. A search term to filter products by name or description.
   */
  search?: string;
};