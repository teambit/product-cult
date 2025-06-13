import React from 'react';
import type { ComponentType } from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Link } from '@infinity/design.navigation.link';
import { Header } from './header.js';
import type { HeaderLinkType } from './header-link-type.js';

// --- Icon Components (mocked for simplicity) ---
const ProductsIcon = ({ className, size = 16 }: { className?: string; size?: number | string; }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
    <path d="M3 6h18"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const LaunchesIcon = ({ className, size = 16 }: { className?: string; size?: number | string; }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4.5 19.5l15-15"/>
    <path d="M21 4.5V9h-4.5"/>
    <path d="M11.5 2.5h10v10H19L11.5 2.5z"/>
    <path d="M12.5 11.5L21.5 12l-10 10-1.5-7.5 3.5-3.5Z"/>
  </svg>
);

const NewsIcon = ({ className, size = 16 }: { className?: string; size?: number | string; }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2Z"></path>
    <path d="M4 9h16"></path><path d="M4 15h16"></path><path d="M10 3v18"></path>
  </svg>
);

const CommunityIcon = ({ className, size = 16 }: { className?: string; size?: number | string; }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

// --- Action Components ---
const LoginButtonAction = () => (
  <Link 
    href="/login" 
    style={{ 
      padding: 'var(--spacing-x-small) var(--spacing-small)', 
      textDecoration: 'none',
      color: 'var(--colors-text-accent)',
      border: '1px solid var(--colors-border-subtle)',
      borderRadius: 'var(--borders-radius-medium)',
    }}
  >
    Login
  </Link>
);

const SignupButtonAction = () => (
  <button
    style={{
      padding: 'var(--spacing-x-small) var(--spacing-medium)',
      backgroundColor: 'var(--colors-primary-default)',
      color: 'var(--colors-text-inverse) !important',
      border: 'none',
      borderRadius: 'var(--borders-radius-medium)',
      cursor: 'var(--interactions-cursor-pointer)',
      fontSize: 'var(--typography-sizes-button-small)',
      fontWeight: 'var(--typography-font-weight-medium)',
    }}
  >
    Sign Up
  </button>
);

const SubmitProductAction = () => (
  <button
    style={{
      padding: 'var(--spacing-x-small) var(--spacing-medium)',
      backgroundColor: 'var(--colors-secondary-default)',
      color: 'var(--colors-text-inverse) !important',
      border: 'none',
      borderRadius: 'var(--borders-radius-medium)',
      cursor: 'var(--interactions-cursor-pointer)',
      fontSize: 'var(--typography-sizes-button-small)',
      fontWeight: 'var(--typography-font-weight-medium)',
    }}
  >
    Post a Product
  </button>
);

const UserProfileBadge = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x-small)', cursor: 'var(--interactions-cursor-pointer)'}}>
        <img 
          src="https://images.unsplash.com/photo-1646766361123-a3103dc2eb00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbiUyMHByb2R1Y3QlMjBsYXVuY2h8ZW58MXwwfHxibGFja3wxNzQ5NTk5MjYwfDA&ixlib=rb-4.1.0&q=80&w=200"
          alt="User Avatar" 
          style={{ width: '32px', height: '32px', borderRadius: 'var(--borders-radius-circle)', objectFit: 'cover'}} 
        />
    </div>
);


// --- Compositions ---

export const BasicProductHuntHeader = () => {
  const navLinks: HeaderLinkType[] = [
    { label: 'Products', href: '/products', icon: ProductsIcon },
    { label: 'Launches', href: '/launches', icon: LaunchesIcon },
    { label: 'News', href: '/news', icon: NewsIcon },
    { label: 'Community', href: 'https://community.producthunt.com', external: true, icon: CommunityIcon },
  ];

  const actions: ComponentType<any>[] = [LoginButtonAction, SignupButtonAction];

  return (
    <MockProvider>
      <Header 
        navLinks={navLinks}
        actions={actions}
      />
      <div style={{padding: 'var(--spacing-large)', fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)', height: '150vh'}}>
        Scroll down to see sticky header in action.
        <p>This composition showcases the default Product Hunt header with standard navigation and actions.</p>
      </div>
    </MockProvider>
  );
};

export const CustomizedHeaderWithSearch = () => {
  const navLinks: HeaderLinkType[] = [
    { label: 'Innovations', href: '/innovations', icon: ProductsIcon },
    { label: 'Daily Digest', href: '/digest', icon: NewsIcon },
    { label: 'Deals', href: '/deals', external: true },
  ];

  const actions: ComponentType<any>[] = [SubmitProductAction];

  const searchBar = (
    <input 
      type="search" 
      placeholder="Search new & noteworthy products..." 
      style={{ 
        padding: 'var(--spacing-x-small) var(--spacing-small)', 
        borderRadius: 'var(--borders-radius-medium)', 
        border: '1px solid var(--colors-border-default)', 
        backgroundColor: 'var(--colors-surface-primary)', 
        color: 'var(--colors-text-primary)',
        minWidth: '300px',
        fontSize: 'var(--typography-sizes-body-small)',
        fontFamily: 'var(--typography-font-family)'
      }} 
    />
  );

  return (
    <MockProvider>
      <Header
        logoName="InnovateHub"
        logoSlogan="Discover Tomorrow's Tech"
        logoHref="/innovate"
        navLinks={navLinks}
        actions={actions}
      >
        {searchBar}
      </Header>
      <div style={{padding: 'var(--spacing-large)', fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)'}}>
        <p>This header features custom branding, different navigation links (some with icons), a search bar in the center, and a custom action.</p>
      </div>
    </MockProvider>
  );
};

export const HeaderWithUserActionsAndMinimalNav = () => {
  const navLinks: HeaderLinkType[] = [
    { label: 'Explore', href: '/explore', icon: ProductsIcon },
  ];

  const actions: ComponentType<any>[] = [UserProfileBadge, SubmitProductAction];
  
  return (
    <MockProvider>
      <Header
        logoName="PH"
        logoSlogan="Next Big Thing"
        navLinks={navLinks}
        actions={actions}
      />
      <div style={{padding: 'var(--spacing-large)', fontFamily: 'var(--typography-font-family)', color: 'var(--colors-text-primary)'}}>
        <p>This composition demonstrates a header with a logged-in user (avatar badge), a primary call to action, and a minimal set of navigation links. This could be typical for a user-specific view or a more focused part of the platform.</p>
      </div>
    </MockProvider>
  );
};