import { prop, modelOptions, index } from '@typegoose/typegoose';
import { v4 as uuid } from 'uuid';

/**
 * Represents a product category model for persistence.
 */
@modelOptions({ schemaOptions: { collection: 'productcategories', timestamps: true } })
@index({ name: 1 }) // Index for efficient searching by name
@index({ description: 'text' }) // Text index for description
export class ProductCategoryModel {
  /**
   * Unique identifier for the product category (UUID).
   */
  @prop({ unique: true, required: true, type: String, default: () => uuid() })
  public id: string;

  /**
   * Name of the product category.
   */
  @prop({ required: true, type: String })
  public name: string;

  /**
   * A brief description of the product category.
   */
  @prop({ required: true, type: String })
  public description: string;

  /**
   * Optional URL for an image representing the product category.
   */
  @prop({ type: String })
  public imageUrl?: string;
}

/**
 * Mock data for ProductCategoryModel.
 */
export const mockProductCategories: ProductCategoryModel[] = [
  {
    id: 'mock-category-1',
    name: 'Electronics',
    description: 'Gadgets, devices, and accessories for modern living.',
    imageUrl: 'https://images.unsplash.com/photo-1601580740461-604acd551dfe?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw2fHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMEFQSSUyMGludGVncmF0aW9ufGVufDF8MHx8b3JhbmdlfDE3NDk2MDIyMTh8MA&ixlib=rb-4.1.0',
  },
  {
    id: 'mock-category-2',
    name: 'Home Goods',
    description: 'Everything you need to make your house a home.',
    imageUrl: 'https://images.unsplash.com/photo-1613548058193-1cd24c1bebcf?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw3fHxwcm9kdWNlJTIwbWFuYWdlbWVudCUyMEFQSSUyMGludGVncmF0aW9ufGVufDF8MHx8b3JhbmdlfDE3NDk2MDIyMTh8MA&ixlib=rb-4.1.0',
  },
  {
    id: 'mock-category-3',
    name: 'Office Supplies',
    description: 'Tools and equipment for a productive workspace.',
    imageUrl: 'https://images.unsplash.com/photo-1598008059006-eb85defaa105?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw4fHxwcm9kdWN0JTIwbWFuYWdlbWVudCUyMEFQSSUyMGludGVncmF0aW9ufGVufDF8MHx8b3JhbmdlfDE3NDk2MDIyMTh8MA&ixlib=rb-4.1.0',
  },
  {
    id: 'mock-category-4',
    name: 'Outdoor & Recreation',
    description: 'Gear for your next adventure in nature.',
    imageUrl: 'https://images.unsplash.com/photo-1583616690571-cc0fcbccbe03?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw5fHxwcm9kdWNlJTIwbWFuYWdlbWVudCUyMEFQSSUyMGludGVncmF0aW9ufGVufDF8MHx8b3JhbmdlfDE3NDk2MDIyMTh8MA&ixlib=rb-4.1.0',
  },
  {
    id: 'mock-category-5',
    name: 'Food & Beverage',
    description: 'Delicious treats and refreshing drinks for every palate.',
    imageUrl: 'https://images.unsplash.com/photo-1601415808508-1ac0a9b15c9b?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxMHx8cHJvZHVjdCUyMG1hbmFnZW1lbnQlMjBBUEklMjBpbnRlZ3JhdGlvbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NjAyMjE4fDA&ixlib=rb-4.1.0',
  },
];