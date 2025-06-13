import type { ProductVariantInput } from './product-variant-input-type.js';

/**
 * Defines the options for creating a new product.
 * Corresponds to the CreateProductOptionsInput in GraphQL schema.
 */
export type CreateProductOptions = {
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Description of the product.
   */
  description: string;
  /**
   * Price of the product.
   */
  price: number;
  /**
   * Optional. Array of image URLs for the product.
   */
  imageUrls?: string[];
  /**
   * Optional. Array of video URLs for the product.
   */
  videoUrls?: string[];
  /**
   * Identifier of the product's category.
   */
  categoryId: string;
  /**
   * Optional. Array of product variants.
   */
  variants?: ProductVariantInput[];
};