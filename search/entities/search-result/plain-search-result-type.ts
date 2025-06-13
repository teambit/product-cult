/**
 * Represents the plain object structure for a search result.
 * This type is used for serialization and deserialization of SearchResult entities.
 */
export type PlainSearchResult = {
  /**
   * Unique identifier for the search result.
   */
  id: string;

  /**
   * Title of the search result.
   */
  title: string;

  /**
   * Description of the search result.
   */
  description: string;

  /**
   * URL of an image associated with the search result. Optional.
   * Corresponds to 'image' in the user prompt.
   */
  imageUrl?: string;

  /**
   * The type of content, e.g., 'product', 'article', 'user'.
   * Corresponds to 'contentType' in the user prompt.
   */
  type: string;

  /**
   * Additional data associated with the search result.
   * This can include properties like a direct URL to the content, or other type-specific details.
   */
  data: Record<string, any>;
};