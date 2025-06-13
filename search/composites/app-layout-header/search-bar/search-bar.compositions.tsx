import React from 'react';
import { MemoryRouter, Routes, Route, useLocation, Link as RouterLink } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SearchBar } from './search-bar.js';

const containerStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  backgroundColor: 'var(--colors-surface-background)',
  minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium)',
  fontFamily: 'var(--typography-font-family)',
};

const headingStyle: React.CSSProperties = {
  color: 'var(--colors-text-primary)',
  fontSize: 'var(--typography-sizes-heading-h4)',
  marginBottom: 'var(--spacing-x-small)',
  borderBottom: `1px solid var(--colors-border-subtle)`,
  paddingBottom: `var(--spacing-x-small)`
};

const SearchResultsDisplay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  return (
    <div style={{
      marginTop: 'var(--spacing-medium)',
      padding: 'var(--spacing-medium)',
      border: `1px dashed ${query ? 'var(--colors-status-positive-default)' : 'var(--colors-status-warning-default)'}`,
      backgroundColor: 'var(--colors-surface-primary)',
      borderRadius: 'var(--borders-radius-medium)',
      boxShadow: 'var(--effects-shadows-small)'
    }}>
      <h4 style={{ color: 'var(--colors-text-primary)', marginTop: 0, fontSize: 'var(--typography-sizes-heading-h5)' }}>Mock Search Results Page</h4>
      {query ? (
        <p style={{ color: 'var(--colors-text-secondary)' }}>You searched for: <strong style={{ color: 'var(--colors-text-accent)' }}>{query}</strong></p>
      ) : (
        <p style={{ color: 'var(--colors-text-secondary)' }}>No search query provided.</p>
      )}
      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)' }}>
        Current path: {location.pathname}{location.search}
      </p>
      <RouterLink to="/" style={{color: 'var(--colors-text-accent)', textDecoration: 'none', fontWeight: 'var(--typography-font-weight-medium)'}}>
        &larr; Back to Demo Home
      </RouterLink>
    </div>
  );
};

const DemoHomePage = ({ children }: { children: React.ReactNode }) => (
  <div style={containerStyle}>
    {children}
  </div>
);

export const BasicSearchBar = () => {
  return (
    <MockProvider>
      <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={
              <DemoHomePage>
                <h3 style={headingStyle}>Basic Search Bar</h3>
                <p style={{color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)'}}>
                  Type a query and press Enter or click the search icon.
                </p>
                <SearchBar />
              </DemoHomePage>
            } />
            <Route path="/search" element={<SearchResultsDisplay />} />
          </Routes>
      </MemoryRouter>
    </MockProvider>
  );
};

export const SearchBarWithInitialQueryAndCallback = () => {
  const handleSearch = (query: string) => {
    // eslint-disable-next-line no-alert
    alert(`Search callback triggered for: "${query}". Navigation will proceed.`);
  };

  return (
    <MockProvider>
      <MemoryRouter initialEntries={['/custom-path']}>
          <Routes>
            <Route path="/custom-path" element={
              <DemoHomePage>
                 <h3 style={headingStyle}>Search Bar with Initial Query & Callback</h3>
                 <p style={{color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)'}}>
                  This search bar starts with an "Initial Awesome Product" query and triggers an alert on search.
                </p>
                <SearchBar
                  initialQuery="Initial Awesome Product"
                  onSearch={handleSearch}
                  placeholder="Find amazing things..."
                />
              </DemoHomePage>
            } />
            <Route path="/search" element={<SearchResultsDisplay />} />
          </Routes>
      </MemoryRouter>
    </MockProvider>
  );
};

export const StyledSearchBarInHeaderContext = () => {
    return (
      <MockProvider>
        <MemoryRouter initialEntries={['/']}>
          <div style={{
            backgroundColor: 'var(--colors-primary-default)', // Simulating a header background
            padding: 'var(--spacing-medium)',
            color: 'var(--colors-text-inverse)',
            fontFamily: 'var(--typography-font-family)'
          }}>
            <h3 style={{...headingStyle, color: 'var(--colors-text-inverse)', borderBottomColor: 'rgba(255,255,255,0.3)'}}>
              Search Bar in a Custom Header
            </h3>
            <p style={{fontSize: 'var(--typography-sizes-body-small)', opacity: 0.8, marginBottom: 'var(--spacing-medium)'}}>
              Example of `SearchBar` with custom classes for a dark header context.
            </p>
            <SearchBar
              className="header-custom-search-bar"
              placeholder="Search in header..."
            />
            <style>{`
              .header-custom-search-bar {
                background-color: rgba(255, 255, 255, 0.15);
                border-color: rgba(255, 255, 255, 0.3);
                border-radius: var(--borders-radius-pill); /* Pill shape */
              }
              .header-custom-search-bar:focus-within {
                border-color: var(--colors-text-inverse);
                box-shadow: 0 0 0 2px var(--colors-text-inverse);
              }
              .header-custom-search-bar .searchInput { /* Targeting generated class name */
                color: var(--colors-text-inverse);
              }
              .header-custom-search-bar .searchInput::placeholder {
                color: var(--colors-text-inverse);
                opacity: 0.7;
              }
              .header-custom-search-bar .searchButton {
                background-color: var(--colors-secondary-default); /* Using secondary for contrast on primary bg */
                color: var(--colors-text-inverse) !important; /* Ensure icon color */
              }
              .header-custom-search-bar .searchButton:hover {
                background-color: var(--colors-secondary-hover);
              }
              .header-custom-search-bar .searchIconSvg {
                 fill: var(--colors-text-inverse) !important;
              }
            `}</style>
             <Routes>
              <Route path="/search" element={<SearchResultsDisplay />} />
              <Route path="/" element={<div />} /> {/* Placeholder for root if navigation occurs from here */}
            </Routes>
          </div>
        </MemoryRouter>
      </MockProvider>
    );
  };