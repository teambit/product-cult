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

/**
 * Mock data for ProductModel.
 */
export const mockProducts: ProductModel[] = [
  {
    id: '1',
    name: 'Innovative Product A',
    description: 'A revolutionary new gadget that simplifies daily tasks.',
    price: 99.99,
    imageUrls: ['https://images.unsplash.com/photo-1586856634076-7cbf90947176?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMEFQSSUyMGludGVncmF0aW9ufGVufDF8MHx8b3JhbmdlfDE3NDk2MDIyMTh8MA&ixlib=rb-4.1.0'],
    videoUrls: [],
    categoryId: 'mock-category-1',
    variants: [
      { name: 'Standard', sku: 'PA-001-STD', price: 99.99, imageUrls: [] },
      { name: 'Premium', sku: 'PA-001-PRE', price: 129.99, imageUrls: [] },
    ],
    submitterUserId: 'user-1',
  },
  {
    id: '2',
    name: 'Eco-Friendly Water Bottle',
    description: 'Stay hydrated with our sustainable and stylish water bottle.',
    price: 24.99,
    imageUrls: ['https://images.unsplash.com/photo-1707332479861-61d26a7500d0?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMEFQSSUyMGludGVncmF0aW9ufGVufDF8MHx8b3JhbmdlfDE3NDk2MDIyMTh8MA&ixlib=rb-4.1.0'],
    videoUrls: [],
    categoryId: 'mock-category-2',
    variants: [],
    submitterUserId: 'user-2',
  },
  {
    id: '3',
    name: 'Smart Home Hub',
    description: 'Control all your smart devices from one central hub.',
    price: 199.00,
    imageUrls: ['https://images.unsplash.com/photo-1570888897245-44cbc8dc78f5?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMEFQSSUyMGludGVncmF0aW9ufGVufDF8MHx8b3JhbmdlfDE3NDk2MDIyMTh8MA&ixlib=rb-4.1.0'],
    videoUrls: ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
    categoryId: 'mock-category-1',
    variants: [],
    submitterUserId: 'user-1',
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Designed for comfort and support during long work hours.',
    price: 350.00,
    imageUrls: ['https://images.unsplash.com/photo-1564526988962-a45fdac00d80?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMEFQSSUyMGludGUnZWdyYXRpb258ZW53fDF8MHx8b3JhbmdlfDE3NDk2MDIyMTh8MA&ixlib=rb-4.1.0'],
    videoUrls: [],
    categoryId: 'mock-category-3',
    variants: [],
    submitterUserId: 'user-3',
  },
  {
    id: '5',
    name: 'Portable Bluetooth Speaker',
    description: 'High-quality sound on the go, perfect for any adventure.',
    price: 75.50,
    imageUrls: ['https://images.unsplash.com/photo-1605627011528-9e47d55f4973?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw1fHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMEFQSSUyMGludGVncmF0aW9ufGVufDF8MHx8b3JhbmdlfDE3NDk2MDIyMTh8MA&ixlib=rb-4.1.0'],
    videoUrls: [],
    categoryId: 'mock-category-4',
    variants: [],
    submitterUserId: 'user-2',
  },
];
