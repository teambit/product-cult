import type { SlotRegistry } from '@bitdev/harmony.harmony';
import type { PlainSearchResult } from '@infinity/search.entities.search-result';
import type { ComponentType } from 'react';

/**
 * Props for a SearchResultItem component.
 */
export type SearchResultItemProps = {
  /**
   * The data for the search result item.
   */
  data: PlainSearchResult;
};

export type SearchResultItem = {
  /**
   * name of the item.
   */
  name: string;
  /**
   * The type of search result (e.g., 'product', 'news', 'forum_topic').
   */
  type: string;
  /**
   * The React component to render for this search result item.
   */
  component: ComponentType<SearchResultItemProps>;
};

export type SearchResultItemSlot = SlotRegistry<SearchResultItem[]>;