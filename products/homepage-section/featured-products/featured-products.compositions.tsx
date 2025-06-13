import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { FeaturedProducts } from './featured-products.js';

const containerStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  backgroundColor: 'var(--colors-surface-primary)', // To contrast with component's own background if any
  borderRadius: 'var(--borders-radius-medium)',
  marginBlock: 'var(--spacing-medium)'
};

/**
 * This composition demonstrates the default FeaturedProducts component.
 * It relies on MockProvider to be configured with Apollo mocks that return
 * a list of products for the categoryId "ai-tools".
 */
export const ShowcasingFeaturedProducts = () => (
  <MockProvider>
    <div style={containerStyle}>
      <FeaturedProducts categoryId="ai-tools" />
    </div>
  </MockProvider>
);

/**
 * This composition demonstrates FeaturedProducts with a custom title and a limit
 * on the number of products displayed.
 * It relies on MockProvider to be configured with Apollo mocks that return
 * products for the categoryId "design-software".
 */
export const FeaturedProductsWithCustomTitleAndLimit = () => (
  <MockProvider>
    <div style={containerStyle}>
      <FeaturedProducts
        title="Top Design Software Picks"
        categoryId="design-software"
        limit={2}
      />
    </div>
  </MockProvider>
);

// Custom state components for demonstration
const CustomLoadingIndicator = () => (
  <div style={{ padding: 'var(--spacing-x-large)', textAlign: 'center', color: 'var(--colors-text-accent)', fontFamily: 'var(--typography-font-family)', fontSize: 'var(--typography-sizes-body-large)' }}>
    <p>🚀 Hunting for the latest featured products... Please hold on!</p>
  </div>
);

const CustomEmptyMessage = () => (
  <div style={{ padding: 'var(--spacing-x-large)', textAlign: 'center', color: 'var(--colors-text-secondary)', fontFamily: 'var(--typography-font-family)', fontSize: 'var(--typography-sizes-body-large)' }}>
    <img 
      src="https://images.unsplash.com/photo-1717187173307-ffcedb6f6d7a?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxMHx8bW9kZXJuJTIwcHJvZHVjdCUyMHNob3djYXNlfGVufDF8MHx8b3JhbmdlfDE3NDk2MDA3NTB8MA&ixlib=rb-4.1.0&q=80&w=200" 
      alt="Empty illustration" 
      style={{ width: '120px', opacity: 0.7, marginBottom: 'var(--spacing-medium)' }} 
    />
    <p>🤔 Looks like this featured spot is waiting for its star. No products found right now!</p>
  </div>
);

const CustomErrorMessage = () => (
  <div style={{ padding: 'var(--spacing-x-large)', textAlign: 'center', color: 'var(--colors-status-negative-default)', fontFamily: 'var(--typography-font-family)', fontSize: 'var(--typography-sizes-body-large)' }}>
    <p>🛠️ Uh oh! We hit a snag trying to fetch featured products. Please try refreshing later.</p>
  </div>
);

/**
 * This composition demonstrates how to provide custom components for loading, empty, and error states.
 * The actual state displayed (loading, empty, error, or products) depends on how MockProvider
 * (and its internal Apollo MockedProvider) is configured to respond to the categoryId "dynamic-state-category".
 * If MockProvider has no specific mocks for this categoryId, it will likely show the loading state,
 * then potentially the error state. To see the empty state, MockProvider would need to be configured
 * to return an empty list of products for this category.
 */
export const FeaturedProductsHandlingDifferentStates = () => (
  <MockProvider>
    <div style={containerStyle}>
      <FeaturedProducts
        title="Dynamic State Demo"
        categoryId="dynamic-state-category"
        loadingState={<CustomLoadingIndicator />}
        emptyState={<CustomEmptyMessage />}
        errorState={<CustomErrorMessage />}
      />
    </div>
  </MockProvider>
);