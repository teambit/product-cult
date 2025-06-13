/**
 * Defines the input options for fetching a single product category.
 * Corresponds to the GetProductCategoryOptionsInput in the GraphQL schema.
 */
export type GetProductCategoryOptionsInput = {
  /**
   * The unique identifier of the product category to retrieve.
   */
  id: string;
};