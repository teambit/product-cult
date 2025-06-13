import React, { useState } from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SearchFilters } from './search-filters.js';
import type { FilterOptionType, SearchFiltersAppliedFilters } from './index.js';

const containerStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium)',
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: 'var(--colors-surface-background)', // Use theme background
};

const outputStyle: React.CSSProperties = {
  marginTop: 'var(--spacing-medium)',
  padding: 'var(--spacing-medium)',
  border: '1px dashed var(--colors-border-default)',
  borderRadius: 'var(--borders-radius-medium)',
  backgroundColor: 'var(--colors-surface-secondary)',
  fontFamily: 'var(--typography-font-family)',
  fontSize: 'var(--typography-sizes-body-small)',
  color: 'var(--colors-text-secondary)',
  whiteSpace: 'pre-wrap', // To display JSON nicely
};

const compositionTitleStyle: React.CSSProperties = {
    fontFamily: 'var(--typography-font-family)',
    color: 'var(--colors-text-primary)',
    fontSize: 'var(--typography-sizes-heading-h3)',
    marginBottom: 'var(--spacing-large)',
    borderBottom: '1px solid var(--colors-border-subtle)',
    paddingBottom: 'var(--spacing-small)',
};

export const BasicSearchFilters = () => {
  const [appliedFilters, setAppliedFilters] = useState<SearchFiltersAppliedFilters | null>(null);

  const handleApply = (filters: SearchFiltersAppliedFilters) => {
    // eslint-disable-next-line no-console
    console.log('Filters Applied:', filters);
    setAppliedFilters(filters);
  };

  return (
    <MockProvider>
      <div style={containerStyle}>
        <h3 style={compositionTitleStyle}>Basic Search Filters</h3>
        <SearchFilters onFiltersApplied={handleApply} />
        {appliedFilters && (
          <div style={outputStyle}>
            <strong>Applied Filters:</strong>
            <br />
            {JSON.stringify(appliedFilters, null, 2)}
          </div>
        )}
      </div>
    </MockProvider>
  );
};

export const SearchFiltersWithInitialValues = () => {
  const [appliedFilters, setAppliedFilters] = useState<SearchFiltersAppliedFilters | null>({
    contentType: 'products',
    sortBy: 'date_desc',
  });

  const initialFilters: SearchFiltersAppliedFilters = {
    contentType: 'products',
    sortBy: 'date_desc',
  };

  const handleApply = (filters: SearchFiltersAppliedFilters) => {
    // eslint-disable-next-line no-console
    console.log('Filters Applied (with initial):', filters);
    setAppliedFilters(filters);
  };

  return (
    <MockProvider>
      <div style={containerStyle}>
        <h3 style={compositionTitleStyle}>Search Filters With Initial Values</h3>
        <SearchFilters onFiltersApplied={handleApply} initialFilters={initialFilters} />
        {appliedFilters && (
          <div style={outputStyle}>
            <strong>Current Filters (Initial was {JSON.stringify(initialFilters, null, 2)}):</strong>
            <br />
            {JSON.stringify(appliedFilters, null, 2)}
          </div>
        )}
      </div>
    </MockProvider>
  );
};

const customContentTypes: FilterOptionType[] = [
  { value: 'all', label: 'Everything' },
  { value: 'apps', label: 'Applications' },
  { value: 'tools', label: 'Developer Tools' },
  { value: 'services', label: 'Online Services', disabled: true },
  { value: 'guides', label: 'Guides & Tutorials' },
];

const customSortOptions: FilterOptionType[] = [
  { value: 'trending', label: 'Trending Now' },
  { value: 'upvotes_high', label: 'Most Upvoted' },
  { value: 'newest_submission', label: 'Latest Submissions' },
  { value: 'oldest_submission', label: 'Oldest Submissions' },
];

export const CustomizedSearchFilters = () => {
  const [appliedFilters, setAppliedFilters] = useState<SearchFiltersAppliedFilters | null>(null);

  const handleApply = (filters: SearchFiltersAppliedFilters) => {
    // eslint-disable-next-line no-console
    console.log('Custom Filters Applied:', filters);
    setAppliedFilters(filters);
  };

  return (
    <MockProvider>
      <div style={containerStyle}>
        <h3 style={compositionTitleStyle}>Customized Search Filters</h3>
        <SearchFilters
          onFiltersApplied={handleApply}
          title="Refine Your Discovery"
          availableContentTypes={customContentTypes}
          availableSortOptions={customSortOptions}
          applyButtonText="Update Results"
          contentTypeLabel="Show me:"
          sortByLabel="Order by:"
          initialFilters={{ contentType: 'apps', sortBy: 'trending' }}
        />
        {appliedFilters && (
          <div style={outputStyle}>
            <strong>Applied Custom Filters:</strong>
            <br />
            {JSON.stringify(appliedFilters, null, 2)}
          </div>
        )}
      </div>
    </MockProvider>
  );
};