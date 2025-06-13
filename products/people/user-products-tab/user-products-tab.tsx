import React from 'react';
import classNames from 'classnames';
import { ProductList } from '@infinity/products.ui.product-list';
import { useListProducts, ListProductsOptions } from '@infinity/products.hooks.use-products';
import { Product } from '@infinity/products.entities.product';
import styles from './user-products-tab.module.scss';

// A default category ID. Assumes 'all-products' is a general category,
// and the 'search' parameter will be used to filter by the submitting user.
const DEFAULT_CATEGORY_ID = 'all-products';

/**
 * Props for the UserProductsTab component.
 */
export type UserProductsTabProps = {
  /**
   * The ID of the user whose submitted products are to be displayed.
   * This is used to filter the products.
   */
  userId: string;
  /**
   * Optional limit for the number of products to fetch.
   * If not provided, the hook's default limit (if any) will be used.
   * @default undefined
   */
  limit?: number;
  /**
   * Optional offset for pagination, indicating the number of products to skip.
   * If not provided, the hook's default offset (if any) will be used.
   * @default undefined
   */
  offset?: number;
  /**
   * Custom message or React node to display while the products are loading.
   * If not provided, a default loading message is shown.
   */
  loadingMessage?: React.ReactNode;
  /**
   * Custom message or React node to display if an error occurs during product fetching.
   * If not provided, a default error message including error details is shown.
   */
  errorMessage?: React.ReactNode;
  /**
   * Custom message or React node to display when the user has not submitted any products.
   * This is passed to the underlying ProductList component's emptyState prop.
   * If not provided, ProductList will use its default empty state.
   */
  customProductListEmptyState?: React.ReactNode;
  /**
   * Optional CSS class name to apply to the root container of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root container of the component.
   */
  style?: React.CSSProperties;
  /**
   * Optional mock data for products.
   * If provided, the useListProducts hook will use this data instead of fetching from the server.
   * This is primarily intended for testing or development scenarios.
   */
  mockProducts?: Product[];
};

const DefaultLoadingMessage = <p className={styles.defaultMessage}>Loading submitted products...</p>;

/**
 * UserProductsTab is a component designed to display a list of products
 * submitted by a specific user. It fetches this data using the `useListProducts`
 * hook and renders it through the `ProductList` component. The component
 * gracefully handles loading, error, and empty states.
 */
export function UserProductsTab({
  userId,
  limit,
  offset,
  loadingMessage = DefaultLoadingMessage,
  errorMessage,
  customProductListEmptyState,
  className,
  style,
  mockProducts,
}: UserProductsTabProps): React.JSX.Element {
  const listProductVariables: ListProductsOptions = {
    categoryId: DEFAULT_CATEGORY_ID,
    // Assuming the backend search functionality supports filtering by submitterUserId.
    // The format 'field:value' is a common convention.
    search: `submitterUserId:${userId}`,
  };

  if (limit !== undefined) {
    listProductVariables.limit = limit;
  }
  if (offset !== undefined) {
    listProductVariables.offset = offset;
  }

  const {
    products,
    loading,
    error,
  } = useListProducts(
    listProductVariables,
    { mockData: mockProducts }
  );

  if (loading) {
    return <div className={styles.stateContainer}>{loadingMessage}</div>;
  }

  if (error) {
    const finalErrorMessage = errorMessage !== undefined ? errorMessage : (
      <p className={styles.defaultMessage}>
        Failed to load products: {error.message || 'An unknown error occurred.'}
      </p>
    );
    return <div className={styles.stateContainer}>{finalErrorMessage}</div>;
  }

  // products from the hook can be Product[] or undefined. Default to an empty array for ProductList.
  const productListItems = products || [];

  return (
    <div className={classNames(styles.userProductsTabContainer, className)} style={style}>
      <ProductList
        categoryId={DEFAULT_CATEGORY_ID} // This categoryId is for ProductList context; fetching is bypassed by initialProducts.
        initialProducts={productListItems}
        emptyState={customProductListEmptyState}
        // limit and offset for ProductList are not set here as data fetching and pagination control
        // are handled by useListProducts within UserProductsTab. ProductList displays the provided initialProducts.
      />
    </div>
  );
}