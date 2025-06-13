import React, { useState } from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductCategory } from '@infinity/products.entities.product-category';
import { ProductCategoryFilter } from './product-category-filter.js';

const mockCategories: ProductCategory[] = [
  new ProductCategory('cat-id-1', 'Tech & Gadgets', 'Latest in technology and electronic gadgets.'),
  new ProductCategory('cat-id-2', 'Software Solutions', 'Applications and platforms for various needs.'),
  new ProductCategory('cat-id-3', 'Gaming World', 'Video games, hardware, and e-sports.'),
  new ProductCategory('cat-id-4', 'Productivity Tools', 'Apps to enhance efficiency and workflow.'),
  new ProductCategory('cat-id-5', 'Design & Creative', 'Resources for designers and artists.'),
];

const commonWrapperStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  maxWidth: '350px',
  fontFamily: 'var(--typography-font-family)',
  backgroundColor: 'var(--colors-surface-background)',
  borderRadius: 'var(--borders-radius-medium)',
  boxShadow: 'var(--effects-shadows-medium)',
  margin: 'var(--spacing-large) auto',
};

const infoTextStyle: React.CSSProperties = {
  marginTop: 'var(--spacing-medium)',
  color: 'var(--colors-text-secondary)',
  fontSize: 'var(--typography-sizes-body-small)',
  padding: 'var(--spacing-small)',
  backgroundColor: 'var(--colors-surface-primary)',
  borderRadius: 'var(--borders-radius-small)',
  border: '1px solid var(--colors-border-subtle)',
};

export const BasicProductCategoryFilter = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <ProductCategoryFilter
          mockCategoriesData={mockCategories}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
          label="Filter by Product Category"
          placeholder="All Product Categories"
        />
        <p style={infoTextStyle}>
          Selected Category ID: {selectedCategoryId || 'None (All Categories)'}
        </p>
      </div>
    </MockProvider>
  );
};

export const ProductCategoryFilterWithInitialSelection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(mockCategories[1]?.id || undefined);

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <ProductCategoryFilter
          mockCategoriesData={mockCategories}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
          label="Category (Pre-selected)"
        />
        <p style={infoTextStyle}>
          Selected: {selectedCategoryId ? mockCategories.find(c => c.id === selectedCategoryId)?.name : 'None'}
        </p>
      </div>
    </MockProvider>
  );
};

export const ProductCategoryFilterWithNoCategories = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <ProductCategoryFilter
          mockCategoriesData={[]}
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
          label="Available Categories"
          placeholder="Select Category"
        />
        <p style={infoTextStyle}>
          This filter is using an empty list of categories. It should display an "emptyMessage" in the dropdown.
        </p>
      </div>
    </MockProvider>
  );
};

export const ProductCategoryFilterLoadingState = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);

  // By not providing `mockCategoriesData`, the `useListProductCategories` hook
  // inside ProductCategoryFilter will attempt a real fetch.
  // Within MockProvider's Apollo context, this should result in a loading state,
  // or an error if no Apollo mocks are configured for the 'listProductCategories' query.
  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <ProductCategoryFilter
          // mockCategoriesData is intentionally omitted to simulate loading/error
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
          label="Category (Fetching)"
          placeholder="All Categories"
        />
        <p style={infoTextStyle}>
          This filter is attempting to fetch categories.
          It should show "Loading Categories..." and be disabled.
          If an error occurs (e.g. no mock for query), it might display its error state.
        </p>
      </div>
    </MockProvider>
  );
};