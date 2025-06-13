import { render } from '@testing-library/react';
import { ProductList } from './product-list.js';
import { mockProducts } from '@infinity/products.entities.product';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import styles from './product-list.module.scss';

describe('ProductList', () => {
  it('renders a list of product cards when initialProducts are provided', () => {
    const initialProducts = mockProducts().slice(0, 2);
    const { container } = render(
      <MockProvider>
        <ProductList initialProducts={initialProducts} categoryId="test" />
      </MockProvider>
    );
    const productCardItems = container.querySelectorAll(`.${styles.productCardItem}`);
    expect(productCardItems.length).toBe(2);
  });

  it('renders the empty state when no products are found', () => {
    const emptyStateMessage = 'No products available.';
    const { container } = render(
      <MockProvider>
        <ProductList initialProducts={[]} categoryId="test" emptyState={<p>{emptyStateMessage}</p>} />
      </MockProvider>
    );
    const emptyStateElement = container.querySelector(`.${styles.stateContainer}`);
    expect(emptyStateElement).toBeInTheDocument();
    expect(emptyStateElement?.textContent).toBe(emptyStateMessage);
  });

  it('renders the loading state when loading', () => {
    const loadingStateMessage = 'Loading...';
    const { container } = render(
      <MockProvider>
        <ProductList categoryId="test" loadingState={<p>{loadingStateMessage}</p>} />
      </MockProvider>
    );
    const loadingStateElement = container.querySelector(`.${styles.stateContainer}`);
    expect(loadingStateElement).toBeInTheDocument();
    expect(loadingStateElement?.textContent).toBe(loadingStateMessage);
  });
});