import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Product, PlainProduct } from '@infinity/products.entities.product';
import { ProductsPage } from './index.js';
import styles from './products-page.module.scss';

// Mock Product Data using provided image URLs
const mockPlainProductsData: PlainProduct[] = [
  {
    id: 'prod-airpods-1',
    name: 'Apple Airpods (3rd Gen)',
    description: 'Experience magical sound with Adaptive EQ and Spatial Audio. Includes MagSafe Charging Case.',
    price: 179.00,
    imageUrls: ["https://images.unsplash.com/photo-1600375104627-c94c416deefa?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZHVjdHxlbnwxfDJ8fG9yYW5nZXwxNzQ5NjAwNzUxfDA&ixlib=rb-4.1.0"],
    categoryId: 'audio-headphones',
    submitterUserId: 'user-applefan',
    videoUrls: [],
    variants: []
  },
  {
    id: 'prod-smartwatch-2',
    name: 'Vitality Smartwatch Series 7',
    description: 'Your ultimate health companion. Track workouts, ECG, blood oxygen, and more. Stylish green band.',
    price: 399.00,
    imageUrls: ["https://images.unsplash.com/photo-1548973862-91b7a794c719?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHx0ZWNoJTIwcHJvZHVjdHxlbnwxfDJ8fG9yYW5nZXwxNzQ5NjAwNzUxfDA&ixlib=rb-4.1.0"],
    categoryId: 'wearables-smartwatches',
    submitterUserId: 'user-fitnesstech',
    videoUrls: [],
    variants: []
  },
  {
    id: 'prod-smartphone-3',
    name: 'Poco M3 - Vibrant Yellow',
    description: 'Budget-friendly smartphone with a massive battery, triple camera, and a unique eye-catching design.',
    price: 149.00,
    imageUrls: ["https://images.unsplash.com/photo-1615215271299-608ada121f72?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHx0ZWNoJTIwcHJvZHVjdHxlbnwxfDJ8fG9yYW5nZXwxNzQ5NjAwNzUxfDA&ixlib=rb-4.1.0"],
    categoryId: 'electronics-smartphones',
    submitterUserId: 'user-gadgetlover',
    videoUrls: [],
    variants: []
  },
  {
    id: 'prod-gameboy-4',
    name: 'Retro Handheld Console GBC',
    description: 'Relive classic gaming moments with this iconic yellow handheld console. Perfect for collectors.',
    price: 99.99,
    imageUrls: ["https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw2fHx0ZWNoJTIwcHJvZHVjdHxlbnwxfDJ8fG9yYW5nZXwxNzQ5NjAwNzUxfDA&ixlib=rb-4.1.0"],
    categoryId: 'gaming-consoles',
    submitterUserId: 'user-retrogamer',
    videoUrls: [],
    variants: []
  }
];
const mockProducts: Product[] = mockPlainProductsData.map(p => Product.from(p));

// Custom state components, styled using products-page.module.scss and theme variables
const CustomLoadingState = () => (
  <div className={styles.defaultState} style={{backgroundColor: 'var(--colors-surface-primary)', border: 'none', boxShadow: 'var(--effects-shadows-medium)'}}>
    <div className={styles.spinner}></div>
    <p style={{color: 'var(--colors-text-accent)', fontSize: 'var(--typography-sizes-body-large)'}}>Loading latest product discoveries...</p>
  </div>
);

const CustomEmptyState = () => (
  <div className={styles.defaultState} style={{backgroundColor: 'var(--colors-surface-primary)', border: 'none', boxShadow: 'var(--effects-shadows-medium)'}}>
    <span className={styles.iconEmpty} role="img" aria-label="Empty box icon" style={{fontSize: 'var(--typography-sizes-display-medium)', color: 'var(--colors-text-secondary)', marginBottom: 'var(--spacing-small)'}}>🛍️</span>
    <h3 style={{color: 'var(--colors-text-primary)', fontFamily: 'var(--typography-font-family)', fontSize: 'var(--typography-sizes-heading-h3)', marginBottom: 'var(--spacing-x-small)'}}>Nothing to see here!</h3>
    <p style={{color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-default)'}}>Looks like this product category is empty. Try exploring others!</p>
  </div>
);

// Mock Header and Footer for PageLayout integration
const MockPageHeader = ({ title = "Product Hunt Platform" }: { title?: string }) => (
  <header style={{
    padding: 'var(--spacing-medium) var(--layout-container-padding)',
    backgroundColor: 'var(--colors-surface-secondary)',
    color: 'var(--colors-text-primary)',
    borderBottom: '1px solid var(--colors-border-default)',
    fontFamily: 'var(--typography-font-family)',
    textAlign: 'center'
  }}>
    <h1 style={{ fontSize: 'var(--typography-sizes-heading-h1)', margin: 0, color: 'var(--colors-primary-default)'}}>{title}</h1>
  </header>
);

const MockPageFooter = () => (
  <footer style={{
    padding: 'var(--spacing-large) var(--layout-container-padding)',
    backgroundColor: 'var(--colors-surface-secondary)',
    color: 'var(--colors-text-secondary)',
    borderTop: '1px solid var(--colors-border-default)',
    fontFamily: 'var(--typography-font-family)',
    textAlign: 'center',
    marginTop: 'var(--spacing-x-large)'
  }}>
    <p style={{fontSize: 'var(--typography-sizes-body-small)', margin: 0}}>© {new Date().getFullYear()} Infinity Product Discoveries. Explore Innovations Daily.</p>
  </footer>
);

export const ProductsPageWithData = () => (
  <MockProvider>
    <ProductsPage
      title="Featured Tech Products"
      metaDescription="Explore a curated list of the latest and greatest tech products."
      header={<MockPageHeader title="Tech Showcase"/>}
      footer={<MockPageFooter />}
      categoryId="tech-gadgets"
      initialProducts={mockProducts}
    />
  </MockProvider>
);

export const ProductsPageWhenEmpty = () => (
  <MockProvider>
    <ProductsPage
      title="No Products Yet"
      metaDescription="This category currently has no products listed. Check back soon!"
      header={<MockPageHeader title="Category: Uncharted Territory"/>}
      footer={<MockPageFooter />}
      categoryId="empty-category"
      initialProducts={[]}
      customEmptyState={<CustomEmptyState />}
    />
  </MockProvider>
);

export const ProductsPageLoadingData = () => (
  <MockProvider>
    <ProductsPage
      title="Loading Discoveries..."
      metaDescription="Fetching the newest product listings for you."
      header={<MockPageHeader title="Just a Moment..."/>}
      footer={<MockPageFooter />}
      categoryId="all-products"
      // By not providing initialProducts, ProductList (used by ProductsPage)
      // will attempt to fetch, triggering its loading state.
      // MockProvider's Apollo setup should facilitate this behavior.
      customLoadingState={<CustomLoadingState />}
    />
  </MockProvider>
);