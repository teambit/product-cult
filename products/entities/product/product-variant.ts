import type { PlainProductVariant } from './plain-product-variant-type.js';

/**
 * Represents a product variant with specific attributes like name, SKU, price, and images.
 */
export class ProductVariant {
  constructor(
    /**
     * Name of the product variant.
     */
    readonly name: string,
    /**
     * Stock Keeping Unit (SKU) of the product variant.
     */
    readonly sku: string,
    /**
     * Price of the product variant.
     */
    readonly price: number,
    /**
     * Array of image URLs for the product variant. Defaults to an empty array if not provided.
     */
    readonly imageUrls: string[]
  ) {}

  /**
   * Serializes a ProductVariant instance into a plain JavaScript object.
   * @returns {PlainProductVariant} A plain object representation of the product variant.
   */
  toObject(): PlainProductVariant {
    return {
      name: this.name,
      sku: this.sku,
      price: this.price,
      imageUrls: this.imageUrls,
    };
  }

  /**
   * Creates a ProductVariant instance from a plain JavaScript object.
   * @param {PlainProductVariant} plainVariant The plain object to convert.
   * @returns {ProductVariant} A new instance of ProductVariant.
   */
  static from(plainVariant: PlainProductVariant): ProductVariant {
    return new ProductVariant(
      plainVariant.name,
      plainVariant.sku,
      plainVariant.price,
      plainVariant.imageUrls || []
    );
  }
}