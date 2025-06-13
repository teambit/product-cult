import { describe, it, expect } from 'vitest';
import { Product } from './product.js';
import { ProductVariant } from './product-variant.js';

describe('Product', () => {
  it('should create a Product instance from a plain object', () => {
    const plainProduct = {
      id: '123',
      name: 'Test Product',
      description: 'A test product',
      price: 20,
      imageUrls: [],
      videoUrls: [],
      categoryId: '456',
      variants: [],
      submitterUserId: '789',
    };

    const product = Product.from(plainProduct);

    expect(product).toBeInstanceOf(Product);
    expect(product.name).toBe('Test Product');
  });

  it('should serialize a Product instance to a plain object', () => {
    const product = new Product(
      '123',
      'Test Product',
      'A test product',
      20,
      [],
      [],
      '456',
      [],
      '789'
    );

    const plainProduct = product.toObject();

    expect(plainProduct).toEqual({
      id: '123',
      name: 'Test Product',
      description: 'A test product',
      price: 20,
      imageUrls: [],
      videoUrls: [],
      categoryId: '456',
      variants: [],
      submitterUserId: '789',
    });
  });

  it('should handle product variants when creating a Product instance', () => {
    const plainProduct = {
      id: '123',
      name: 'Test Product',
      description: 'A test product',
      price: 20,
      imageUrls: [],
      videoUrls: [],
      categoryId: '456',
      variants: [{ name: 'Variant 1', sku: 'SKU1', price: 10, imageUrls: [] }],
      submitterUserId: '789',
    };

    const product = Product.from(plainProduct);

    expect(product.variants.length).toBe(1);
    expect(product.variants[0]).toBeInstanceOf(ProductVariant);
    expect(product.variants[0].name).toBe('Variant 1');
  });
});