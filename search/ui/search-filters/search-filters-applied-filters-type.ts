/**
 * Represents the structure of the filters object that is passed
 * when filters are applied in the SearchFilters component.
 */
export type SearchFiltersAppliedFilters = {
  /**
   * The value of the selected content type filter, if any.
   * Corresponds to the `value` property of one of the `FilterOptionType` objects
   * provided in `availableContentTypes`.
   */
  contentType?: string;
  /**
   * The value of the selected sort by option, if any.
   * Corresponds to the `value` property of one of the `FilterOptionType` objects
   * provided in `availableSortOptions`.
   */
  sortBy?: string;
};