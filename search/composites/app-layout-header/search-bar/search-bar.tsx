import React, { useState } from 'react';
import { useNavigate } from '@infinity/design.navigation.link';
import { TextInput } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import { SearchIcon } from '@infinity/search.icons.search-icon';
import classNames from 'classnames';
import styles from './search-bar.module.scss';

export type SearchBarProps = {
  /**
   * An optional CSS class name to apply to the root element of the search bar.
   * This allows for custom styling or overrides.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the search bar's root element.
   * Use sparingly; prefer `className` and SCSS modules for styling.
   */
  style?: React.CSSProperties;
  /**
   * Optional callback function triggered when a search is initiated.
   * Receives the search query as an argument.
   * This is called before navigation occurs.
   */
  onSearch?: (query: string) => void;
  /**
   * Optional initial value for the search input field.
   * Defaults to an empty string.
   */
  initialQuery?: string;
  /**
   * Placeholder text for the search input.
   * Defaults to 'Search products, news, and more...'.
   */
  placeholder?: string;
};

/**
 * SearchBar is a composite component enabling users to input search queries.
 * It includes a text input and a search button, navigating to the '/search' page with the query.
 */
export function SearchBar({
  className,
  style,
  onSearch,
  initialQuery = '',
  placeholder = 'Search products, news, and more...',
}: SearchBarProps): React.JSX.Element {
  const [query, setQuery] = useState<string>(initialQuery);
  const navigate = useNavigate();

  const handlePerformSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      if (onSearch) {
        onSearch(trimmedQuery);
      }
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlePerformSearch();
  };

  return (
    <form
      className={classNames(styles.searchBarContainer, className)}
      style={style}
      role="search"
      onSubmit={handleSubmit}
    >
      <TextInput
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={styles.searchInput}
        aria-label="Search query input"
        type="search"
      />
      <Button
        appearance="primary"
        type="submit"
        className={styles.searchButton}
        aria-label="Submit search query"
      >
        <SearchIcon title="Initiate search" className={styles.searchIconSvg} />
      </Button>
    </form>
  );
}