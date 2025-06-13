/**
 * Represents a single trending search item.
 * This type defines the structure for an individual search term
 * that will be displayed in the trending searches section.
 */
export type TrendingSearchItem = {
  /**
   * The search term string.
   * This will be displayed to the user and used to construct the search query link.
   * For example: "AI Innovations", "Developer Tools", "Web3 Startups".
   */
  term: string;
};