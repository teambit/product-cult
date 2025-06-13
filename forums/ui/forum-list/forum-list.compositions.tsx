import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Forum } from '@infinity/forums.entities.forum';
import { ForumList } from './forum-list.js';

const commonForumProps = {
  createdAt: new Date(2023, 10, 15, 10, 0, 0).toISOString(),
  updatedAt: new Date(2023, 11, 1, 14, 30, 0).toISOString(),
};

const basicMockForums: Forum[] = [
  new Forum(
    'General Discussion',
    'A place to discuss anything and everything related to our community, products, and the wider tech world. Feel free to start a new topic or jump into existing conversations.',
    commonForumProps.createdAt,
    commonForumProps.updatedAt,
    undefined,
    'forum-basic-1'
  ),
  new Forum(
    'Product Feedback & Ideas',
    'Your thoughts matter! Share feedback on our current products or suggest new ideas and features you\'d love to see. Help us shape the future.',
    commonForumProps.createdAt,
    commonForumProps.updatedAt,
    undefined,
    'forum-basic-2'
  ),
  new Forum(
    'Technical Support',
    'Encountering an issue or have a question about how something works? Post here to get help from the community and our support team.',
    commonForumProps.createdAt,
    commonForumProps.updatedAt,
    undefined,
    'forum-basic-3'
  ),
];

const forumsWithImagesMockData: Forum[] = [
  new Forum(
    'Tech Innovations Showcase',
    'Explore and discuss the latest breakthroughs in technology. From AI advancements to new hardware reveals, this is the place for cutting-edge tech talk.',
    commonForumProps.createdAt,
    commonForumProps.updatedAt,
    'https://source.unsplash.com/random/400x200?technology,innovation',
    'forum-img-1'
  ),
  new Forum(
    'Startup & Entrepreneurship Hub',
    'Connect with fellow founders, share your startup journey, exchange advice on challenges, and celebrate milestones. For dreamers and doers.',
    commonForumProps.createdAt,
    commonForumProps.updatedAt,
    'https://source.unsplash.com/random/400x200?startup,business',
    'forum-img-2'
  ),
  new Forum(
    'Creative Corner: Design & UX',
    'A forum for designers, artists, and UX enthusiasts. Share your work, discuss design trends, user experience strategies, and creative tools.',
    commonForumProps.createdAt,
    commonForumProps.updatedAt,
    'https://source.unsplash.com/random/400x200?design,creativity',
    'forum-img-3'
  ),
  new Forum(
    'Software Development Universe',
    'Dive into discussions about programming languages, frameworks, development methodologies, and software architecture. For coders of all levels.',
    commonForumProps.createdAt,
    commonForumProps.updatedAt,
    'https://source.unsplash.com/random/400x200?code,software',
    'forum-img-4'
  ),
];

export const BasicForumList = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <ForumList mockForumsData={basicMockForums} />
    </div>
  </MockProvider>
);

export const ForumListWithImages = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <ForumList mockForumsData={forumsWithImagesMockData} />
    </div>
  </MockProvider>
);

export const ForumListEmptyState = () => (
  <MockProvider>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <ForumList mockForumsData={[]} />
    </div>
  </MockProvider>
);

export const ForumListCustomStyled = () => (
  <MockProvider>
    <style>{`
      .custom-forum-list-container {
        border: 3px dashed var(--colors-primary-default);
        background-color: var(--colors-surface-secondary);
        border-radius: var(--borders-radius-pill); /* Example: different container rounding */
        padding: var(--spacing-small); /* Example: Adjust container padding */
      }

      /* 
        Targeting specific child elements styled with CSS Modules (like styles.forumName) 
        from a global style tag is tricky due to hashed class names.
        The 'className' prop is most effective for styling the component's root container
        or for components designed with specific CSS custom properties for theming.
        Here, we demonstrate styling the root container.
      */
    `}</style>
    <div style={{ padding: 'var(--spacing-large)' }}>
      <ForumList
        mockForumsData={forumsWithImagesMockData.slice(0, 2)} // Show a couple of items
        className="custom-forum-list-container"
        style={{
          maxWidth: '800px',
          margin: '0 auto', // Center the list
          boxShadow: 'var(--effects-shadows-large)',
        }}
      />
    </div>
  </MockProvider>
);