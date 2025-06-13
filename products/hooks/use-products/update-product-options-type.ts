import type { ProductVariantInput } from './product-variant-input-type.js';

/**
 * Defines the options for updating an existing product.
 * Corresponds to the UpdateProductOptionsInput in GraphQL schema.
 */
export type UpdateProductOptions = {
  /**
   * The unique identifier of the product to update.
   */
  id: string;
  /**
   * Optional. New name of the product.
   */
  name?: string;
  /**
   * Optional. New description of the product.
   */
  description?: string;
  /**
   * Optional. New price of the product.
   */
  price?: number;
  /**
   * Optional. New array of image URLs for the product.
   */
  imageUrls?: string[];
  /**
   * Optional. New array of video URLs for the product.
   */
  videoUrls?: string[];
  /**
   * Optional. New identifier of the product's category.
   */
  categoryId?: string;
  /**
   * Optional. New array of product variants.
   */
  variants?: ProductVariantInput[];
};
