import React from 'react';
import classNames from 'classnames';
import { Flex } from '@infinity/design.layouts.flex';
import { Link } from '@infinity/design.navigation.link';
import { useListProductCategories, type UseListProductCategoriesOptions } from '@infinity/products.hooks.use-product-category';
import type { ProductCategory } from '@infinity/products.entities.product-category';
import styles from './product-category-list.module.scss';

const DEFAULT_BASE_PATH = '/products?category=';
const DEFAULT_LIMIT = 10;

export type ProductCategoryListProps = {
  /**
   * Optional list of product categories to display.
   * If provided, the component will use this data instead of fetching.
   * This is useful for testing or when categories are already available.
   */
  categories?: ProductCategory[];
  /**
   * Maximum number of categories to fetch and display.
   * Defaults to 10.
   */
  limit?: number;
  /**
   * Number of categories to skip before starting to collect the result set (for pagination).
   * Defaults to 0.
   */
  offset?: number;
  /**
   * Base path for the category links. The category ID will be appended to this path.
   * Example: '/browse?category=' will result in links like '/browse?category=cat-id'.
   * Defaults to '/products?category='.
   */
  basePath?: string;
  /**
   * Optional callback function triggered when a category link is clicked.
   * Receives the clicked category object as an argument.
   */
  onCategoryClick?: (category: ProductCategory) => void;
  /**
   * Optional CSS class name to apply to the root element of the component.
   * This allows for custom styling or overrides.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element of the component.
   * Use sparingly; prefer `className` for styling.
   */
  style?: React.CSSProperties;
  /**
   * Custom message or React node to display while categories are loading.
   * Defaults to 'Loading categories...'.
   */
  loadingMessage?: string | React.ReactNode;
   /**
   * Custom message or React node to display if an error occurs during fetching.
   * Defaults to 'Error loading categories.'.
   */
  errorMessage?: string | React.ReactNode;
   /**
   * Custom message or React node to display when no categories are found or available.
   * Defaults to 'No categories found.'.
   */
  noCategoriesMessage?: string | React.ReactNode;
};

/**
 * ProductCategoryList displays a list of product categories as interactive links.
 * It fetches categories using `useListProductCategories` hook or accepts a predefined list.
 * Categories are arranged horizontally using Flexbox and styled for a modern, engaging appearance.
 */
export function ProductCategoryList({
  categories,
  limit = DEFAULT_LIMIT,
  offset = 0,
  basePath = DEFAULT_BASE_PATH,
  onCategoryClick,
  className,
  style,
  loadingMessage = 'Loading categories...',
  errorMessage = 'Error loading categories.',
  noCategoriesMessage = 'No categories found.'
}: ProductCategoryListProps): React.JSX.Element {
  const hookOptions: UseListProductCategoriesOptions = { limit, offset };
  if (categories) {
    hookOptions.mockData = categories;
  }

  const { productCategories: fetchedProductCategories, loading, error } = useListProductCategories(hookOptions);

  // Use provided categories if available, otherwise use fetched ones.
  const currentCategories = categories || fetchedProductCategories;

  if (loading && !categories) {
    return (
      <div className={classNames(styles.messageContainer, styles.loadingMessage, className)} style={style}>
        {loadingMessage}
      </div>
    );
  }

  if (error && !categories) { // Only show error if not using provided categories and an error occurred
    return (
      <div className={classNames(styles.messageContainer, styles.errorMessage, className)} style={style}>
        {errorMessage}
      </div>
    );
  }

  if (!currentCategories || currentCategories.length === 0) {
    return (
      <div className={classNames(styles.messageContainer, styles.noCategoriesMessage, className)} style={style}>
        {noCategoriesMessage}
      </div>
    );
  }

  return (
    <Flex
      as="nav"
      direction="row"
      wrap="wrap"
      gap="var(--spacing-small)" // Slightly reduced gap for better density if many categories
      className={classNames(styles.productCategoryList, className)}
      style={style}
      aria-label="Product categories"
    >
      {currentCategories.map((category) => {
        // Ensure category and its id/name are valid before rendering
        if (!category || typeof category.id !== 'string' || typeof category.name !== 'string') {
          // Optionally log an error or skip rendering this invalid category item
          return null;
        }
        const categoryLink = `${basePath}${category.id}`;
        return (
          <Link
            href={categoryLink}
            key={category.id}
            className={styles.categoryLink}
            onClick={() => { // Use arrow function to ensure `category` is in scope
              if (onCategoryClick) {
                onCategoryClick(category);
              }
            }}
          >
            {category.name}
          </Link>
        );
      })}
    </Flex>
  );
}