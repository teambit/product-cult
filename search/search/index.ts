import { SearchAspect } from './search.aspect.js';

export type { SearchNode } from './search.node.runtime.js';
export type { SearchBrowser } from './search.browser.runtime.js';
export type { SearchConfig } from './search-config.js';
export type {
  SearchOptions,
  RegisterSearchTypeOptions,
  IndexContentOptions,
  SearchType,
} from './search-types.js';
export type {
  SearchResultItem,
  SearchResultItemProps,
  SearchResultItemSlot,
} from './search-result-item.js';
export type {
  SearchFilter,
  SearchFilterProps,
  SearchFilterSlot,
} from './search-filter.js';
export type {
  SearchTypeComponent,
  SearchTypeComponentProps,
  SearchTypeComponentSlot,
} from './search-type-component.js';

export default SearchAspect;
export { SearchAspect };