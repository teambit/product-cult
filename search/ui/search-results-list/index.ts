/**
 * This index file serves as the public API for the search-results-list component.
 * It exports the main SearchResultsList component and its associated props type.
 */

export { SearchResultsList } from './search-results-list.js';
export type { SearchResultsListProps } from './search-results-list.js';

// Re-exporting PlainSearchResult for convenience if consumers need to type their data
// This is useful if the SearchResult entity is central to search interactions.
export type { PlainSearchResult } from '@infinity/search.entities.search-result';