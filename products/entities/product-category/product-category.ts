import type { PlainProductCategory } from './plain-product-category-type.js';

/**
 * Represents a product category within the platform.
 * Product categories help organize products and make them discoverable.
 */
export class ProductCategory {
  /**
   * Constructs an instance of ProductCategory.
   * @param id - Unique identifier for the product category.
   * @param name - Name of the product category.
   * @param description - A brief description of the product category.
   * @param imageUrl - Optional URL for an image representing the product category.
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly imageUrl?: string
  ) {}

  /**
   * Serializes the ProductCategory instance into a plain JavaScript object.
   * This is useful for transferring data or storing it.
   * @returns A plain object representation of the product category, conforming to PlainProductCategory.
   */
  toObject(): PlainProductCategory {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
    };
  }

  /**
   * Creates a ProductCategory instance from a plain JavaScript object.
   * The plain object must conform to the PlainProductCategory type, including a mandatory 'id'.
   * This is useful for reconstructing a ProductCategory object from stored or transferred data.
   * @param plainCategory - The plain object data to create the ProductCategory from.
   * @returns An instance of ProductCategory.
   */
  static from(plainCategory: PlainProductCategory): ProductCategory {
    return new ProductCategory(
      plainCategory.id,
      plainCategory.name,
      plainCategory.description,
      plainCategory.imageUrl
    );
  }
}