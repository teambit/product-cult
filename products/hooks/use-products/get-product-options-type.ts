/**
 * Defines the options for retrieving a single product.
 * Corresponds to the GetProductOptionsInput in GraphQL schema.
 */
export type GetProductOptions = {
  /**
   * The unique identifier of the product to retrieve.
   */
  id: string;
};