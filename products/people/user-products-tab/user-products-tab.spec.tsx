import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserProductsTab } from './user-products-tab.js';
import { Product, PlainProduct } from '@infinity/products.entities.product';
import styles from './user-products-tab.module.scss';

const mockPlainProducts: PlainProduct[] = [
  {
    id: 'prod-1',
    name: 'Test Product 1',
    description: 'Test Description 1',
    price: 10,
    imageUrls: [],
    categoryId: 'test',
    submitterUserId: 'user-1',
  },
  {
    id: 'prod-2',
    name: 'Test Product 2',
    description: 'Test Description 2',
    price: 20,
    imageUrls: [],
    categoryId: 'test',
    submitterUserId: 'user-2',
  },
];

const mockProducts: Product[] = mockPlainProducts.map(p => Product.from(p));

describe('UserProductsTab', () => {
  it('should render the provided loading message when in loading state', () => {
    // To simulate loading, do not pass mockProducts.
    // The useListProducts hook inside UserProductsTab will then be in a loading state initially,
    // assuming MockProvider's Apollo MockedProvider doesn't have a specific mock for this query.
    const customLoadingMessage = 'Custom Loading...';
    render(
      <MockProvider>
        <UserProductsTab userId="user-loading-test" loadingMessage={<p>{customLoadingMessage}</p>} />
      </MockProvider>
    );
    // Check if the custom loading message is rendered.
    // The loadingMessage is rendered inside a div with class styles.stateContainer.
    const stateContainer = screen.getByText(customLoadingMessage).closest(`.${styles.stateContainer}`);
    expect(stateContainer).toBeInTheDocument();
    expect(screen.getByText(customLoadingMessage)).toBeInTheDocument();
  });

  it('should render the product list when products are loaded', () => {
    render(
      <MockProvider>
        <UserProductsTab userId="user-1" mockProducts={mockProducts.filter(p => p.submitterUserId === 'user-1')} />
      </MockProvider>
    );
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
  });

  it('should render custom empty state when no products are available', () => {
    const emptyMessage = "No products found for this user.";
    render(
      <MockProvider>
        <UserProductsTab
          userId="user-3"
          mockProducts={[]} // This makes loading: false, products: []
          customProductListEmptyState={<p>{emptyMessage}</p>}
        />
      </MockProvider>
    );
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
  });
});