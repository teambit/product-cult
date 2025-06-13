import { render, screen } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Product } from '@infinity/products.entities.product';
import { ProductCard } from './product-card.js';
import styles from './product-card.module.scss';

const mockProductData = {
  id: 'test-product',
  name: 'Test Product',
  description: 'This is a test product description.',
  price: 99.99,
  imageUrls: ['https://example.com/test-image.jpg'],
  categoryId: 'test-category',
  submitterUserId: 'test-user',
};

const mockProduct = Product.from(mockProductData);

describe('ProductCard', () => {
  it('renders the product name, description, and a "View Details" button', () => {
    const { container } = render(
      <MockProvider>
        <ProductCard product={mockProduct} />
      </MockProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description.')).toBeInTheDocument();
    expect(container.querySelector(`.${styles.description}`)).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('renders the product image if available', () => {
    const { container } = render(
      <MockProvider>
        <ProductCard product={mockProduct} />
      </MockProvider>
    );

    const image = container.querySelector('.cardImage') as HTMLImageElement;
    expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Product');
  });

  it('applies responsive styles', () => {
    const { container } = render(
      <MockProvider>
        <ProductCard product={mockProduct} />
      </MockProvider>
    );
    const card = container.querySelector(`.${styles.productCard}`);
    expect(card).toBeInTheDocument();
  });
});