import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { CreateProductPage } from './create-product.js';

/**
 * Basic composition to render the CreateProductPage.
 * This relies on MockProvider to set up a mock environment, including
 * a logged-in user (for ProtectedRoute), and default mock behavior for
 * product category loading and product creation hooks.
 */
export const DefaultCreateProductPage = () => (
  <MockProvider>
    <CreateProductPage />
  </MockProvider>
);

/**
 * Composition to demonstrate applying custom styles and classes to CreateProductPage.
 */
export const StyledCreateProductPage = () => (
  <MockProvider>
    <style>
      {`
        .custom-create-product-page-style {
          border: 2px dashed var(--colors-primary-default);
          padding: var(--spacing-medium);
          background-color: var(--colors-surface-secondary);
        }
        .custom-create-product-page-style .form { // Targeting internal element for demo
          box-shadow: var(--effects-shadows-x-large);
        }
      `}
    </style>
    <CreateProductPage
      className="custom-create-product-page-style"
      style={{ marginTop: 'var(--spacing-large)' }}
    />
  </MockProvider>
);

/**
 * This composition attempts to showcase the page when product categories might be loading or have failed to load.
 * NOTE: The actual behavior depends on how MockProvider and the underlying hooks (`useListProductCategories`)
 * are configured to behave in a mock environment by default, as direct control over Apollo mocks
 * is not explicitly provided via MockProvider props in the given documentation.
 *
 * If MockProvider's default setup for useListProductCategories hook shows a loading state or an error state,
 * this composition would reflect that. Otherwise, it may render similarly to DefaultCreateProductPage.
 */
export const CreateProductPageWithPotentialCategoryStates = () => (
    <MockProvider>
      <div>
        <p style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-secondary)', padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-primary)', border: '1px solid var(--colors-border-default)', borderRadius: 'var(--borders-radius-medium)', margin: 'var(--spacing-medium)'}}>
          The form below demonstrates the Create Product Page. The product categories dropdown
          will show 'Loading categories...' if the `useListProductCategories` hook is in a loading state,
          or an error if it encounters an issue, based on the default mock behavior provided by `MockProvider`.
          If categories load successfully (even an empty list), the relevant state will be shown.
        </p>
        <CreateProductPage />
      </div>
    </MockProvider>
  );