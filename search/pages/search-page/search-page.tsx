import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { Heading } from '@infinity/design.typography.heading';
import { Spinner } from '@infinity/design.loaders.spinner';
import { useSearch, type SearchOptionsInput } from '@infinity/search.hooks.use-search';
import { SearchResultsList } from '@infinity/search.ui.search-results-list';
import { SearchFilters, type SearchFiltersAppliedFilters } from '@infinity/search.ui.search-filters';

import styles from './search-page.module.scss';

export type SearchPageProps = {
  /**
   * Optional custom CSS class name to apply to the root page element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root page element.
   */
  style?: React.CSSProperties;
};

const DEFAULT_LIMIT = 20;

export function SearchPage({ className, style }: SearchPageProps): React.JSX.Element {
  const [queryInput, setQueryInput] = useState<string>('');
  const [searchOptions, setSearchOptions] = useState<SearchOptionsInput>({
    query: '',
    limit: DEFAULT_LIMIT,
    offset: 0,
  });

  const { results, loading, error } = useSearch(searchOptions);

  const handleQueryInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(event.target.value);
  }, []);

  const executeSearch = useCallback(() => {
    setSearchOptions(prevOpts => ({
      ...prevOpts,
      query: queryInput,
      offset: 0, 
    }));
  }, [queryInput]);

  const handleFiltersApplied = useCallback((newFilters: SearchFiltersAppliedFilters) => {
    setSearchOptions(prevOpts => ({
      ...prevOpts,
      searchType: newFilters.contentType,
      sortBy: newFilters.sortBy,
      offset: 0, 
    }));
  }, []);

  const initialFiltersForSearchFilters: SearchFiltersAppliedFilters = {
    contentType: searchOptions.searchType,
    sortBy: searchOptions.sortBy,
  };

  return (
    <PageLayout title="Search Results" className={classNames(styles.searchPage, className)} >
      <Heading level={1} className={styles.pageTitle}>Discover Content</Heading>

      <div className={styles.controlsContainer}>
        <div className={styles.queryInputArea}>
          <input
            type="text"
            value={queryInput}
            onChange={handleQueryInputChange}
            placeholder="Enter your search term..."
            className={styles.searchInput}
            aria-label="Search query"
            onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
          />
          <button
            type="button"
            onClick={executeSearch}
            className={styles.searchButton}
            disabled={loading}
          >
            Search
          </button>
        </div>
        <div className={styles.filtersArea}>
          <SearchFilters
            onFiltersApplied={handleFiltersApplied}
            initialFilters={initialFiltersForSearchFilters}
          />
        </div>
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <Spinner size="x-large" color="var(--colors-primary-default)"/>
          <p>Loading results, please wait...</p>
        </div>
      )}

      {error && !loading && (
        <div className={styles.errorContainer}>
          <Heading level={3} visualLevel={4} className={styles.errorMessageTitle}>Oops! Something Went Wrong</Heading>
          <p className={styles.errorMessageText}>
            We couldn&apos;t retrieve search results at this moment. Please try again later.
          </p>
          {error.message && <p className={styles.errorDetail}>Error: {error.message}</p>}
        </div>
      )}

      {!loading && !error && (
        <div className={styles.resultsContainer}>
          <SearchResultsList results={results} />
        </div>
      )}
    </PageLayout>
  );
}