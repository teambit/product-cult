/**
 * Represents a registered search type.
 * Provides metadata about a category of content that can be searched.
 */
export type SearchType = {
  /**
   * The unique name/identifier for the search type (e.g., 'products', 'articles').
   */
  name: string;
  /**
   * A user-friendly label for the search type (e.g., 'Products', 'Tech Articles').
   */
  label: string;
  /**
   * A brief description of what this search type covers.
   */
  description: string;
};