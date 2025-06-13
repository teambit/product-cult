import React from 'react';
import { Product } from '@infinity/products.entities.product';
import { Card } from '@infinity/design.content.card';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Button } from '@infinity/design.actions.button';

import styles from './product-card.module.scss';

// Default placeholder image if product has no images from the provided list
const DEFAULT_PRODUCT_IMAGE_URL = "https://images.unsplash.com/photo-1615378989441-d0e0eee9979b?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aXZlJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk5MjU5fDA&ixlib=rb-4.1.0";

export type ProductCardProps = {
  /**
   * The product data to display.
   * This object contains all necessary information like name, description, image URLs, and ID.
   */
  product: Product;
  /**
   * Optional custom CSS class name to apply to the card root element.
   * Allows for further customization or integration with utility CSS frameworks.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the card root element.
   * While available, it's generally recommended to use `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
};

/**
 * ProductCard displays a summary of a product, including its image, name, description,
 * and a link to view more details. It's designed to be visually appealing and responsive.
 */
export function ProductCard({ product, className, style }: ProductCardProps): React.JSX.Element {
  // Use the first image URL from the product, or a default placeholder if none are available.
  const imageUrl = product.imageUrls?.[0] || DEFAULT_PRODUCT_IMAGE_URL;
  // Construct the URL for the product detail page.
  const productDetailUrl = `/products/${product.id}`;

  const cardClassName = [styles.productCard, className].filter(Boolean).join(' ');

  return (
    <Card
      className={cardClassName}
      style={style}
      image={imageUrl}
      imageAlt={product.name} // Alt text for the product image, important for accessibility.
      title={product.name}    // The Card component will render this as a prominent heading.
      interactive // Enables visual feedback on hover, suggesting clickability.
      footer={
        // The footer section of the card, typically used for actions or supplementary info.
        <div className={styles.footerActions}>
          <Button appearance="primary" href={productDetailUrl}>
            View Details
          </Button>
        </div>
      }
    >
      {/* The main content/body of the card, displaying the product description. */}
      <Paragraph className={styles.description}>
        {product.description}
      </Paragraph>
    </Card>
  );
}