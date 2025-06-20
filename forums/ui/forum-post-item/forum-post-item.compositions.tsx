import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ForumPost, mockForumPost } from '@infinity/forums.entities.forum-post';
import { UserProfile, createMockUserProfile } from '@infinity/people.entities.user-profile';
import { ForumPostItem } from './forum-post-item.js';

const commonUserOverrides = {
  // createdAt and updatedAt will be generated by createMockUserProfile if not specified
};

const authorJaneDoe = createMockUserProfile({
  ...commonUserOverrides,
  userId: 'user-jane-doe',
  name: 'Jane Doe',
  bio: 'Loves discussing new tech and forum moderation.',
  imageUrl: 'https://storage.googleapis.com/static.bit.dev/Community%20Extension%20images/rocket.svg',
  createdAt: new Date('2023-03-15T10:00:00Z').toISOString(),
});

const authorJohnSmithLongName = createMockUserProfile({
  ...commonUserOverrides,
  userId: 'user-john-smith-long',
  name: 'Johnathan Smithersolomew III, Esq.',
  bio: 'Enthusiast of intricate discussions and detailed product reviews. My name is long to test UI constraints.',
  imageUrl: 'https://storage.googleapis.com/static.bit.dev/Community%20Extension%20images/star.svg',
  createdAt: new Date('2023-04-20T14:30:00Z').toISOString(),
});

const authorAlexNoImage = createMockUserProfile({
  ...commonUserOverrides,
  userId: 'user-alex-no-img',
  name: 'Alex P. Keaton',
  bio: 'Focused on content, not appearances. I believe in the power of words and community.',
  imageUrl: undefined, // No image, should fallback to initials 'AP'
  createdAt: new Date('2023-05-10T08:15:00Z').toISOString(),
});

const post1ByJane: ForumPost = mockForumPost({
  id: 'post-1',
  topicId: 'topic-tech-discussion',
  content: 'Just read an interesting article about the future of AI in product development. What are your thoughts? I believe it will revolutionize how we build and iterate on products.',
  userId: authorJaneDoe.userId,
  createdAt: new Date('2024-01-15T10:30:00Z').toISOString(),
  updatedAt: new Date('2024-01-15T11:00:00Z').toISOString(),
});

const post2ByJohnLong: ForumPost = mockForumPost({
  id: 'post-2',
  topicId: 'topic-product-feedback',
  content: `I've been using the new "InnovateHub X" platform for a week now, and I must say, the collaborative features are impressive. However, I've noticed a few areas for improvement regarding the user interface responsiveness on smaller devices. Specifically, the main dashboard sidebar tends to overlap content when the screen width is below 400px. Also, the notification system could benefit from more granular controls. For example, I'd like to mute notifications for specific threads or mentions only during certain hours.

Despite these minor points, the overall experience is positive. The real-time document editing is seamless, and the integration with version control systems is a huge plus. I'm looking forward to seeing how this platform evolves.

Has anyone else experienced similar UI issues or has suggestions for the notification system?
Let's discuss!`,
  userId: authorJohnSmithLongName.userId,
  createdAt: new Date('2024-01-16T14:45:00Z').toISOString(),
  updatedAt: new Date('2024-01-16T14:45:00Z').toISOString(),
});

const post3ByAlexNoImage: ForumPost = mockForumPost({
  id: 'post-3',
  topicId: 'topic-general-chat',
  content: "Hey everyone! What's your favorite underrated productivity tool? I'm always on the lookout for hidden gems.",
  userId: authorAlexNoImage.userId,
  createdAt: new Date('2024-01-17T09:00:00Z').toISOString(),
  updatedAt: new Date('2024-01-17T09:15:00Z').toISOString(),
});

const containerStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  backgroundColor: 'var(--colors-surface-background)',
  maxWidth: '800px',
  margin: '0 auto',
};

export const BasicForumPostItem = () => (
  <MockProvider>
    <div style={containerStyle}>
      <ForumPostItem post={post1ByJane} mockAuthorProfile={authorJaneDoe} />
    </div>
  </MockProvider>
);

export const LongContentForumPostItem = () => (
  <MockProvider>
    <div style={containerStyle}>
      <ForumPostItem
        post={post2ByJohnLong}
        mockAuthorProfile={authorJohnSmithLongName}
      />
    </div>
  </MockProvider>
);

export const PostItemWithNoAuthorImage = () => (
  <MockProvider>
    <div style={containerStyle}>
      <ForumPostItem
        post={post3ByAlexNoImage}
        mockAuthorProfile={authorAlexNoImage}
      />
    </div>
  </MockProvider>
);

export const MultipleForumPostItems = () => (
  <MockProvider>
    <div style={containerStyle}>
      <ForumPostItem post={post1ByJane} mockAuthorProfile={authorJaneDoe} />
      <ForumPostItem
        post={post2ByJohnLong}
        mockAuthorProfile={authorJohnSmithLongName}
      />
      <ForumPostItem
        post={post3ByAlexNoImage}
        mockAuthorProfile={authorAlexNoImage}
      />
    </div>
  </MockProvider>
);