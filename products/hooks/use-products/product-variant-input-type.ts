/**
 * Represents the plain object structure for a product variant input.
 * This is used when creating or updating products.
 */
export type ProductVariantInput = {
  /**
   * Name of the product variant.
   */
  name: string;
  /**
   * Stock Keeping Unit (SKU) of the product variant.
   */
  sku: string;
  /**
   * Price of the product variant.
   */
  price: number;
  /**
   * Optional. Array of image URLs for the product variant.
   */
  imageUrls?: string[];
};