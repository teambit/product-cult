import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { createMockUserProfile } from '@infinity/people.entities.user-profile';
import { UserCard } from './user-card.js';

const userImages = [
  "https://images.unsplash.com/photo-1521119989659-a83eee488004?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfDF8fGJsdWV8MTc0OTU5ODYyMXww&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1554564200-198b0cd87cf5?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfDF8fGJsdWV8MTc0OTU5ODYyMXww&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1660314272113-bcd96af88a86?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfDF8fGJsdWV8MTc0OTU5ODYyMXww&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1651793058237-e81b8e2a0304?ixid=M3w3MDc2NDF8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBwb3J0cmFpdHxlbnwxfDF8fGJsdWV8MTc0OTU5ODYyMXww&ixlib=rb-4.1.0"
];

const commonWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-large)',
  padding: 'var(--spacing-large)',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '400px', // Ensure there's enough space to see cards
  backgroundColor: 'var(--colors-surface-background)'
};

const cardStyle: React.CSSProperties = {
  // The UserCard component itself has max-width and min-height defined in its SCSS.
  // This style prop is for additional overrides if needed per composition.
};

export const BasicUserProfileCard = () => {
  const user1 = createMockUserProfile({
    userId: 'user-1',
    name: 'Alex Johnson',
    bio: 'Founder of InnovateHub. Passionate about AI and product development. Building the future of tech, one product at a time.',
    imageUrl: userImages[0],
  });

  const user2 = createMockUserProfile({
    userId: 'user-2',
    name: 'Samantha Lee',
    bio: 'Product designer focused on user experience and sustainable tech. Exploring new frontiers in digital interaction.',
    imageUrl: userImages[1],
  });


  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserCard userProfile={user1} style={cardStyle} />
        <UserCard userProfile={user2} style={cardStyle} avatarSize="large" />
      </div>
    </MockProvider>
  );
};

export const InteractiveAndStyledUserCard = () => {
  const userProfile = createMockUserProfile({
    userId: 'user-interactive-1',
    name: 'Chris Takahashi Rodriguez placeholder name for testing very long names that should wrap correctly',
    bio: 'Early adopter & tech enthusiast. Always on the lookout for the next big thing in SaaS, gaming, and productivity tools. This bio is intentionally made longer to test how the text truncation works within the card component, ensuring that it displays ellipsis correctly after a few lines.',
    imageUrl: userImages[2],
  });

  const handleAvatarClick = (userId: string) => {
    // eslint-disable-next-line no-alert
    alert(`Avatar clicked for user: ${userId}`);
  };

  const handleNameClick = (userId: string) => {
    // eslint-disable-next-line no-alert
    alert(`Name clicked for user: ${userId}`);
  };

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserCard
          userProfile={userProfile}
          onAvatarClick={handleAvatarClick}
          onNameClick={handleNameClick}
          avatarSize="large"
          nameHeadingLevel={2}
          style={cardStyle}
        />
      </div>
    </MockProvider>
  );
};

export const CompactUserCardVariations = () => {
  const userWithoutBio = createMockUserProfile({
    userId: 'user-compact-1',
    name: 'Maria Garcia',
    bio: '', // No bio
    imageUrl: userImages[3],
  });

  const userWithShortBioAndSmallAvatar = createMockUserProfile({
    userId: 'user-compact-2',
    name: 'Kenji Tanaka',
    bio: 'Maker. Coder. Explorer.',
    imageUrl: userImages[0], // Re-use an image
  });
  
  const userWithNoImage = createMockUserProfile({
    userId: 'user-no-image-1',
    name: 'No Avatar User',
    bio: 'Sometimes users might not have an avatar set up yet.',
    imageUrl: undefined,
  });


  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <UserCard
          userProfile={userWithoutBio}
          avatarSize="medium"
          nameHeadingLevel={4}
          style={cardStyle}
        />
        <UserCard
          userProfile={userWithShortBioAndSmallAvatar}
          avatarSize="small"
          nameHeadingLevel={5}
          style={cardStyle}
        />
         <UserCard
          userProfile={userWithNoImage}
          avatarSize="medium"
          nameHeadingLevel={4}
          style={cardStyle}
        />
      </div>
    </MockProvider>
  );
};