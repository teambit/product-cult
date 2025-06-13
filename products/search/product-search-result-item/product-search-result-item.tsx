import React from 'react';
import classNames from 'classnames';
import { SearchResult } from '@infinity/search.entities.search-result';
import { Image } from '@infinity/design.content.image';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Link } from '@infinity/design.navigation.link';
import styles from './product-search-result-item.module.scss';

/**
 * Props for the ProductSearchResultItem component.
 */
export type ProductSearchResultItemProps = {
  /**
   * The search result object containing product data.
   * It's expected that `searchResult.data.id` contains the product's unique identifier for linking.
   */
  searchResult: SearchResult;
  /**
   * Optional custom CSS class name to apply to the root element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element.
   */
  style?: React.CSSProperties;
};

/**
 * ProductSearchResultItem is a component designed to display a single product
 * item within a list of search results. It shows the product's image, name (title),
 * and description, and links to the product's detail page.
 */
export function ProductSearchResultItem({
  searchResult,
  className,
  style,
}: ProductSearchResultItemProps): React.JSX.Element {
  const { title, description, imageUrl, data } = searchResult;
  const productId = data?.id as string | undefined; // Assuming data.id is the product's ID

  // Fallback or placeholder if essential data is missing for linking
  const productLink = productId ? `/products/${productId}` : '#';
  // The 'title' prop is not supported by the Link component.
  // const linkTitle = productId ? title : `${title} (Link unavailable)`;

  return (
    <Link
      href={productLink}
      className={classNames(styles.productSearchResultItem, className)}
      style={style}
      // title prop removed as it's not supported by @infinity/design.navigation.link's Link component
      // title={linkTitle}
    >
      {imageUrl && (
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl}
            alt={title || 'Product image'} // Use product title for alt text
            objectFit="cover"
            width="100%" // Image will fill its container
            height="100%" // Image will fill its container
            loading="lazy"
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.content}>
        <Heading level={3} visualLevel={4} className={styles.title}>
          {title}
        </Heading>
        <Paragraph className={styles.description}>{description}</Paragraph>
      </div>
    </Link>
  );
}
