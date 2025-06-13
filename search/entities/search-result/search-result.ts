import type { PlainSearchResult } from './plain-search-result-type.js';

/**
 * Represents a search result entity.
 * Encapsulates properties such as title, description, image URL, and content type.
 */
export class SearchResult {
  /**
   * Creates an instance of SearchResult.
   * @param id Unique identifier for the search result.
   * @param title Title of the search result.
   * @param description Description of the search result.
   * @param type The type of content (e.g., 'product', 'article').
   * @param data Additional data associated with the search result, like a URL.
   * @param imageUrl Optional URL of an image associated with the search result.
   */
  constructor(
    /**
     * Unique identifier for the search result.
     */
    public readonly id: string,

    /**
     * Title of the search result.
     */
    public readonly title: string,

    /**
     * Description of the search result.
     */
    public readonly description: string,

    /**
     * The type of content (e.g., 'product', 'article').
     * This helps in categorizing and displaying the search result appropriately.
     */
    public readonly type: string,

    /**
     * A flexible record to store any additional data relevant to the search result.
     * For example, this could include a direct URL to the item, author information, or specific metrics.
     */
    public readonly data: Record<string, any>,

    /**
     * Optional URL of an image associated with the search result.
     * This image can be used for display purposes in search result listings.
     */
    public readonly imageUrl?: string
  ) {}

  /**
   * Serializes the SearchResult instance into a plain JavaScript object.
   * This is useful for transferring the data or storing it.
   * @returns A plain object representation of the SearchResult.
   */
  toObject(): PlainSearchResult {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      type: this.type,
      data: this.data,
    };
  }

  /**
   * Creates a SearchResult instance from a plain JavaScript object.
   * This is useful for deserializing data received from an API or storage.
   * Properties from the plain object are destructured safely.
   * @param plainSearchResult The plain object to convert into a SearchResult instance.
   * @returns A new instance of SearchResult.
   */
  static from(plainSearchResult: PlainSearchResult): SearchResult {
    const {
      id,
      title,
      description,
      imageUrl,
      type,
      data = {}, // Default to empty object if data is undefined
    } = plainSearchResult;

    return new SearchResult(
      id,
      title,
      description,
      type,
      data,
      imageUrl
    );
  }
}