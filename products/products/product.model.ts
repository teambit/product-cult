import { prop, modelOptions, index } from '@typegoose/typegoose';
import { ProductVariantModel } from './product-variant.model.js';
import { v4 as uuid } from 'uuid';

/**
 * Represents a product model for persistence.
 */
@modelOptions({ schemaOptions: { collection: 'products', timestamps: true } })
@index({ name: 1 }) // Index for efficient searching by name
@index({ description: 'text' }) // Text index for description
export class ProductModel {
  /**
   * Unique identifier for the product (UUID).
   */
  @prop({ unique: true, required: true, type: String, default: () => uuid() })
  public id: string;

  /**
   * Name of the product.
   */
  @prop({ required: true, type: String })
  public name: string;

  /**
   * Description of the product.
   */
  @prop({ required: true, type: String })
  public description: string;

  /**
   * Price of the product.
   */
  @prop({ required: true, type: Number })
  public price: number;

  /**
   * Optional. Array of image URLs for the product.
   */
  @prop({ type: [String] })
  public imageUrls?: string[];

  /**
   * Optional. Array of video URLs for the product.
   */
  @prop({ type: [String] })
  public videoUrls?: string[];

  /**
   * Identifier of the product's category.
   */
  @prop({ required: true, type: String })
  public categoryId: string;

  /**
   * Optional. Array of product variants.
   */
  @prop({ type: [ProductVariantModel], default: [] })
  public variants?: ProductVariantModel[];

  /**
   * Identifier of the user who submitted the product.
   */
  @prop({ required: true, type: String })
  public submitterUserId: string;
}

export const mockProducts: ProductModel[] = [
  {
    id: '1',
    name: 'Infinity VR',
    description: 'A revolutionary new gadget that simplifies daily tasks.',
    price: 99.99,
    imageUrls: ['https://storage.googleapis.com/static.bit.dev/product-cult/Product%20-%20Infinity%20VR.jpeg'],
    videoUrls: [],
    categoryId: 'reality-bending-tech',
    variants: [
      { name: 'Standard', sku: 'PA-001-STD', price: 99.99, imageUrls: [] },
      { name: 'Premium', sku: 'PA-001-PRE', price: 129.99, imageUrls: [] },
    ],
    submitterUserId: '4',
  },
  {
    id: '3',
    name: 'Bit Cloud: AI native development platform',
    description: 'The cloud platform for composing and managing AI-powered applications',
    price: 199.00,
    imageUrls: ['https://static.bit.dev/blog/og-images/bit-cloud-platform-alt2.png', 'https://storage.googleapis.com/static.bit.dev/product-cult/Product%20%20-%20bit%20cloud.jpeg'],
    videoUrls: ['https://www.youtube.com/watch?v=LG-de0MnG0Y&ab_channel=BitCloud'],
    categoryId: 'top-picks',
    variants: [],
    submitterUserId: '8',
  },
  {
    id: '4',
    name: 'MongoDB Atlas: Scalable Cloud DB',
    description: 'A fully managed cloud-hosted MongoDB designed for modern applications.',
    price: 350.00,
    imageUrls: ['https://storage.googleapis.com/static.bit.dev/product-cult/Atlas%20(mongo-db).jpeg'],
    videoUrls: [],
    categoryId: 'top-picks',
    variants: [],
    submitterUserId: '5',
  },
  {
    id: '5',
    name: 'SpaceX Dragon Spaceship',
    description: 'The first private spacecraft to take astronauts to the ISS.',
    price: 75.50,
    imageUrls: ['https://storage.googleapis.com/static.bit.dev/product-cult/Product%20-%20SpaceX%20Dragon%20Spaceship.jpeg'],
    videoUrls: [],
    categoryId: 'top-picks',
    variants: [],
    submitterUserId: '6',
  },
  {
    id: '6',
    name: 'Bit: Compose components with AI',
    description: 'AI-powered development workspaces for composing components with local AI agents.',
    price: 0,
    imageUrls: ['https://static.bit.dev/blog/og-images/bit-cloud-platform.png'],
    videoUrls: [],
    categoryId: 'ai-driven-platforms',
    variants: [],
    submitterUserId: '8',
  },
    {
    id: '7',
    name: 'Harmony: Build without glue code',
    description: 'Minimalistic open-source library for composing highly performant and consistent platforms from independent business features.',
    price: 0,
    imageUrls: ['https://storage.googleapis.com/static.bit.dev/product-cult/Product-%20Harmony%20(ilu).jpeg'],
    videoUrls: [],
    categoryId: 'developer-ecosystem',
    variants: [],
    submitterUserId: '8',
  }
];
