import type { SearchResult } from '@infinity/search.entities.search-result';
import type { ComponentType } from 'react';

/**
 * Options for performing a search query.
 */
export type SearchOptions = {
  /**
   * The query string to search for.
   */
  query: string;
  /**
   * Maximum number of results to return.
   */
  limit?: number;
  /**
   * Number of results to skip for pagination.
   */
  offset?: number;
  /**
   * Specific type of content to search within (e.g., 'product', 'news', 'forum').
   */
  searchType?: string;
  /**
   * Field to sort the results by.
   */
  sortBy?: string;
  /**
   * Order of sorting, 'asc' for ascending or 'desc' for descending.
   */
  sortOrder?: 'asc' | 'desc';
  /**
   * Additional filters to apply to the search results.
   */
  filters?: Record<string, any>;
};

/**
 * Options for registering a new search type.
 */
export type RegisterSearchTypeOptions = {
  /**
   * Unique name for the search type (e.g., 'products', 'news').
   */
  name: string;
  /**
   * Human-readable label for the search type (e.g., 'Products', 'Latest News').
   */
  label: string;
  /**
   * Description of the search type.
   */
  description: string;
  /**
   * Function to transform an entity into a SearchResult format for indexing.
   */
  indexFunction?: (entity: any) => SearchResult;
  /**
   * React component to display search results of this type.
   */
  component?: ComponentType<any>;
};

/**
 * Options for indexing content into the search system.
 */
export type IndexContentOptions = {
  /**
   * The type of content being indexed (must match a registered search type).
   */
  type: string;
  /**
   * Unique identifier for the content item.
   */
  id: string;
  /**
   * The actual data of the content item to be indexed.
   */
  data: Record<string, any>;
};

/**
 * Represents a registered search type.
 */
export type SearchType = {
  /**
   * Unique name of the search type.
   */
  name: string;
  /**
   * Human-readable label for the search type.
   */
  label: string;
  /**
   * Description of the search type.
   */
  description: string;
};