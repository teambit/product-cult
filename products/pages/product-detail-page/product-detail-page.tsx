import React from 'react';
import classNames from 'classnames';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Image } from '@infinity/design.content.image';
import { Button } from '@infinity/design.actions.button';
import { useGetProduct } from '@infinity/products.hooks.use-products';
import { ProductPageTab } from './product-page-tab.js';
import type { Product } from '@infinity/products.entities.product';
import styles from './product-detail-page.module.scss';

/**
 * Props for the ProductDetailPage component.
 */
export type ProductDetailPageProps = {
  /**
   * The ID of the product to display.
   */
  productId: string;
  /**
   * Optional mock product data for testing or development.
   * If provided, the hook will use this data instead of fetching.
   */
  mockProductData?: Product;

  /**
   * tabs
   */
  tabs?: ProductPageTab[];

  /**
   * Optional class name for custom styling of the page wrapper.
   */
  className?: string;
  /**
   * Optional style object for custom styling of the page wrapper.
   */
  style?: React.CSSProperties;
};

const DEFAULT_PLACEHOLDER_IMAGE_URL = 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60';

/**
 * ProductDetailPage displays detailed information about a specific product.
 * It fetches product data using its ID and shows its image, name, description, price,
 * and an option to add it to the cart.
 */
export function ProductDetailPage({
  productId,
  tabs,
  mockProductData,
  className,
  style, // This style prop is part of ProductDetailPageProps but won't be passed to PageLayout
}: ProductDetailPageProps): React.JSX.Element {
  const { product, loading, error } = useGetProduct(
    { id: productId },
    { mockData: mockProductData }
  );

  const handleAddToCart = () => {
    if (product) {
      // eslint-disable-next-line no-alert
      alert(
        `Product "${product.name}" added to cart! (This is a placeholder action)`
      );
    }
  };

  const pageTitle = product
    ? `${product.name} - Product Hunt Platform`
    : 'Product Details - Product Hunt Platform';
  const mainImageUrl = product?.imageUrls?.[0] || DEFAULT_PLACEHOLDER_IMAGE_URL;

  if (loading) {
    return (
      <PageLayout
        title="Loading..."
        className={classNames(styles.productDetailPageWrapper, className)}
        // style prop removed here
      >
        <div className={styles.loadingState}>
          <Paragraph>Loading product details...</Paragraph>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout
        title="Error"
        className={classNames(styles.productDetailPageWrapper, className)}
        // style prop removed here
      >
        <div className={styles.errorState}>
          <Paragraph>
            Could not load product. Error: {error.message}
          </Paragraph>
        </div>
      </PageLayout>
    );
  }

  if (!product) {
    return (
      <PageLayout
        title="Not Found"
        className={classNames(styles.productDetailPageWrapper, className)}
        // style prop removed here
      >
        <div className={styles.notFoundState}>
          <Paragraph>Product not found.</Paragraph>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={pageTitle}
      className={classNames(styles.productDetailPageWrapper, className)}
      // style prop removed here
    >
      <div className={styles.productDetailContent}>
        <div className={styles.gallery}>
          <Image
            src={mainImageUrl}
            alt={product.name}
            className={styles.productImage}
          />
        </div>
        <div className={styles.details}>
          <Heading level={1} className={styles.productName}>
            {product.name}
          </Heading>
          <Paragraph className={styles.productDescription}>
            {product.description}
          </Paragraph>
          <div className={styles.actionsContainer}>
          </div>
        </div>
      </div>
      {tabs?.map((tab) => {
        const Component = tab.component;
        if (!Component) return null;
        return <Component productId={productId} />;
      })}
    </PageLayout>
  );
}