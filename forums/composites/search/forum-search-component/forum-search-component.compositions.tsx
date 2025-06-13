import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ForumSearchComponent } from './forum-search-component.js';

const MockSearchResultsDisplay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q');
  const type = queryParams.get('type');

  if (location.pathname === '/search' && q) {
    return (
      <div style={{
        marginTop: 'var(--spacing-medium)',
        padding: 'var(--spacing-medium)',
        border: '1px dashed var(--colors-border-default)',
        borderRadius: 'var(--borders-radius-medium)',
        backgroundColor: 'var(--colors-surface-secondary)',
        color: 'var(--colors-text-primary)',
        fontFamily: 'var(--typography-font-family)',
        textAlign: 'left',
      }}>
        <h4 style={{ marginTop: 0, color: 'var(--colors-text-accent)' }}>Mock Search Navigation Target</h4>
        <p>Navigated to: <strong>{location.pathname}</strong></p>
        <p>Search Query (q): <strong>{q}</strong></p>
        <p>Content Type (type): <strong>{type}</strong></p>
        <Link to="/" style={{ color: 'var(--colors-text-accent)', textDecoration: 'underline' }}>
          &larr; Back to Search Form
        </Link>
      </div>
    );
  }
  return (
    <div style={{
        marginTop: 'var(--spacing-medium)',
        padding: 'var(--spacing-small)',
        color: 'var(--colors-text-secondary)',
        fontFamily: 'var(--typography-font-family)',
        textAlign: 'center',
        fontSize: 'var(--typography-sizes-body-small)',
        border: '1px dotted var(--colors-border-subtle)',
        borderRadius: 'var(--borders-radius-small)'
    }}>
        <em>Enter a search term in the component above and click "Search Forums" to see navigation details here.</em>
        <p style={{marginTop: 'var(--spacing-x-small)'}}>Current Path: {location.pathname}</p>
    </div>
  );
};

const SearchPageLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    padding: 'var(--spacing-large)',
    maxWidth: '800px',
    margin: 'var(--spacing-large) auto',
    fontFamily: 'var(--typography-font-family)',
    backgroundColor: 'var(--colors-surface-background)',
    minHeight: '300px', // Ensure some height
  }}>
    <h2 style={{
      textAlign: 'center',
      color: 'var(--colors-text-primary)',
      fontSize: 'var(--typography-sizes-heading-h3)',
      marginBottom: 'var(--spacing-large)'
    }}>
      Forum Topic Search
    </h2>
    {children}
    <MockSearchResultsDisplay />
  </div>
);

export const BasicForumSearch = () => {
  return (
    <MockProvider>
      <Routes>
        <Route path="/" element={
          <SearchPageLayout>
            <ForumSearchComponent />
          </SearchPageLayout>
        } />
        <Route path="/search" element={
           <SearchPageLayout>
            <p style={{
                textAlign: 'center',
                padding: 'var(--spacing-medium)',
                backgroundColor: 'var(--colors-status-positive-subtle)',
                color: 'var(--colors-status-positive-default)',
                borderRadius: 'var(--borders-radius-medium)',
                border: `1px solid var(--colors-status-positive-default)`
            }}>
                You've landed on the search results area. See details below.
            </p>
           </SearchPageLayout>
        } />
      </Routes>
    </MockProvider>
  );
};

export const ForumSearchWithCustomStyling = () => {
  const customStyles = `
    .custom-forum-search-wrapper {
      padding: var(--spacing-large);
      background-color: var(--colors-surface-secondary);
      border-radius: var(--borders-radius-large);
      box-shadow: var(--effects-shadows-large);
    }
    .custom-styled-forum-search {
      border: 2px solid var(--colors-primary-default);
      padding: var(--spacing-medium); /* Adjust padding if needed */
    }
    .custom-styled-forum-search .searchInput input { /* Target the actual input */
      background-color: var(--colors-surface-background);
      font-style: italic;
    }
    .custom-styled-forum-search .searchButton {
      background-image: var(--effects-gradients-primary);
      border-color: transparent;
      font-weight: var(--typography-font-weight-bold);
    }
    .custom-styled-forum-search .searchButton:hover:not(:disabled) {
      opacity: 0.85;
      box-shadow: var(--effects-shadows-primary);
    }
  `;

  return (
    <MockProvider>
      <style>{customStyles}</style>
      <Routes>
        <Route path="/" element={
          <SearchPageLayout>
            <div className="custom-forum-search-wrapper">
              <h3 style={{
                textAlign: 'center',
                color: 'var(--colors-text-primary)',
                fontSize: 'var(--typography-sizes-heading-h5)',
                marginBottom: 'var(--spacing-medium)'
              }}>
                Custom Styled Search
              </h3>
              <ForumSearchComponent
                className="custom-styled-forum-search"
                style={{
                  boxShadow: '0 0 0 3px var(--colors-secondary-default)',
                  borderRadius: 'var(--borders-radius-medium)'
                }}
              />
            </div>
          </SearchPageLayout>
        } />
         <Route path="/search" element={
           <SearchPageLayout>
             <p style={{
                textAlign: 'center',
                padding: 'var(--spacing-medium)',
                backgroundColor: 'var(--colors-status-info-subtle)',
                color: 'var(--colors-status-info-default)',
                borderRadius: 'var(--borders-radius-medium)',
                border: `1px solid var(--colors-status-info-default)`
             }}>
                Navigated from custom styled search. Details below.
            </p>
           </SearchPageLayout>
        } />
      </Routes>
    </MockProvider>
  );
};