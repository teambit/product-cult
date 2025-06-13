import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserBar } from './user-bar.js';
import type { UserBarMenuItem } from './user-bar-menu-item-type.js';

// Helper Icon Components (Simple Placeholders)
const ProfileIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
  </svg>
);

const AdminDashboardIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 9V3h8v6h-8zM3 13V3h8v10H3zm10 8V11h8v10h-8zM3 21v-6h8v6H3z" />
  </svg>
);

const commonWrapperStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  backgroundColor: 'var(--colors-surface-background)',
  minHeight: '100px',
  display: 'flex',
  justifyContent: 'flex-end', // To mimic header placement
  borderBottom: '1px solid var(--colors-border-default)', // Mimic header border
};

/**
 * NOTE: These compositions assume that `MockProvider` and `useAuth`
 * are configured such that `useAuth` returns the appropriate
 * authentication state (logged-in user or null) for each scenario.
 * The mechanism for this (e.g., global mock config, specific Apollo mocks
 * configured at an environment level) is outside the scope of this file
 * due to constraints on mocking hooks directly or using Apollo Client APIs
 * within compositions.
 */

export const LoggedOutUserBar = () => {
  // Assumes useAuth() will return { user: null, loading: false, ... }
  // when this composition is rendered in the Bit environment.
  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserBar menuItems={[]} />
      </div>
    </MockProvider>
  );
};

const standardUserMenuItems: UserBarMenuItem[] = [
  {
    name: 'profile',
    label: 'My Profile',
    href: '/profile/me',
    icon: ProfileIcon,
  },
  {
    name: 'my-products',
    label: 'My Products',
    href: '/user/products',
    icon: SettingsIcon, // Reusing for simplicity
  },
  {
    name: 'settings',
    label: 'Account Settings',
    href: '/settings/account',
    icon: SettingsIcon,
  },
];

export const LoggedInUserBar = () => {
  // Assumes useAuth() will return a mock user:
  // e.g. mockUser({
  //   username: 'Jane Doe',
  //   email: 'jane@example.com',
  //   imageUrl: 'https://images.unsplash.com/photo-1649767537763-a0118ad8651a?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwY29ubmVjdGlvbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk5MjYzfDA&ixlib=rb-4.1.0'
  // })
  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserBar menuItems={standardUserMenuItems} />
      </div>
    </MockProvider>
  );
};

const adminUserMenuItems: UserBarMenuItem[] = [
  {
    name: 'profile',
    label: 'My Profile',
    href: '/profile/me',
    icon: ProfileIcon,
  },
  {
    name: 'admin-dashboard',
    label: 'Admin Dashboard',
    href: '/admin/dashboard',
    icon: AdminDashboardIcon,
    allowedRoles: ['admin'],
  },
  {
    name: 'content-moderation',
    label: 'Content Moderation',
    href: '/admin/moderation',
    icon: SettingsIcon, // Reusing
    allowedRoles: ['admin', 'moderator'],
  },
  {
    name: 'settings',
    label: 'Account Settings',
    href: '/settings/account',
    icon: SettingsIcon,
  },
];

export const AdminUserBar = () => {
  // Assumes useAuth() will return a mock user with roles:
  // e.g. mockUser({
  //   username: 'Super Admin',
  //   email: 'admin@example.com',
  //   imageUrl: 'https://images.unsplash.com/photo-1603899122724-98440dd9c400?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY29ubmVjdGlvbnxlbnwxfDB8fG9yYW5nZXwxNzQ5NTk5MjYzfDA&ixlib=rb-4.1.0',
  //   roles: ['admin', 'user']
  // })
  // The 'Admin Dashboard' and 'Content Moderation' items should be visible.
  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserBar menuItems={adminUserMenuItems} />
      </div>
    </MockProvider>
  );
};

export const UserBarWithNoMenuItems = () => {
  // Assumes useAuth() will return a logged-in user.
  // This tests the scenario where a user is logged in but there are no menu items configured (or none match roles).
  // The dropdown should still appear with just the "Logout" button.
  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserBar menuItems={[]} />
      </div>
    </MockProvider>
  );
};