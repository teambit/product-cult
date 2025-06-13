import React from 'react';
import classNames from 'classnames';
import { ProductList } from '@infinity/products.ui.product-list';
import { useListProducts, type ListProductsOptions } from '@infinity/products.hooks.use-products';
import type { Product } from '@infinity/products.entities.product';
import styles from './featured-products.module.scss';

const DEFAULT_TITLE = 'Featured Products';
const DEFAULT_LIMIT = 4;

/**
 * A default component to display while products are loading.
 */
const DefaultLoadingState = () => <p className={styles.defaultStateMessage}>Loading featured products...</p>;

/**
 * A default component to display when no products are found.
 */
const DefaultEmptyState = () => <p className={styles.defaultStateMessage}>No featured products available right now.</p>;

/**
 * A default component to display when an error occurs.
 */
const DefaultErrorState = () => <p className={styles.defaultStateMessage}>Could not load featured products. Please try again later.</p>;

/**
 * Props for the FeaturedProducts component.
 */
export type FeaturedProductsProps = {
  /**
   * Title for the featured products section.
   * @default 'Featured Products'
   */
  title?: string;

  /**
   * The ID of the category to fetch featured products from.
   * This is crucial for determining which products are considered "featured".
   */
  categoryId: string;

  /**
   * The maximum number of featured products to display.
   * @default 4
   */
  limit?: number;

  /**
   * Optional custom React node to display when no featured products are found.
   * If not provided, a default message will be shown.
   */
  emptyState?: React.ReactNode;

  /**
   * Optional custom React node to display while featured products are loading.
   * If not provided, a default message will be shown.
   */
  loadingState?: React.ReactNode;

  /**
   * Optional custom React node to display if an error occurs while fetching featured products.
   * If not provided, a default message will be shown.
   */
  errorState?: React.ReactNode;

  /**
   * Optional CSS class name to apply to the root element of the component.
   */
  className?: string;

  /**
   * Optional inline styles to apply to the root element of the component.
   */
  style?: React.CSSProperties;
};

/**
 * FeaturedProducts is a homepage section component that displays a list of featured products
 * fetched based on a category ID. It utilizes the ProductList component for rendering.
 */
export function FeaturedProducts({
  title = DEFAULT_TITLE,
  categoryId,
  limit = DEFAULT_LIMIT,
  emptyState,
  loadingState,
  errorState,
  className,
  style,
}: FeaturedProductsProps): React.JSX.Element {
  const listProductOptions: ListProductsOptions = {
    categoryId,
    limit,
  };

  const { products, loading, error } = useListProducts(listProductOptions);

  const resolvedLoadingState = loadingState ?? <DefaultLoadingState />;
  const resolvedEmptyState = emptyState ?? <DefaultEmptyState />;
  const resolvedErrorState = errorState ?? <DefaultErrorState />;

  const sectionBaseClassName = classNames(styles.featuredProductsSection, className);

  if (loading) {
    return (
      <section className={classNames(sectionBaseClassName, styles.stateContainer)} style={style}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {resolvedLoadingState}
      </section>
    );
  }

  if (error) {
    return (
      <section className={classNames(sectionBaseClassName, styles.stateContainer)} style={style}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {resolvedErrorState}
      </section>
    );
  }

  return (
    <section className={sectionBaseClassName} style={style}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <ProductList
        categoryId={categoryId} // Pass categoryId for context, ProductList uses it if initialProducts is not set or for other internal logic.
        initialProducts={products ?? []} // Provide fetched products, or an empty array if undefined.
        limit={limit}
        emptyState={resolvedEmptyState} // ProductList will display this if initialProducts is empty.
        // loadingState and errorState are handled by FeaturedProducts directly before rendering ProductList.
      />
    </section>
  );
}