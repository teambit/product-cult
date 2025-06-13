import type { SortOrder } from '@infinity/search.entities.search-query';

/**
 * Defines the input options for performing a search query.
 * This structure is used as variables for the GraphQL search query.
 */
export type SearchOptionsInput = {
  /**
   * The search query string (e.g., keywords).
   */
  query: string;
  /**
   * Optional limit for the number of results to return.
   */
  limit?: number;
  /**
   * Optional offset for paginating results.
   */
  offset?: number;
  /**
   * Optional specific search type to filter by (e.g., 'product', 'article').
   */
  searchType?: string;
  /**
   * Optional field to sort the results by.
   */
  sortBy?: string;
  /**
   * Optional sort order ('ASC' or 'DESC').
   */
  sortOrder?: SortOrder;
  /**
   * Optional additional filters, as a JSON-like object.
   */
  filters?: Record<string, any>;
};