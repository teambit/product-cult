import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ForumTopic } from '@infinity/forums.entities.forum-topic';
import { ForumPost, mockForumPost } from '@infinity/forums.entities.forum-post';
import { ForumTopicPage } from './forum-topic-page.js';
// User entity might be needed if we were to mock useAuth's return value directly,
// but since we can't, we rely on MockProvider's environment.
// import { User, mockUser } from '@infinity/product-hunt-platform.entities.user';

const populatedTopicId = 'topic-ai-discussion';
const populatedTopic = ForumTopic.from({
  id: populatedTopicId,
  forumId: 'forum-tech-innovations',
  title: 'The Future of AI: Trends and Predictions for 2025',
  content:
    'Artificial Intelligence is evolving at an unprecedented pace. What are the key trends you foresee dominating by 2025? \n\nConsider areas like: \n- Generative AI (text, images, code) \n- AI in healthcare \n- Autonomous systems \n- Ethical AI and governance \n\nShare your thoughts, articles, and predictions!',
  userId: 'user-alpha-001',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
});

const populatedPosts: ForumPost[] = [
  mockForumPost({
    id: 'post-1',
    topicId: populatedTopicId,
    userId: 'user-beta-002',
    content:
      "Great topic! I believe we'll see a huge leap in personalized education driven by AI tutors. Imagine adaptive learning paths for every student, tailored to their specific needs and pace.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  }),
  mockForumPost({
    id: 'post-2',
    topicId: populatedTopicId,
    userId: 'user-gamma-003',
    content:
      "I'm particularly interested in AI's role in drug discovery and development. The ability to simulate molecular interactions and predict drug efficacy could drastically shorten research timelines.",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  }),
  mockForumPost({
    id: 'post-3',
    topicId: populatedTopicId,
    userId: 'user-alpha-001',
    content:
      "Good point on healthcare, Gamma! Ethical considerations around data privacy and algorithmic bias in AI diagnostics will be crucial to address.",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  }),
];

const topicWithNoPostsId = 'topic-empty-discussion';
const topicWithNoPosts = ForumTopic.from({
  id: topicWithNoPostsId,
  forumId: 'forum-community-ideas',
  title: 'New Forum Section: Share Your Project Ideas!',
  content:
    "This is a brand new topic for community members to share and discuss their exciting project ideas. Whether it's a new app, a hardware gadget, or a community initiative, post it here and get feedback!",
  userId: 'user-delta-004',
  createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
  updatedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
});

const topicForErrorCaseId = 'non-existent-topic-id';

export const PopulatedForumTopicPage = () => (
  <MockProvider>
    <ForumTopicPage
      topicId={populatedTopicId}
      mockTopic={populatedTopic}
      mockPosts={populatedPosts}
    />
  </MockProvider>
);

export const ForumTopicPageWithNoPosts = () => (
  <MockProvider>
    <ForumTopicPage
      topicId={topicWithNoPostsId}
      mockTopic={topicWithNoPosts}
      mockPosts={[]}
    />
  </MockProvider>
);

export const ForumTopicPageErrorLoadingTopic = () => (
  <MockProvider>
    {/*
      By not providing mockTopic, we let the useGetForumTopic hook attempt a fetch.
      If MockedProvider (within MockProvider) doesn't have a specific mock for this topicId,
      it should result in an error state from the hook, which the component will display.
    */}
    <ForumTopicPage topicId={topicForErrorCaseId} />
  </MockProvider>
);
