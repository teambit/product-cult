import { v4 as uuidv4 } from 'uuid';
import type { SortOrder } from './sort-order-type.js';

/**
 * Plain object representation of a search query, used for creation or rehydration.
 * Does not include an 'id' property by default, as 'id' is typically generated.
 * Can include an 'id' if reconstructing an existing entity.
 */
export type PlainSearchQuery = {
  /**
   * The keywords to search for.
   */
  keywords: string;

  /**
   * Filters to apply based on content type.
   * e.g., ['product', 'article']
   * Defaults to an empty array if not provided.
   */
  contentTypeFilters?: readonly string[];

  /**
   * The field to sort the results by.
   * e.g., 'relevance', 'date', 'name'
   */
  sortBy?: string;

  /**
   * The order to sort the results in.
   */
  sortOrder?: SortOrder;

  /**
   * The page number for pagination.
   * Defaults to 1 if not provided.
   */
  page?: number;

  /**
   * The number of results per page for pagination.
   * Defaults to 10 if not provided.
   */
  pageSize?: number;
};

/**
 * Serializable representation of a SearchQuery, including its generated ID.
 * This is the typical output format from `toObject()`.
 */
export type SerializableSearchQuery = PlainSearchQuery & {
  /**
   * Unique identifier of the search query.
   */
  id: string;
};

/**
 * Represents a search query with its parameters.
 * Manages properties like keywords, filters, sorting, and pagination.
 */
export class SearchQuery {
  /**
   * Unique identifier for the search query.
   * Automatically generated if not provided during construction (e.g., via `from` with an existing ID).
   */
  readonly id: string;

  /**
   * Constructs a new SearchQuery instance.
   * @param keywords - The keywords to search for.
   * @param contentTypeFilters - Filters for content type. Defaults to an empty array.
   * @param sortBy - Field to sort by. Optional.
   * @param sortOrder - Order of sorting ('asc' or 'desc'). Optional.
   * @param page - Page number for pagination. Defaults to 1.
   * @param pageSize - Number of items per page. Defaults to 10.
   * @param id - Optional. An existing ID for the entity. If not provided, a new UUID is generated.
   */
  constructor(
    /**
     * The keywords to search for.
     */
    readonly keywords: string,
    /**
     * Filters to apply based on content type.
     */
    readonly contentTypeFilters: readonly string[] = [],
    /**
     * The field to sort the results by.
     */
    readonly sortBy?: string,
    /**
     * The order to sort the results in.
     */
    readonly sortOrder?: SortOrder,
    /**
     * The page number for pagination.
     */
    readonly page: number = 1,
    /**
     * The number of results per page for pagination.
     */
    readonly pageSize: number = 10,
    id?: string
  ) {
    this.id = id || uuidv4();
  }

  /**
   * Serializes the SearchQuery entity into a plain, serializable object.
   * Includes the 'id' property.
   * @returns A plain object representation of the search query.
   */
  toObject(): SerializableSearchQuery {
    return {
      id: this.id,
      keywords: this.keywords,
      contentTypeFilters: [...this.contentTypeFilters], // Return a mutable copy
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      page: this.page,
      pageSize: this.pageSize,
    };
  }

  /**
   * Creates a SearchQuery instance from a plain object.
   * Default values for optional fields are handled by the constructor.
   * @param plainSearchQuery - The plain object containing search query data.
   * @param existingId - Optional. If provided, this ID will be used for the entity. Useful for reconstructing entities.
   * @returns A new SearchQuery instance.
   */
  static from(plainSearchQuery: PlainSearchQuery, existingId?: string): SearchQuery {
    return new SearchQuery(
      plainSearchQuery.keywords,
      plainSearchQuery.contentTypeFilters, // Constructor handles default if undefined
      plainSearchQuery.sortBy,
      plainSearchQuery.sortOrder,
      plainSearchQuery.page, // Constructor handles default if undefined
      plainSearchQuery.pageSize, // Constructor handles default if undefined
      existingId // Pass to constructor; if undefined, constructor generates a new ID
    );
  }
}