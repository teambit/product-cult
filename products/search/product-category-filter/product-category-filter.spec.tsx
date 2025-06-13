import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductCategory } from '@infinity/products.entities.product-category';
import { ProductCategoryFilter } from './product-category-filter.js';

describe('ProductCategoryFilter', () => {
  const mockCategories: ProductCategory[] = [
    new ProductCategory('cat-id-1', 'Tech & Gadgets', 'Latest in technology and electronic gadgets.'),
    new ProductCategory('cat-id-2', 'Software Solutions', 'Applications and platforms for various needs.'),
  ];

  it('renders the component with categories when mockCategoriesData is provided', () => {
    render(
      <MockProvider>
        <ProductCategoryFilter
          mockCategoriesData={mockCategories}
          selectedCategoryId={undefined}
          onCategoryChange={() => {}}
          label="Category" // Default label for matching
          placeholder="All Categories" // Default placeholder
        />
      </MockProvider>
    );

    expect(screen.getByText('All Categories')).toBeInTheDocument();
  });

});
