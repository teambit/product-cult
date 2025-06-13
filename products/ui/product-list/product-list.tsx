import React from 'react';
import { Flex } from '@infinity/design.layouts.flex';
import { ProductCard } from '@infinity/products.ui.product-card';
import { useListProducts, ListProductsOptions } from '@infinity/products.hooks.use-products';
import type { Product } from '@infinity/products.entities.product';
import styles from './product-list.module.scss';

/**
 * Props for the ProductList component.
 */
export type ProductListProps = {
  /**
   * The ID of the category to filter products by. This is required for fetching products
   * if `initialProducts` is not provided.
   */
  categoryId: string;
  /**
   * An optional array of Product objects. If provided, these products will be displayed directly,
   * and no network request will be made to fetch products. This is useful for displaying
   * pre-loaded data or for testing purposes.
   */
  initialProducts?: Product[];
  /**
   * Optional. The maximum number of products to return per fetch.
   * Defaults to 12.
   */
  limit?: number;
  /**
   * Optional. The number of products to skip before starting to collect the result set.
   * Defaults to 0.
   */
  offset?: number;
  /**
   * Optional. A search term to filter products by name or description.
   */
  search?: string;
  /**
   * Optional custom CSS class name to apply to the root element of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   */
  style?: React.CSSProperties;
  /**
   * Optional React node to display when no products are found or the product list is empty.
   * Defaults to a simple "No products found." message.
   */
  emptyState?: React.ReactNode;
   /**
   * Optional React node to display while products are being loaded.
   * Defaults to a simple "Loading products..." message.
   */
  loadingState?: React.ReactNode;
   /**
   * Optional React node to display if an error occurs while fetching products.
   * Defaults to a simple error message.
   */
  errorState?: React.ReactNode;
};

const DEFAULT_LIMIT = 12;
const DEFAULT_OFFSET = 0;

/**
 * ProductList is a component that displays a list of product cards in a responsive grid layout.
 * It can either display a provided list of products or fetch products based on category,
 * limit, offset, and search criteria using the `useListProducts` hook.
 */
export function ProductList({
  categoryId,
  initialProducts,
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET,
  search,
  className, // This is the prop className
  style,
  emptyState = <p>No products found.</p>,
  loadingState = <p>Loading products...</p>,
  errorState = <p>Error loading products. Please try again later.</p>
}: ProductListProps): React.JSX.Element {
  const listProductsOptions: ListProductsOptions = { categoryId, limit, offset };
  if (search) {
    listProductsOptions.search = search;
  }

  const { products, loading, error } = useListProducts(
    listProductsOptions,
    { mockData: initialProducts }
  );

  const renderContent = () => {
    if (loading) {
      return loadingState;
    }

    if (error) {
      // TODO: Log the actual error object for debugging purposes
      return errorState;
    }

    if (!products || products.length === 0) {
      return emptyState;
    }

    return (
      <Flex
        wrap="wrap"
        gap="var(--spacing-large)"
        justifyContent="center"
        className={styles.productListGrid}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} className={styles.productCardItem} />
        ))}
      </Flex>
    );
  };

  const isStateMessage = loading || error || (!products || products.length === 0);

  let rootClasses = styles.productListContainer;
  if (isStateMessage) {
    rootClasses += ` ${styles.stateContainer}`;
  }
  if (className) { // className from props
    rootClasses += ` ${className}`;
  }

  return (
    <div
      className={rootClasses}
      style={style}
    >
      {renderContent()}
    </div>
  );
}