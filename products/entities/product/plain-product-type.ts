import type { PlainProductVariant } from './plain-product-variant-type.js';

/**
 * Represents the plain object structure for a product.
 */
export type PlainProduct = {
  /**
   * Unique identifier for the product.
   */
  id: string;

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
  variants?: PlainProductVariant[];

  /**
   * Identifier of the user who submitted the product.
   */
  submitterUserId: string;
};