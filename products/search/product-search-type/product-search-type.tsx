import React from 'react';
import type { SearchTypeComponent } from '@infinity/search.search';
import type { ProductSearchSpecificUIProps } from './product-search-specific-ui-props-type.js';
import styles from './product-search-type.module.scss';
import classNames from 'classnames';

/**
 * ProductSearchSpecificUI is the React component rendered when the 'products'
 * search type is selected or active within the search interface.
 * It can display product-specific filters, layouts, or information.
 * @param props The properties for the component, including optional className and style.
 */
const ProductSearchSpecificUI: React.FC<ProductSearchSpecificUIProps> = ({ className, style, ...restProps }) => {
  // `restProps` would contain any properties passed down from SearchTypeComponentProps (Record<string, any>)
  // e.g., current search query, filters, etc.
  return (
    <div className={classNames(styles.productSearchTypeContainer, className)} style={style} {...restProps}>
      <h3 className={styles.title}>Search Products</h3>
      <p className={styles.description}>
        Discover and filter products from our extensive catalog. Use the options below to narrow your search or explore featured items.
      </p>
      <div className={styles.filtersPlaceholder}>
        <span className={styles.placeholderText}>Product-specific filtering options and advanced search tools will appear here.</span>
      </div>
    </div>
  );
};

/**
 * Configuration object for the "products" search type.
 * This object is intended to be registered with the SearchBrowser (from @infinity/search.search)
 * using its `registerSearchTypeComponent` method. It defines the 'products' search type
 * and associates it with the `ProductSearchSpecificUI` component.
 */
export const productSearchTypeEntry: SearchTypeComponent = {
  name: 'products',
  component: ProductSearchSpecificUI,
};

/**
 * The ProductSearchType component serves as the main export for this Bit component.
 * While its primary role is to provide the `productSearchTypeEntry` configuration
 * for the search system, this React component can render an overview or a preview,
 * useful for documentation, testing, or direct composition in Bit.
 * @param props The properties for the component, currently accepting className and style.
 */
const ProductSearchType: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => {
  return (
    <div className={classNames(styles.wrapperInfo, className)} style={style}>
      <h2 className={styles.infoTitle}>Product Search Type Provider</h2>
      <p className={styles.infoText}>
        This Bit component (<code>product-search-type</code>) provides the necessary configuration
        (via the exported <code>productSearchTypeEntry</code> object) to integrate product searching capabilities
        into the platform&apos;s search system. The UI below is a preview of what gets rendered when &apos;products&apos; is the active search type.
      </p>
      <div className={styles.previewSection}>
        <h4 className={styles.previewTitle}>Live Preview: UI for &quot;Products&quot; Search Type</h4>
        <ProductSearchSpecificUI className={styles.previewComponent} />
      </div>
       <pre className={styles.infoPre}>
        <code>
          {`
// Exported Configuration for Search Aspect:
// import { productSearchTypeEntry } from '@your-scope/product-search-type';

export const productSearchTypeEntry: SearchTypeComponent = {
  name: 'products',
  component: ProductSearchSpecificUI // (The React Component shown above)
};
          `}
        </code>
      </pre>
    </div>
  );
};

export default ProductSearchType;