import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { TextInput } from '@infinity/design.inputs.text-input';
import { Button } from '@infinity/design.actions.button';
import { SearchIcon } from '@infinity/search.icons.search-icon';
import styles from './forum-search-component.module.scss';

/**
 * Props for the ForumSearchComponent.
 */
export type ForumSearchComponentProps = {
  /**
   * Optional CSS class name to apply to the root element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root element.
   */
  style?: React.CSSProperties;
};

/**
 * ForumSearchComponent provides a text input and a search button
 * to search for forum topics. On search, it navigates to the
 * main search page, filtering for forum content.
 */
export function ForumSearchComponent({ className, style }: ForumSearchComponentProps): React.JSX.Element {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = (): void => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      // Navigate to the general search page, passing the query and specifying the type as 'forums'
      // to filter for forum topics, as per the SearchResultItem configuration for 'forum-topic'.
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}&type=forums`);
    }
  };

  const handleInputChange = (value: string): void => {
    setQuery(value);
  };

  const isSearchDisabled = !query.trim();

  // Determine icon color based on button state (enabled/disabled for primary appearance)
  const iconColor = isSearchDisabled
    ? 'var(--colors-text-secondary)'  // Color for disabled button text
    : 'var(--colors-text-inverse)';   // Color for enabled primary button text (inverse)

  return (
    <div className={classNames(styles.forumSearchComponent, className)} style={style}>
      <TextInput
        id="forum-search-input"
        placeholder="Search forum topics..."
        value={query}
        onChange={handleInputChange}
        className={styles.searchInput}
        name="forumSearchQuery"
        type="search"
      />
      <Button
        onClick={handleSearch}
        appearance="primary"
        className={styles.searchButton}
        disabled={isSearchDisabled}
        type="button"
      >
        <SearchIcon
          size='var(--sizes-icon-medium)'
          color={iconColor}
          className={styles.searchIconSvg}
        />
        Search Forums
      </Button>
    </div>
  );
}