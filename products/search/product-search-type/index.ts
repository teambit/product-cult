/**
 * Main export for the ProductSearchType Bit component.
 * This component provides the configuration needed to register "products"
 * as a searchable type within the application's search system.
 */
export { default } from './product-search-type.js';

/**
 * The configuration entry for the "products" search type.
 * This object should be registered with the SearchBrowser to enable
 * product-specific search functionalities and UI components.
 * It implements the `SearchTypeComponent` interface from `@infinity/search.search`.
 */
export { productSearchTypeEntry } from './product-search-type.js';

/**
 * Props for the `ProductSearchSpecificUI` component, which is the UI rendered
 * when the "products" search type is active.
 */
export type { ProductSearchSpecificUIProps } from './product-search-specific-ui-props-type.js';