import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SearchFilters } from './search-filters.js';
// import styles from './search-filters.module.scss'; // styles import is not strictly needed for these tests after refactoring queries

const mockOnFiltersApplied = vi.fn();

describe('SearchFilters', () => {
  beforeEach(() => {
    mockOnFiltersApplied.mockClear();
  });

  it('should render the component with default props', () => {
    render(
      <MockProvider>
        <SearchFilters onFiltersApplied={mockOnFiltersApplied} />
      </MockProvider>
    );

    expect(screen.getByText('Filter & Sort Results')).toBeInTheDocument(); // Check title

    // Check for SelectList components by their labels
    // This assumes SelectList correctly associates its label with its interactive element
    expect(screen.getByLabelText('Content Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Sort By')).toBeInTheDocument();

    // Check for apply button by its role and accessible name
    expect(screen.getByRole('button', { name: 'Apply Filters' })).toBeInTheDocument();
  });

  it('should call onFiltersApplied with selected values when apply button is clicked', () => {
    render(
      <MockProvider>
        <SearchFilters onFiltersApplied={mockOnFiltersApplied} />
      </MockProvider>
    );

    const applyButton = screen.getByRole('button', { name: 'Apply Filters' });
    fireEvent.click(applyButton);

    expect(mockOnFiltersApplied).toHaveBeenCalledTimes(1);
    // Default initial state, nothing selected, so undefined values are expected
    expect(mockOnFiltersApplied).toHaveBeenCalledWith({ contentType: undefined, sortBy: undefined });
  });
});