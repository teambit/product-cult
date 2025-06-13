import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { createMockUserProfile } from '@infinity/people.entities.user-profile';
import type { UserProfile } from '@infinity/people.entities.user-profile';
import { UserCompactCard } from './user-compact-card.js';

const commonWrapperStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium)',
  maxWidth: '400px', // Typical width for a compact card in a panel
  margin: 'auto', // Center compositions
};

const onCardClick = (user: UserProfile) => {
  // eslint-disable-next-line no-alert
  alert(`Clicked on user: ${user.toObject().name}`);
};

export const BasicUserCard = () => {
  const user = createMockUserProfile({
    name: 'Alex Johnson',
    bio: 'Product enthusiast & tech explorer. Loves to build and share.',
    imageUrl: "https://images.unsplash.com/photo-1652477633088-da74a0225dfc?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfDF8fG9yYW5nZXwxNzQ5NTk4NjE3fDA&ixlib=rb-4.1.0",
    userId: 'user1',
    createdAt: new Date().toISOString(),
  });

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserCompactCard user={user} />
      </div>
    </MockProvider>
  );
};

export const InteractiveUserCardWithLongBio = () => {
  const user = createMockUserProfile({
    name: 'Samantha Miller-Smithsonian The Third',
    bio: 'Passionate innovator dedicated to crafting user-centric digital experiences. Always on the lookout for the next big thing in AI and SaaS. Let\'s connect and build something amazing together! My current focus is on democratizing access to advanced technology.',
    imageUrl: "https://images.unsplash.com/photo-1652477631519-fcd55def4e18?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfDF8fG9yYW5nZXwxNzQ5NTk4NjE3fDA&ixlib=rb-4.1.0",
    userId: 'user2',
    createdAt: new Date().toISOString(),
  });

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserCompactCard user={user} onClick={onCardClick} avatarSize="xlarge" />
      </div>
    </MockProvider>
  );
};

export const UserCardWithoutDescription = () => {
  const user = createMockUserProfile({
    name: 'Ken Adams',
    bio: '', // Empty bio
    imageUrl: "https://images.unsplash.com/photo-1606274741559-d322810275c4?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfDF8fG9yYW5nZXwxNzQ5NTk4NjE3fDA&ixlib=rb-4.1.0",
    userId: 'user3',
    createdAt: new Date().toISOString(),
  });

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserCompactCard user={user} avatarSize="medium" />
      </div>
    </MockProvider>
  );
};

export const UserCardWithMissingAvatar = () => {
  const user = createMockUserProfile({
    name: 'Deepa Sharma',
    bio: 'Founder & CEO at Innovatech. Building the future of work.',
    imageUrl: undefined, // No image URL
    userId: 'user4',
    createdAt: new Date().toISOString(),
  });
  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserCompactCard user={user} onClick={onCardClick} />
      </div>
    </MockProvider>
  );
};