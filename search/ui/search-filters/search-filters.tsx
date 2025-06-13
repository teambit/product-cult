import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { SelectList, type SelectListOption } from '@infinity/design.inputs.select-list';
import { Button } from '@infinity/design.actions.button';
import type { FilterOptionType } from './filter-option-type.js';
import type { SearchFiltersAppliedFilters } from './search-filters-applied-filters-type.js';
import styles from './search-filters.module.scss';

const DEFAULT_CONTENT_TYPES: FilterOptionType[] = [
  { value: 'all', label: 'All Content' },
  { value: 'products', label: 'Products' },
  { value: 'launches', label: 'Launches' },
  { value: 'news', label: 'News' },
  { value: 'reviews', label: 'Reviews' },
  { value: 'forums', label: 'Forum Posts' },
];

const DEFAULT_SORT_OPTIONS: FilterOptionType[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date_desc', label: 'Date: Newest First' },
  { value: 'date_asc', label: 'Date: Oldest First' },
];

export type SearchFiltersProps = {
  /**
   * Optional CSS class name to apply to the main container of the component.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the main container of the component.
   */
  style?: React.CSSProperties;
  /**
   * Title displayed above the filter controls.
   * @default 'Filter & Sort Results'
   */
  title?: string;
  /**
   * An array of `FilterOptionType` objects defining the available content types for filtering.
   * If not provided, a default list of content types (e.g., All, Products, Launches) will be used.
   */
  availableContentTypes?: FilterOptionType[];
  /**
   * An array of `FilterOptionType` objects defining the available sort options.
   * If not provided, a default list of sort options (e.g., Relevance, Date) will be used.
   */
  availableSortOptions?: FilterOptionType[];
  /**
   * Callback function that is invoked when the user applies the selected filters.
   * It receives an object containing the current `contentType` and `sortBy` values.
   */
  onFiltersApplied: (filters: SearchFiltersAppliedFilters) => void;
  /**
   * An object representing the initially selected filter values.
   * Use this to set the default state of the filters when the component mounts or to control it externally.
   * @default {}
   */
  initialFilters?: SearchFiltersAppliedFilters;
  /**
   * Custom text for the apply filters button.
   * @default 'Apply Filters'
   */
  applyButtonText?: string;
  /**
   * Label for the content type selection dropdown.
   * @default 'Content Type'
   */
  contentTypeLabel?: string;
  /**
   * Label for the sort by selection dropdown.
   * @default 'Sort By'
   */
  sortByLabel?: string;
};

/**
 * SearchFilters component provides UI controls for filtering by content type
 * and sorting results by criteria like relevance or date.
 */
export function SearchFilters({
  className,
  style,
  title = 'Filter & Sort Results',
  availableContentTypes = DEFAULT_CONTENT_TYPES,
  availableSortOptions = DEFAULT_SORT_OPTIONS,
  onFiltersApplied,
  initialFilters = {},
  applyButtonText = 'Apply Filters',
  contentTypeLabel = 'Content Type',
  sortByLabel = 'Sort By',
}: SearchFiltersProps): React.JSX.Element {
  const [selectedContentType, setSelectedContentType] = useState<string | undefined>(initialFilters.contentType);
  const [selectedSortBy, setSelectedSortBy] = useState<string | undefined>(initialFilters.sortBy);

  useEffect(() => {
    setSelectedContentType(initialFilters.contentType);
    setSelectedSortBy(initialFilters.sortBy);
  }, [initialFilters.contentType, initialFilters.sortBy]);

  const handleApply = () => {
    onFiltersApplied({
      contentType: selectedContentType,
      sortBy: selectedSortBy,
    });
  };

  return (
    <div className={classNames(styles.searchFiltersContainer, className)} style={style}>
      {title && <h3 className={styles.searchFiltersHeader}>{title}</h3>}
      <div className={styles.controlsWrapper}>
        <div className={styles.selectListWrapper}>
          <SelectList
            id="search-filters-content-type"
            label={contentTypeLabel}
            options={availableContentTypes as SelectListOption[]}
            value={selectedContentType}
            onChange={(value) => setSelectedContentType(value as string)}
            placeholder="Any type"
          />
        </div>
        <div className={styles.selectListWrapper}>
          <SelectList
            id="search-filters-sort-by"
            label={sortByLabel}
            options={availableSortOptions as SelectListOption[]}
            value={selectedSortBy}
            onChange={(value) => setSelectedSortBy(value as string)}
            placeholder="Default order"
          />
        </div>
        <div className={styles.applyButtonWrapper}>
          <Button appearance="primary" onClick={handleApply}>
            {applyButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}