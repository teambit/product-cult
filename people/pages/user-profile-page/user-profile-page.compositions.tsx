import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { createMockUserProfile, type UserProfile } from '@infinity/people.entities.user-profile';
import { Heading } from '@infinity/design.typography.heading';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { Button } from '@infinity/design.actions.button';
import type { UserProfileTab } from './user-profile-tab-type.js';
import { UserProfilePage } from './user-profile-page.js';

// --- Mock Data ---

const mockUserProfile1 = createMockUserProfile({
  userId: 'user-alex-innovator',
  name: 'Alex Innovator',
  bio: 'Passionate about building next-gen products. Constantly exploring new technologies and connecting with fellow makers. Let\'s build something amazing together! Based in the vibrant city of San Francisco, always looking for the next big wave in tech.',
  imageUrl: "https://images.unsplash.com/photo-1649767537763-a0118ad8651a?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMGRhc2hib2FyZCUyMHRlY2hub2xvZ3l8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5OTI2MHww&ixlib=rb-4.1.0",
  company: 'Tech Solutions Inc.',
  location: 'San Francisco, CA',
  email: 'alex.innovator@example.com',
  socialMediaLinks: {
    twitter: 'https://twitter.com/alexinnovator',
    linkedin: 'https://linkedin.com/in/alexinnovator',
    github: 'https://github.com/alexinnovator',
  },
  createdAt: new Date('2022-01-15T10:00:00Z').toISOString(),
  updatedAt: new Date('2023-05-20T10:00:00Z').toISOString(),
});

const mockUserProfile2 = createMockUserProfile({
  userId: 'user-casey-maker',
  name: 'Casey Maker',
  bio: 'Building tools for creators and indie hackers. Always learning and sharing. Let\'s connect and discuss the future of indie products. Active in the Austin tech scene.',
  imageUrl: "https://images.unsplash.com/photo-1649767662275-b1c8ff96cc28?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHx1c2VyJTIwcHJvZmlsZSUyMGRhc2hib2FyZCUyMHRlY2hub2xvZ3l8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5OTI2MHww&ixlib=rb-4.1.0",
  company: 'Creator Tools Co.',
  location: 'Austin, TX',
  email: 'casey.maker@example.com',
  socialMediaLinks: {
    producthunt: 'https://producthunt.com/@caseymaker',
    indiehackers: 'https://indiehackers.com/caseymaker',
  },
  createdAt: new Date('2023-03-10T09:00:00Z').toISOString(),
  updatedAt: new Date('2023-08-15T11:00:00Z').toISOString(),
});

// This user ID is intended to match a potential mock authenticated user's ID
// provided by the testing environment / MockProvider for `useAuth`.
export const AUTH_USER_MOCK_ID = 'auth-user-jamie-dev';

const mockUserProfileOwn: UserProfile = createMockUserProfile({
  userId: AUTH_USER_MOCK_ID,
  name: 'Jamie Developer (Me)',
  bio: 'Full-stack developer, coffee enthusiast, and open-source contributor. Currently working on a cool new side project. Check out my launches! I love exploring new coding paradigms and sharing knowledge with the community.',
  imageUrl: "https://images.unsplash.com/photo-1649767428212-7590dbf20116?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw2fHx1c2VyJTIwcHJvZmlsZSUyMGRhc2hib2FyZCUyMHRlY2hub2xvZ3l8ZW58MXwwfHxvcmFuZ2V8MTc0OTU5OTI2MHww&ixlib=rb-4.1.0",
  company: 'My Awesome Startup',
  location: 'Remote',
  email: 'jamie.dev@example.com',
  socialMediaLinks: {
    portfolio: 'https://jamiedev.example.com',
    github: 'https://github.com/jamiedev',
    devto: 'https://dev.to/jamiedev',
  },
  createdAt: new Date('2021-06-20T14:30:00Z').toISOString(),
  updatedAt: new Date('2023-09-01T16:45:00Z').toISOString(),
});


// --- Mock Tab Components and Definitions ---

const ProductsTabContent = () => (
  <div style={{ padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-secondary)', borderRadius: 'var(--borders-radius-medium)', boxShadow: 'var(--effects-shadows-small)' }}>
    <Heading level={3} style={{ marginBottom: 'var(--spacing-medium)' }}>My Products</Heading>
    <Paragraph>A curated list of products I have launched or significantly contributed to.</Paragraph>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-medium)' }}>
      <div style={{ padding: 'var(--spacing-medium)', border: '1px solid var(--colors-border-subtle)', borderRadius: 'var(--borders-radius-medium)', backgroundColor: 'var(--colors-surface-primary)'}}>
        <Heading level={4} visualLevel={5}>Cool Project Alpha</Heading>
        <Paragraph>An innovative tool for developers that streamlines workflows.</Paragraph>
      </div>
      <div style={{ padding: 'var(--spacing-medium)', border: '1px solid var(--colors-border-subtle)', borderRadius: 'var(--borders-radius-medium)', backgroundColor: 'var(--colors-surface-primary)'}}>
        <Heading level={4} visualLevel={5}>Side Hustle Beta</Heading>
        <Paragraph>A platform for managing side projects and tracking progress.</Paragraph>
      </div>
    </div>
  </div>
);

const ActivityTabContent = () => (
  <div style={{ padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-secondary)', borderRadius: 'var(--borders-radius-medium)', boxShadow: 'var(--effects-shadows-small)' }}>
    <Heading level={3} style={{ marginBottom: 'var(--spacing-medium)' }}>Recent Activity</Heading>
    <Paragraph>Stay updated with my latest contributions and interactions within the community.</Paragraph>
    <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-small)' }}>
      <li style={{ padding: 'var(--spacing-small)', border: '1px solid var(--colors-border-subtle)', borderRadius: 'var(--borders-radius-small)', backgroundColor: 'var(--colors-surface-primary)'}}>Commented on "The Future of AI in Design" - 2 hours ago</li>
      <li style={{ padding: 'var(--spacing-small)', border: '1px solid var(--colors-border-subtle)', borderRadius: 'var(--borders-radius-small)', backgroundColor: 'var(--colors-surface-primary)'}}>Upvoted "InnovateHub X Launch" - 1 day ago</li>
      <li style={{ padding: 'var(--spacing-small)', border: '1px solid var(--colors-border-subtle)', borderRadius: 'var(--borders-radius-small)', backgroundColor: 'var(--colors-surface-primary)'}}>Published new article: "Mastering Async JavaScript" - 3 days ago</li>
    </ul>
  </div>
);

const SettingsTabContent = () => (
  <div style={{ padding: 'var(--spacing-medium)', backgroundColor: 'var(--colors-surface-secondary)', borderRadius: 'var(--borders-radius-medium)', boxShadow: 'var(--effects-shadows-small)' }}>
    <Heading level={3} style={{ marginBottom: 'var(--spacing-medium)' }}>Profile Settings</Heading>
    <Paragraph>This is where you would edit your profile details, notification preferences, and account settings.</Paragraph>
    <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-medium)' }}>
      <div>
        <label htmlFor="displayName" style={{ display: 'block', marginBottom: 'var(--spacing-x-small)', color: 'var(--colors-text-secondary)'}}>Display Name</label>
        <input type="text" id="displayName" defaultValue={mockUserProfileOwn.name} style={{width: '100%', padding: 'var(--spacing-small)', borderRadius: 'var(--borders-radius-small)', border: '1px solid var(--colors-border-default)'}} />
      </div>
      <div>
        <label htmlFor="bio" style={{ display: 'block', marginBottom: 'var(--spacing-x-small)', color: 'var(--colors-text-secondary)'}}>Bio</label>
        <textarea id="bio" defaultValue={mockUserProfileOwn.bio} style={{width: '100%', minHeight: '80px', padding: 'var(--spacing-small)', borderRadius: 'var(--borders-radius-small)', border: '1px solid var(--colors-border-default)'}} />
      </div>
      <Button appearance="primary" type="submit" onClick={(e) => e.preventDefault()}>Save Changes</Button>
    </form>
  </div>
);

// --- Icon Components (Simple SVGs) ---
const ProductsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4zm12 16H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V8h12v4z"/></svg>
);
const ActivityIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 11V3h-8v1H6.83l2 2H14v1H8.83l2 2H16v1h-4.17l2 2H19v2h-2.17l3 3L22 19.17V11zm-8 0V9h1v2h-1zm0-4V5h1v2h-1zM4.27 3L3 4.27l3.14 3.14L4 9.5V11h1.17L2 14.17V21h13.17l1.55 1.55L22.27 21 4.27 3zM6 19v-3.83L9.83 19H6zm6 0h-.17L8 15.17V13h.17L12 16.83V19z"/></svg>
);
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22-.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
);

const exampleTabs: UserProfileTab[] = [
  { name: 'products', label: 'Products', component: ProductsTabContent, icon: ProductsIcon },
  { name: 'activity', label: 'Activity', component: ActivityTabContent, icon: ActivityIcon },
];

const exampleTabsForOwnProfile: UserProfileTab[] = [
  ...exampleTabs,
  { name: 'settings', label: 'Settings', component: SettingsTabContent, icon: SettingsIcon },
];


// --- Compositions ---

export const BasicUserProfile = () => (
  <MockProvider>
    <UserProfilePage
      userId={mockUserProfile1.userId}
      mockUserProfileData={mockUserProfile1}
    />
  </MockProvider>
);

export const UserProfileWithTabs = () => (
  <MockProvider>
    <UserProfilePage
      userId={mockUserProfile2.userId}
      mockUserProfileData={mockUserProfile2}
      tabs={exampleTabs}
    />
  </MockProvider>
);

export const OwnUserProfileWithTabs = () => (
  <MockProvider>
    {/*
      For this composition to correctly show "Edit Profile", the MockProvider
      must configure the AuthContext such that `useAuth()` returns an `authUser`
      with `id: AUTH_USER_MOCK_ID`.
      We pass `mockUserProfileData` with this ID and omit the `userId` prop
      to simulate viewing the authenticated user's own profile.
    */}
    <UserProfilePage
      mockUserProfileData={mockUserProfileOwn}
      tabs={exampleTabsForOwnProfile}
    />
  </MockProvider>
);

export const UserProfileNotFound = () => (
  <MockProvider>
    <UserProfilePage
      userId="non-existent-user-id"
      mockUserProfileData={undefined} // Simulate data not found
    />
  </MockProvider>
);