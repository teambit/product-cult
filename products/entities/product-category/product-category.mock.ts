import { ProductCategory } from './product-category.js';
import type { PlainProductCategory } from './plain-product-category-type.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Provides a single mock ProductCategory instance.
 * Allows overriding properties with the provided partial data.
 * This is useful for testing or development scenarios where a specific category setup is needed.
 * @param overrides - Partial PlainProductCategory data to override default mock values.
 * @returns A mock ProductCategory instance.
 */
export function mockProductCategory(
  overrides?: Partial<PlainProductCategory>
): ProductCategory {
  const defaultCategory: PlainProductCategory = {
    id: uuidv4(),
    name: 'Featured Category',
    description: 'A curated selection of top products from various domains.',
    imageUrl: 'https://example.com/images/featured-category.jpg',
  };
  return ProductCategory.from({ ...defaultCategory, ...overrides });
}

/**
 * Provides an array of mock ProductCategory instances.
 * This function returns a predefined list of product categories for general testing and development.
 * @returns An array of mock ProductCategory instances.
 */
export function mockProductCategories(): ProductCategory[] {
  return [
    ProductCategory.from({
      id: uuidv4(),
      name: 'Tech Gadgets',
      description: 'Latest and greatest in technology, from smartphones to smart home devices.',
      imageUrl: 'https://example.com/images/tech-gadgets.png',
    }),
    ProductCategory.from({
      id: uuidv4(),
      name: 'Books & Literature',
      description: 'Explore a vast collection of books, e-books, and audiobooks across all genres.',
      // imageUrl is optional, so not provided here for variety.
    }),
    ProductCategory.from({
      id: uuidv4(),
      name: 'Fashion & Style',
      description: 'Trendy clothing, footwear, and accessories for men, women, and children.',
      imageUrl: 'https://example.com/images/fashion-style.png',
    }),
    ProductCategory.from({
      id: uuidv4(),
      name: 'Home & Living',
      description: 'Everything you need to make your house a home, from furniture to decor.',
      imageUrl: 'https://example.com/images/home-living.png',
    }),
  ];
}