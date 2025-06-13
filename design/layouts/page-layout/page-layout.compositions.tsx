import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InfinityTheme } from '@infinity/design.infinity-theme';
import { PageLayout } from './page-layout.js';

const MockHeader = () => (
  <div style={{
    backgroundColor: 'var(--colors-surface-primary)',
    color: 'var(--colors-text-primary)',
    padding: 'var(--spacing-medium) var(--layout-container-padding)',
    borderBottom: `var(--borders-default-width) var(--borders-default-style) var(--colors-border-default)`,
    fontFamily: 'var(--typography-font-family)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px', // Typical header height
  }}>
    <span style={{ fontSize: 'var(--typography-sizes-heading-h5)', fontWeight: 'var(--typography-font-weight-bold)'}}>ProductDiscovery Platform</span>
    <nav style={{ display: 'flex', gap: 'var(--spacing-medium)'}}>
      <a href="#products" style={{ color: 'var(--colors-text-accent)', textDecoration: 'none', fontSize: 'var(--typography-sizes-body-default)'}}>Products</a>
      <a href="#launches" style={{ color: 'var(--colors-text-accent)', textDecoration: 'none', fontSize: 'var(--typography-sizes-body-default)'}}>Launches</a>
      <a href="#community" style={{ color: 'var(--colors-text-accent)', textDecoration: 'none', fontSize: 'var(--typography-sizes-body-default)'}}>Community</a>
    </nav>
  </div>
);

const MockFooter = () => (
  <div style={{
    backgroundColor: 'var(--colors-surface-secondary)',
    color: 'var(--colors-text-secondary)',
    padding: 'var(--spacing-large) var(--layout-container-padding)',
    borderTop: `var(--borders-default-width) var(--borders-default-style) var(--colors-border-default)`,
    textAlign: 'center',
    fontFamily: 'var(--typography-font-family)',
    fontSize: 'var(--typography-sizes-body-small)'
  }}>
    © {new Date().getFullYear()} ProductDiscovery Inc. All rights reserved.
    <div style={{ marginTop: 'var(--spacing-x-small)'}}>
      <a href="#about" style={{ color: 'var(--colors-text-secondary)', marginRight: 'var(--spacing-small)'}}>About</a>
      <a href="#privacy" style={{ color: 'var(--colors-text-secondary)', marginRight: 'var(--spacing-small)'}}>Privacy Policy</a>
      <a href="#contact" style={{ color: 'var(--colors-text-secondary)'}}>Contact Us</a>
    </div>
  </div>
);

const MockProductCard = ({ name, tagline, upvotes }: { name: string, tagline: string, upvotes: number }) => (
  <div style={{
    backgroundColor: 'var(--colors-surface-primary)',
    padding: 'var(--spacing-medium)',
    borderRadius: 'var(--borders-radius-medium)',
    boxShadow: 'var(--effects-shadows-small)',
    marginBottom: 'var(--spacing-medium)',
    border: `1px solid var(--colors-border-subtle)`,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-small)'
  }}>
    <h3 style={{
      fontFamily: 'var(--typography-font-family)',
      fontSize: 'var(--typography-sizes-heading-h4)',
      color: 'var(--colors-text-primary)',
      margin: 0
    }}>{name}</h3>
    <p style={{
      fontFamily: 'var(--typography-font-family)',
      fontSize: 'var(--typography-sizes-body-default)',
      color: 'var(--colors-text-secondary)',
      margin: 0,
      lineHeight: 'var(--typography-line-height-base)'
    }}>{tagline}</p>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--spacing-small)'}}>
      <span style={{ fontSize: 'var(--typography-sizes-body-small)', color: 'var(--colors-text-secondary)'}}>Upvotes: {upvotes}</span>
      <button style={{
        backgroundColor: 'var(--colors-primary-default)',
        color: 'var(--colors-text-inverse)',
        padding: 'var(--spacing-x-small) var(--spacing-medium)',
        border: 'none',
        borderRadius: 'var(--borders-radius-pill)',
        cursor: 'var(--interactions-cursor-pointer)',
        fontSize: 'var(--typography-sizes-button-small)',
        fontWeight: 'var(--typography-font-weight-medium)',
        fontFamily: 'var(--typography-font-family)',
      }}>
        View Details
      </button>
    </div>
  </div>
);

const MockMainContent = ({ title }: { title: string }) => (
  <div style={{ fontFamily: 'var(--typography-font-family)'}}>
    <h1 style={{
      fontSize: 'var(--typography-sizes-display-small)',
      color: 'var(--colors-text-primary)',
      marginBottom: 'var(--spacing-large)',
      fontWeight: 'var(--typography-font-weight-bold)'
    }}>{title}</h1>
    <MockProductCard name="AI LaunchPad" tagline="Discover the latest AI-powered tools and SaaS products, launched daily." upvotes={1250} />
    <MockProductCard name="DevFlow UI Kit" tagline="A comprehensive UI kit to speed up your development workflow." upvotes={870} />
    <MockProductCard name="CommunityConnect" tagline="The new platform for tech makers and enthusiasts to collaborate." upvotes={640} />
     <MockProductCard name="EcoTracker App" tagline="Monitor and reduce your carbon footprint with our smart app." upvotes={450} />
  </div>
);


export const BasicPageLayout = () => {
  return (
    <MemoryRouter>
      <InfinityTheme>
        <PageLayout
          header={<MockHeader />}
          footer={<MockFooter />}
          title="Product Showcase - ProductDiscovery"
          metaDescription="Explore the latest and most innovative products on ProductDiscovery."
        >
          <MockMainContent title="Today's Top Products" />
        </PageLayout>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const PageLayoutWithCustomTitleAndMeta = () => {
  return (
    <MemoryRouter>
      <InfinityTheme>
        <PageLayout
          header={<MockHeader />}
          footer={<MockFooter />}
          title="Featured Launches | Week of Oct 26 - ProductDiscovery"
          metaDescription="Check out the featured product launches for this week. Don't miss the next big thing!"
        >
          <MockMainContent title="Weekly Featured Launches" />
        </PageLayout>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const PageLayoutOnlyContent = () => {
  return (
    <MemoryRouter>
      <InfinityTheme>
        <PageLayout
          title="Minimal Product View - ProductDiscovery"
          metaDescription="A minimal view focusing only on product content."
        >
          <MockMainContent title="Just the Products" />
        </PageLayout>
      </InfinityTheme>
    </MemoryRouter>
  );
};

export const PageLayoutWithLongContent = () => {
  return (
    <MemoryRouter>
      <InfinityTheme>
        <PageLayout
          header={<MockHeader />}
          footer={<MockFooter />}
          title="Deep Dive: AI LaunchPad - ProductDiscovery"
          metaDescription="An in-depth look at AI LaunchPad, its features, and community reviews."
        >
          <MockMainContent title="Deep Dive: AI LaunchPad Analysis" />
          <p style={{ fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-secondary)', lineHeight: 'var(--typography-line-height-relaxed)', fontSize: 'var(--typography-sizes-body-large)', marginTop: 'var(--spacing-large)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </PageLayout>
      </InfinityTheme>
    </MemoryRouter>
  );
};