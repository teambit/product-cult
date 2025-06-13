import { prop } from '@typegoose/typegoose';

/**
 * Represents a product variant with specific attributes like name, SKU, price, and images.
 */
export class ProductVariantModel {
  /**
   * Name of the product variant.
   */
  @prop({ required: true, type: String })
  public name: string;

  /**
   * Stock Keeping Unit (SKU) of the product variant.
   */
  @prop({ required: true, type: String })
  public sku: string;

  /**
   * Price of the product variant.
   */
  @prop({ required: true, type: Number })
  public price: number;

  /**
   * Optional. Array of image URLs for the product variant.
   */
  @prop({ type: [String] })
  public imageUrls?: string[];
}