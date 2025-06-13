import React from 'react';
import { MemoryRouter, Routes, Route, Outlet } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { Link, useLocation, useParams, useNavigate, useSearchQuery } from './link.js';

// Helper component to display hook information using hooks re-exported by link.js
const RouteInfoDisplay = () => {
  const location = useLocation(); // Hook re-exported from link.js
  const params = useParams(); // Hook re-exported from link.js
  const [searchParams] = useSearchQuery(); // Hook re-exported from link.js
  const navigate = useNavigate(); // Hook re-exported from link.js

  return (
    <div style={{
      marginTop: 'var(--spacing-medium)',
      padding: 'var(--spacing-medium)',
      backgroundColor: 'var(--colors-surface-secondary)',
      border: '1px solid var(--colors-border-default)',
      borderRadius: 'var(--borders-radius-medium)',
      fontFamily: 'var(--typography-font-family)',
      fontSize: 'var(--typography-sizes-body-small)',
      color: 'var(--colors-text-secondary)',
      maxWidth: '600px',
      boxShadow: 'var(--effects-shadows-small)'
    }}>
      <h4 style={{ color: 'var(--colors-text-primary)', marginTop: 0, marginBottom: 'var(--spacing-small)', fontSize: 'var(--typography-sizes-heading-h5)' }}>React Router Hooks Info (from Link component exports):</h4>
      <p><strong>Current Path (useLocation):</strong> {location.pathname}</p>
      <p><strong>URL Params (useParams):</strong> {Object.keys(params).length > 0 ? JSON.stringify(params) : 'No parameters'}</p>
      <p><strong>Search Query (useSearchQuery):</strong> {searchParams.toString() || 'No query string'}</p>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: 'var(--spacing-small)',
          padding: 'var(--spacing-x-small) var(--spacing-small)',
          backgroundColor: 'var(--colors-secondary-default)',
          color: 'var(--colors-text-inverse)',
          border: 'none',
          borderRadius: 'var(--borders-radius-small)',
          cursor: 'var(--interactions-cursor-pointer)',
          fontSize: 'var(--typography-sizes-button-small)',
          fontWeight: 'var(--typography-font-weight-medium)'
        }}
      >
        Go Back (via useNavigate)
      </button>
    </div>
  );
};

// Dummy page components for routing demonstration
const HomePage = () => <h3 style={{ color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h4)' }}>Product Hunt Home Page</h3>;

const ProductsPage = () => (
  <div>
    <h3 style={{ color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h4)' }}>Products Listing</h3>
    <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-default)' }}>Explore the latest tech products and innovations.</p>
    <RouteInfoDisplay />
  </div>
);

const ProductDetailsPage = () => (
  <div>
    <h3 style={{ color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h4)' }}>Product Details</h3>
    <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-default)' }}>Detailed view of a selected product.</p>
    <RouteInfoDisplay />
  </div>
);

const NewsPage = () => (
  <div>
    <h3 style={{ color: 'var(--colors-text-primary)', fontSize: 'var(--typography-sizes-heading-h4)' }}>Tech News & Launches</h3>
    <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-default)' }}>Stay updated with the latest launches and industry news.</p>
    <RouteInfoDisplay />
  </div>
);

const commonWrapperStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  fontFamily: 'var(--typography-font-family)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium)',
  backgroundColor: 'var(--colors-surface-background)',
  minHeight: '250px', // Adjusted for better viewing
  color: 'var(--colors-text-primary)'
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--spacing-medium)',
  alignItems: 'center',
  paddingBottom: 'var(--spacing-medium)',
  borderBottom: `1px solid var(--colors-border-subtle)`,
  marginBottom: 'var(--spacing-medium)',
  flexWrap: 'wrap'
};

const pageContentStyle: React.CSSProperties = {
    marginTop: 'var(--spacing-medium)',
    padding: 'var(--spacing-medium)',
    backgroundColor: 'var(--colors-surface-primary)',
    borderRadius: 'var(--borders-radius-medium)',
    boxShadow: 'var(--effects-shadows-medium)'
};

export const InternalNavigationLinks = () => (
  <MemoryRouter initialEntries={['/']}>
    <InfinityTheme>
      <div style={commonWrapperStyle}>
        <h2 style={{ fontSize: 'var(--typography-sizes-heading-h3)', margin: '0 0 var(--spacing-small) 0' }}>Internal Navigation & Hooks Demo</h2>
        <nav style={navStyle}>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/products/awesome-ai-tool-42?source=featured&utm_campaign=q1_promo">Product Detail Example</Link>
          <Link href="/news">News</Link>
        </nav>
        <div style={pageContentStyle}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Outlet />}>
              <Route index element={<ProductsPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </div>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);

export const ExternalLinksShowcase = () => (
  <InfinityTheme>
    <div style={commonWrapperStyle}>
      <h2 style={{ fontSize: 'var(--typography-sizes-heading-h3)', margin: '0 0 var(--spacing-small) 0' }}>External Links</h2>
      <Link href="https://www.producthunt.com" external>
        Visit Product Hunt (opens in new tab by default)
      </Link>
      <Link href="https://bit.dev" external target="_self">
        Explore Bit.dev (opens in same tab)
      </Link>
      <Link href="https://example.com" external rel="nofollow noopener">
        Example.com (custom rel: nofollow noopener)
      </Link>
      <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)', marginTop: 'var(--spacing-small)'}}>
        External links automatically open in a new tab with 'noopener noreferrer' unless 'target' and 'rel' are specified.
      </p>
    </div>
  </InfinityTheme>
);

export const LinkWithCustomLogic = () => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); 
    // eslint-disable-next-line no-alert
    alert('Custom click logic executed! Navigation to "/launches" was prevented.');
  };

  return (
    <MemoryRouter>
      <InfinityTheme>
        <div style={commonWrapperStyle}>
          <h2 style={{ fontSize: 'var(--typography-sizes-heading-h3)', margin: '0 0 var(--spacing-small) 0' }}>Link with Custom Click Logic</h2>
          <Link href="/launches" onClick={handleClick}>
            View Upcoming Launches (with custom click handler)
          </Link>
          <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)', marginTop: 'var(--spacing-small)'}}>
            This link utilizes the 'onClick' prop to execute custom JavaScript before (or instead of) navigating.
            In this case, default navigation is prevented.
          </p>
        </div>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const StyledLinkExample = () => (
  <MemoryRouter>
    <InfinityTheme>
      <style>{`
        .custom-styled-link-primary {
          font-size: var(--typography-sizes-button-medium); /* Use button size for a more button-like appearance */
          font-weight: var(--typography-font-weight-semiBold);
          color: var(--colors-text-inverse) !important; /* Ensure text is inverse on primary background */
          background-color: var(--colors-primary-default);
          padding: var(--spacing-small) var(--spacing-medium);
          border-radius: var(--borders-radius-medium);
          text-decoration: none; /* Ensure no underline from browser defaults */
          display: inline-block; /* Allows padding and behaves better */
          transition: background-color var(--interactions-transitions-duration-fast) var(--interactions-transitions-easing-ease-in-out);
        }
        .custom-styled-link-primary:hover {
          background-color: var(--colors-primary-hover);
          color: var(--colors-text-inverse) !important;
          text-decoration: none;
        }
        .custom-styled-link-primary:active {
          background-color: var(--colors-primary-active);
        }
        .custom-styled-link-primary:focus-visible {
          outline: var(--borders-focus-width) var(--borders-focus-style) var(--colors-border-focus);
          outline-offset: var(--borders-focus-offset);
        }

        .custom-styled-link-secondary {
            font-size: var(--typography-sizes-body-large);
            font-weight: var(--typography-font-weight-bold);
            color: var(--colors-secondary-default);
            padding: var(--spacing-x-small) 0; /* Minimal padding for a more subtle link */
            border-bottom: 2px solid transparent; /* For hover effect */
            transition: color var(--interactions-transitions-duration-fast), border-color var(--interactions-transitions-duration-fast);
        }
        .custom-styled-link-secondary:hover {
            color: var(--colors-secondary-hover);
            border-bottom-color: var(--colors-secondary-hover);
            text-decoration: none;
        }
        .custom-styled-link-secondary:focus-visible {
            outline-color: var(--colors-secondary-active); /* Focus outline uses secondary color */
        }
      `}</style>
      <div style={commonWrapperStyle}>
        <h2 style={{ fontSize: 'var(--typography-sizes-heading-h3)', margin: '0 0 var(--spacing-small) 0' }}>Custom Styled Links</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--spacing-medium)'}}>
            <Link href="/submit-product" className="custom-styled-link-primary">
            Submit Your Product
            </Link>
            <Link href="https://community.example.com" external className="custom-styled-link-secondary">
            Join Community Forum
            </Link>
        </div>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--typography-sizes-body-small)', marginTop: 'var(--spacing-medium)'}}>
          These links use custom CSS classes via the 'className' prop to achieve different visual appearances,
          showcasing integration with custom stylesheets or utility classes.
        </p>
      </div>
    </InfinityTheme>
  </MemoryRouter>
);