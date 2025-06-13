/**
 * Defines the plain object structure for a product category.
 * This type is used for serialization and deserialization purposes.
 */
export type PlainProductCategory = {
  /**
   * Unique identifier for the product category.
   * This ID should be a string, typically a UUID.
   */
  readonly id: string;

  /**
   * Name of the product category.
   * Example: 'Electronics', 'Books'.
   */
  readonly name: string;

  /**
   * A brief description of the product category.
   * This provides more context about the types of products within this category.
   */
  readonly description: string;

  /**
   * Optional URL for an image representing the product category.
   * This image can be used for display purposes in UIs.
   */
  readonly imageUrl?: string;
};