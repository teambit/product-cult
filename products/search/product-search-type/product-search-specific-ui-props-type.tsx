import type { CSSProperties } from 'react';
import type { SearchTypeComponentProps as BaseSearchTypeComponentProps } from '@infinity/search.search';

/**
 * Props for the ProductSearchSpecificUI component.
 * This component is rendered when the 'products' search type is active.
 * It extends the base SearchTypeComponentProps with common styling props.
 */
export type ProductSearchSpecificUIProps = BaseSearchTypeComponentProps & {
  /**
   * Optional custom CSS class name to apply to the root element of the component.
   * Allows for further customization or overrides.
   */
  className?: string;
  /**
   * Optional custom inline styles to apply to the root element of the component.
   * Use sparingly; prefer class names and SCSS modules for styling.
   */
  style?: CSSProperties;
};