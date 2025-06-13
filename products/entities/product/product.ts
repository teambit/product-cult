import type { PlainProduct } from './plain-product-type.js';
import { ProductVariant } from './product-variant.js';
import type { PlainProductVariant } from './plain-product-variant-type.js';

/**
 * Represents a product entity with details such as name, description, price, images, category, variants, and submitter.
 */
export class Product {
  constructor(
    /**
     * Unique identifier for the product.
     */
    readonly id: string,
    /**
     * Name of the product.
     */
    readonly name: string,
    /**
     * Description of the product.
     */
    readonly description: string,
    /**
     * Price of the product.
     */
    readonly price: number,
    /**
     * Array of image URLs for the product. Defaults to an empty array if not provided.
     */
    readonly imageUrls: string[],
    /**
     * Array of video URLs for the product. Defaults to an empty array if not provided.
     */
    readonly videoUrls: string[],
    /**
     * Identifier of the product's category.
     */
    readonly categoryId: string,
    /**
     * Array of product variants. Defaults to an empty array if not provided.
     */
    readonly variants: ProductVariant[],
    /**
     * Identifier of the user who submitted the product.
     */
    readonly submitterUserId: string
  ) {}

  /**
   * Serializes a Product instance into a plain JavaScript object.
   * @returns {PlainProduct} A plain object representation of the product.
   */
  toObject(): PlainProduct {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      imageUrls: this.imageUrls,
      videoUrls: this.videoUrls,
      categoryId: this.categoryId,
      variants: this.variants.map((variant) => variant.toObject()),
      submitterUserId: this.submitterUserId,
    };
  }

  /**
   * Creates a Product instance from a plain JavaScript object.
   * @param {PlainProduct} plainProduct The plain object to convert.
   * @returns {Product} A new instance of Product.
   */
  static from(plainProduct: PlainProduct): Product {
    const variants = (plainProduct.variants || []).map((plainVariant: PlainProductVariant) =>
      ProductVariant.from(plainVariant)
    );
    return new Product(
      plainProduct.id,
      plainProduct.name,
      plainProduct.description,
      plainProduct.price,
      plainProduct.imageUrls || [],
      plainProduct.videoUrls || [],
      plainProduct.categoryId,
      variants,
      plainProduct.submitterUserId
    );
  }
}