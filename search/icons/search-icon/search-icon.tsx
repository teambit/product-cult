import React from 'react';
import { Icon, type BaseIconProps } from '@infinity/design.content.icon';

// SVG path data for a standard search icon
const SearchSvgPath: React.FC = () => (
  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
);

/**
 * Props for the SearchIcon component.
 * These properties are derived from BaseIconProps, providing a consistent API
 * for size, color, accessibility (title), and event handling.
 */
export type SearchIconProps = BaseIconProps;

/**
 * SearchIcon component.
 * Renders a universally recognizable search (magnifying glass) SVG icon.
 * This component is built upon the generic Icon component from the @infinity/design.content.icon package,
 * inheriting its base styling, accessibility features, and event handling capabilities.
 * It provides a default title "Search" for accessibility, which can be overridden.
 * The icon's visual representation is fixed to the standard search symbol.
 *
 * @param props - The properties for the SearchIcon component. Conforms to SearchIconProps (which is BaseIconProps).
 *                Includes optional properties like size, color, className, style, onClick, and title.
 */
export const SearchIcon: React.FC<SearchIconProps> = ({
  title = 'Search', // Default accessible title for the search icon. Can be overridden by the user.
  ...baseProps // Collects other BaseIconProps such as size, color, className, style, onClick.
}) => {
  return (
    <Icon
      {...baseProps} // Spreads base properties (size, color, className, style, onClick) to the generic Icon component.
      title={title} // Passes the resolved title (either user-provided or the default "Search") to the Icon.
      viewBox="0 0 24 24" // Sets the specific SVG viewBox for this search icon, ensuring correct rendering.
    >
      <SearchSvgPath />
    </Icon>
  );
};