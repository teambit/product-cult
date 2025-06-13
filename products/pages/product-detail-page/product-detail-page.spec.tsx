import React from 'react';
import { render, screen } from '@testing-library/react';
import { Product, PlainProduct } from '@infinity/products.entities.product';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductDetailPage } from './product-detail-page.js';
import styles from './product-detail-page.module.scss';

const mockPlainProduct: PlainProduct = {
  id: 'prod-123',
  name: 'Test Product',
  description: 'A test product description.',
  price: 99.99,
  imageUrls: ['https://example.com/image.jpg'],
  videoUrls: [],
  categoryId: 'test-category',
  submitterUserId: 'user-123',
  variants: [],
};
const mockProduct = Product.from(mockPlainProduct);

describe('ProductDetailPage', () => {
  it('should render product details when product is found', () => {
    const { container } = render(
      <MockProvider>
        <ProductDetailPage productId="prod-123" mockProductData={mockProduct} />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.productName}`)).toHaveTextContent('Test Product');
    expect(container.querySelector(`.${styles.productDescription}`)).toHaveTextContent('A test product description.');
  });


  it('should render "Loading product details..." when loading is true', () => {
    const { container } = render(
      <MockProvider>
        <ProductDetailPage productId="loading-id" mockProductData={undefined} />
      </MockProvider>
    );
    expect(container.querySelector(`.${styles.loadingState}`)).toHaveTextContent('Loading product details...');
  });
});
