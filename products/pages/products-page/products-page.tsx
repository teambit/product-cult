import React, { ReactNode } from 'react';
import { Spinner } from '@infinity/design.loaders.spinner';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { ProductList } from '@infinity/products.ui.product-list';
import { useListProducts } from '@infinity/products.hooks.use-products';
import { Product } from '@infinity/products.entities.product';
import styles from './products-page.module.scss';

export type ProductsPageProps = {
  /**
   * The title of the page.
   */
  title: string;
  /**
   * The meta description for the page.
   */
  metaDescription: string;
  /**
   * The category ID to filter products by.
   */
  categoryId: string;
  /**
   * Initial list of products to display. If not provided, the component will fetch the products.
   */
  initialProducts?: Product[];
  /**
   * Custom header for the page.
   */
  header?: ReactNode;
  /**
   * Custom footer for the page.
   */
  footer?: ReactNode;
  /**
   * Custom component to render when the product list is empty.
   */
  customEmptyState?: ReactNode;
  /**
   * Custom component to render while the product list is loading.
   */
  customLoadingState?: ReactNode;
};

export function ProductsPage({
  title,
  metaDescription,
  categoryId,
  initialProducts,
  header,
  footer,
  customEmptyState,
  customLoadingState,
}: ProductsPageProps) {
  const { products, loading } = useListProducts();

  if (loading) {
    return (
      <div
        className={styles.loadingContainer}
        role="status"
        aria-live="polite"
      >
        <Spinner size="large" ariaLabel="Loading products..." />
      </div>
    );
  }
  
  return (
    <PageLayout title={title} metaDescription={metaDescription} header={header} footer={footer}>
      <div className={styles.productsPageContainer}>
        <ProductList
          categoryId={categoryId}
          initialProducts={products || initialProducts}
          className={styles.productListSection}
          emptyState={customEmptyState}
          loadingState={customLoadingState}
        />
      </div>
    </PageLayout>
  );
}