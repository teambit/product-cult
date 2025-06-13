import { ProductCategory } from './product-category.js';
import { mockProductCategory } from './product-category.mock.js';

describe('ProductCategory', () => {
  it('should create a ProductCategory instance from a plain object', () => {
    const mock = mockProductCategory();
    const productCategory = ProductCategory.from(mock.toObject());
    expect(productCategory).toBeInstanceOf(ProductCategory);
    expect(productCategory.id).toBe(mock.id);
    expect(productCategory.name).toBe(mock.name);
  });

  it('should serialize a ProductCategory instance into a plain object', () => {
    const mock = mockProductCategory();
    const plainObject = mock.toObject();
    expect(plainObject).toEqual({
      id: mock.id,
      name: mock.name,
      description: mock.description,
      imageUrl: mock.imageUrl,
    });
  });

  it('has a ProductCategory.from() method', () => {
    expect(ProductCategory.from).toBeTruthy();
  });
});