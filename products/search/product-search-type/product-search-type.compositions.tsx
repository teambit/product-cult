import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import ProductSearchType, { productSearchTypeEntry } from './product-search-type.js';
import type { ProductSearchSpecificUIProps } from './product-search-specific-ui-props-type.js';

/**
 * Composition to display the main ProductSearchType component.
 * This component provides an overview and a preview of the product-specific search UI.
 */
export const BasicProductSearchType = () => (
  <MockProvider>
    <ProductSearchType />
  </MockProvider>
);

/**
 * Composition to display the ProductSearchSpecificUI component in isolation.
 * This is the UI component that would be rendered by the search system when
 * the 'products' search type is active.
 */
export const StandaloneProductSearchSpecificUI = () => {
  // Accessing the component directly from the exported productSearchTypeEntry
  const SpecificUIComponent = productSearchTypeEntry.component as React.FC<ProductSearchSpecificUIProps>;

  return (
    <MockProvider>
      <div style={{
        padding: 'var(--spacing-x-large)',
        backgroundColor: 'var(--colors-surface-background)',
        minHeight: '100vh', // Ensure theme background covers viewport
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'var(--spacing-large)',
          backgroundColor: 'var(--colors-surface-primary)',
          borderRadius: 'var(--borders-radius-large)',
          boxShadow: 'var(--effects-shadows-large)',
          color: 'var(--colors-text-primary)',
          fontFamily: 'var(--typography-font-family)'
        }}>
          <h2 style={{
            fontSize: 'var(--typography-sizes-heading-h2)',
            fontWeight: 'var(--typography-font-weight-bold)',
            color: 'var(--colors-text-primary)',
            marginBottom: 'var(--spacing-medium)',
            borderBottom: `2px solid var(--colors-primary-default)`,
            paddingBottom: 'var(--spacing-small)'
          }}>
            Standalone Product-Specific Search UI
          </h2>
          <p style={{
            fontSize: 'var(--typography-sizes-body-large)',
            color: 'var(--colors-text-secondary)',
            lineHeight: 'var(--typography-line-height-relaxed)',
            marginBottom: 'var(--spacing-x-large)'
          }}>
            This composition demonstrates the <code>ProductSearchSpecificUI</code> component in isolation.
            It is the actual UI rendered when the &apos;products&apos; search type is selected in the search system,
            as defined in <code>productSearchTypeEntry.component</code>.
          </p>
          <SpecificUIComponent className="custom-product-specific-ui-class" />

          <div style={{
            marginTop: 'var(--spacing-x-large)',
            padding: 'var(--spacing-medium)',
            border: '1px dashed var(--colors-border-subtle)',
            borderRadius: 'var(--borders-radius-medium)',
            backgroundColor: 'var(--colors-surface-secondary)'
           }}>
             <h4 style={{
                fontSize: 'var(--typography-sizes-heading-h5)',
                color: 'var(--colors-text-accent)',
                marginTop: 0,
                marginBottom: 'var(--spacing-small)'
             }}>Developer Note:</h4>
            <p style={{
                fontSize: 'var(--typography-sizes-body-default)',
                color: 'var(--colors-text-secondary)',
                margin: 0
            }}>
              The <code>SpecificUIComponent</code> above can accept <code>className</code> and <code>style</code> props for further customization.
              Any additional props passed from the search system (as per <code>BaseSearchTypeComponentProps</code>) would also be available.
              Example: <code>&lt;SpecificUIComponent currentQuery=&quot;gadgets&quot; /&gt;</code>
            </p>
          </div>
        </div>
      </div>
    </MockProvider>
  );
};