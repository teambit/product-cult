import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ForumTopicCard } from './forum-topic-card.js';
import { ForumTopic } from '@infinity/forums.entities.forum-topic';
import { createMockUserProfile } from '@infinity/people.entities.user-profile';

const pageStyles: React.CSSProperties = {
  padding: 'var(--spacing-large, 24px)', // Default fallback for var if not present
  backgroundColor: 'var(--colors-surface-background, #f8f9fa)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-large, 24px)',
  alignItems: 'center',
  minHeight: '100vh', // Ensure page takes full height
};

const cardWrapperStyles: React.CSSProperties = {
  maxWidth: '450px',
  width: '100%',
};

// --- Mock Data ---

const mockAuthorAlice = createMockUserProfile({
  userId: 'user-alice-001',
  name: 'Alice Coder',
  imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=M3w3MDc2NDF8MHwxfGFsbHx8fHx8fHx8fDE2Mzg4ODE0NjN8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  bio: 'Full-stack developer passionate about open source and innovative tech.',
  createdAt: new Date('2022-01-20T09:00:00Z').toISOString(),
});

const mockTopic1 = ForumTopic.from({
  forumId: 'ph-forum-general',
  title: 'Seeking Advice: Best Practices for Scaling a Node.js Application',
  content: 'Our Node.js application is experiencing rapid growth, and we need to ensure it can handle the increasing load. What are some best practices, tools, or architectural patterns you recommend for scaling? We\'re particularly interested in microservices, database optimization, and efficient load balancing. Any insights or experiences shared would be greatly appreciated by our team!',
  userId: mockAuthorAlice.userId,
  createdAt: new Date('2024-07-15T10:30:00Z').toISOString(),
  updatedAt: new Date('2024-07-15T12:45:00Z').toISOString(),
});


const mockAuthorBob = createMockUserProfile({
  userId: 'user-bob-002',
  name: 'Robert "The Innovator" P. Longname Jr. Esq.',
  imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=M3w3MDc2NDF8MHwxfGFsbHx8fHx8fHx8fDE2Mzg4ODE1MTB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  bio: 'Serial entrepreneur and product visionary, always chasing the next big thing.',
  createdAt: new Date('2021-06-10T15:00:00Z').toISOString(),
});

const mockTopicLong = ForumTopic.from({
  forumId: 'ph-forum-strategy',
  title: 'A Comprehensive Long-Winded Title Discussing the Future of Decentralized Autonomous Organizations (DAOs) and Their Potential Impact on Global Governance Structures and Web3 Ecosystems',
  content: 'This is an exceptionally detailed and lengthy piece of content designed to rigorously test the excerpt generation and text truncation capabilities of the ForumTopicCard component. We are exploring how DAOs might reshape traditional governance, the challenges in DAO tooling, legal ambiguities, and the socio-economic implications of widespread adoption. The content continues, covering aspects like tokenomics, voter apathy, smart contract security in DAOs, and case studies of successful and failed DAO experiments. This long text serves to ensure that the card layout remains robust and visually appealing irrespective of the verbosity of the topic content, pushing the boundaries of the -webkit-line-clamp property.',
  userId: mockAuthorBob.userId,
  createdAt: new Date('2024-06-20T14:15:00Z').toISOString(),
  updatedAt: new Date('2024-06-21T09:00:00Z').toISOString(),
});

const mockTopicForHookTest = ForumTopic.from({
  forumId: 'ph-forum-discussion',
  title: 'Open Discussion: What Excites You Most About AI in 2025?',
  content: 'Let\'s have an open discussion about the future of AI. What specific advancements, applications, or ethical considerations are on your mind as we look towards 2025? This topic is set up to test the ForumTopicCard\'s behavior when author information is fetched via the internal hook, potentially showing loading states or "Author unknown" if the profile (user-charlie-unmocked-003) isn\'t found by the mock Apollo setup.',
  userId: 'user-charlie-unmocked-003', // This ID won't have a mockAuthorProfile passed
  createdAt: new Date('2024-05-10T08:45:00Z').toISOString(),
  updatedAt: new Date('2024-05-10T09:20:00Z').toISOString(),
});

// --- Compositions ---

/**
 * Demonstrates a standard ForumTopicCard with pre-loaded author information.
 */
export const BasicForumTopicCard = () => (
  <MockProvider>
    <div style={pageStyles}>
      <div style={cardWrapperStyles}>
        <ForumTopicCard topic={mockTopic1} mockAuthorProfile={mockAuthorAlice} />
      </div>
    </div>
  </MockProvider>
);

/**
 * Showcases the card's handling of very long titles, content excerpts,
 * and potentially long author names.
 */
export const ForumTopicCardWithLongTexts = () => (
  <MockProvider>
    <div style={pageStyles}>
      <div style={cardWrapperStyles}>
        <ForumTopicCard topic={mockTopicLong} mockAuthorProfile={mockAuthorBob} />
      </div>
    </div>
  </MockProvider>
);

/**
 * This composition demonstrates the card's behavior when author information
 * is being fetched by its internal `useGetUserProfile` hook.
 * It may briefly show loading skeletons for the author, and if the user
 * (user-charlie-unmocked-003) is not found by the MockProvider's Apollo setup,
 * it will display the "Author unknown" state.
 */
export const ForumTopicCardAuthorLoadingAndUnknownStates = () => (
  <MockProvider>
    <div style={pageStyles}>
      <div style={cardWrapperStyles}>
        <ForumTopicCard topic={mockTopicForHookTest} />
      </div>
    </div>
  </MockProvider>
);