import React, { useState, useMemo } from 'react';
import { PageLayout } from '@infinity/design.layouts.page-layout';
import { Heading } from '@infinity/design.typography.heading';
import { ForumList } from '@infinity/forums.ui.forum-list';
import { useListForums, ListForumsOptions } from '@infinity/forums.hooks.use-forums';
import { Forum } from '@infinity/forums.entities.forum';
import styles from './forums-page.module.scss';
import { SearchIcon } from './search-icon.js';

const DEFAULT_FORUMS_LIMIT = 10;

/**
 * Props for the ForumsPage component.
 */
export type ForumsPageProps = {
  /**
   * Optional custom CSS class name to apply to the root PageLayout element.
   */
  className?: string;
  /**
   * Optional inline styles to apply to the root content div of the ForumsPage.
   */
  style?: React.CSSProperties;
  /**
   * The title to display on the page.
   * Defaults to 'Explore Forums'.
   */
  pageTitle?: string;
  /**
   * Optional mock data for forums. If provided, the component will use this data
   * instead of fetching from the backend. Useful for testing or development.
   * Search will be performed client-side on this mock data.
   */
  mockForumsData?: Forum[];
};

/**
 * ForumsPage component displays a list of forums with search functionality.
 * It utilizes PageLayout for consistent page structure and fetches forum data
 * using the useListForums hook or uses provided mock data.
 */
export const ForumsPage = ({
  className,
  style,
  pageTitle = 'Explore Forums',
  mockForumsData,
}: ForumsPageProps): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // queryOptions for the useListForums hook, only used if mockForumsData is NOT provided.
  // This search term is for backend search.
  const hookQueryOptions = useMemo((): ListForumsOptions => ({
    search: searchTerm,
    limit: DEFAULT_FORUMS_LIMIT,
    // offset: 0, // Basic implementation, no pagination yet
  }), [searchTerm]);

  const {
    forums: forumsFromHook,
    loading: hookLoading,
    error: hookError,
  } = useListForums({
    // Only pass queryOptions to the hook if we are not using mockData.
    // If mockData is used, the hook will prioritize it.
    queryOptions: mockForumsData ? undefined : hookQueryOptions,
    mockData: mockForumsData,
  });

  // Determine the actual list of forums to display.
  // If mockForumsData is provided, filter it client-side using the local searchTerm.
  // Otherwise, use forumsFromHook (which would have been backend-filtered if searchTerm was passed via hookQueryOptions).
  const displayedForums = useMemo(() => {
    if (mockForumsData) {
      if (!searchTerm.trim()) {
        return mockForumsData; // No client-side search term, show all mock data
      }
      // Client-side filter for mock data (case-insensitive search in name and description)
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return mockForumsData.filter(forum =>
        forum.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        forum.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return forumsFromHook; // Use data from hook (already backend-filtered or full list if no backend search)
  }, [mockForumsData, forumsFromHook, searchTerm]);

  // isLoading should only be true if we are actually fetching from backend (i.e., not using mockForumsData)
  const isLoading = mockForumsData ? false : hookLoading;
  // Error state is primarily relevant for backend fetches.
  const error = mockForumsData ? undefined : hookError;


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.messageContainer}>
          <div className={styles.loadingSpinner} />
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.messageContainer}>
          <p>Error loading forums: {error.message}. Please try again later.</p>
        </div>
      );
    }

    if (displayedForums && displayedForums.length > 0) {
      return (
        <div className={styles.forumListWrapper}>
          <ForumList mockForumsData={displayedForums} />
        </div>
      );
    }

    // If there was a search term (client or backend) and results are empty
    if (searchTerm.trim() && (!displayedForums || displayedForums.length === 0)) {
      return (
        <div className={styles.messageContainer}>
          <p>No forums found matching your search for &apos;{searchTerm}&apos;.</p>
        </div>
      );
    }
    
    // Default empty state: no search term, and no forums (initial load from backend returned empty, or mockData was empty)
    // ForumList component has its own "no forums available" message when given an empty list.
    return (
      <div className={styles.forumListWrapper}>
        <ForumList mockForumsData={[]} />
      </div>
    );
  };

  return (
    <PageLayout
      title={pageTitle}
      className={className}
    >
      <div className={styles.forumsPage} style={style}>
        <Heading level={1}>{pageTitle}</Heading>

        <div className={styles.searchBarContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search forums..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
            aria-label="Search forums"
          />
        </div>
        {renderContent()}
      </div>
    </PageLayout>
  );
};