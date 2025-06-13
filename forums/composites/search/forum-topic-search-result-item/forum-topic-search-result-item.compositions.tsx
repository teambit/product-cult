import React from 'react';
import { SearchResult } from '@infinity/search.entities.search-result';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ForumTopicSearchResultItem } from './forum-topic-search-result-item.js';

const commonWrapperStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-medium)',
  maxWidth: '600px',
  margin: '0 auto',
};

export const BasicForumTopicItem = () => {
  const searchResult = new SearchResult(
    'topic-123',
    'Getting Started with Infinity Design System',
    'A comprehensive guide for developers and designers on how to integrate and utilize the Infinity Design System in your projects. Covers setup, component usage, and theming.',
    'forum-topic',
    { originalUrl: '/forums/topic-123' }
  );

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <ForumTopicSearchResultItem searchResult={searchResult} />
      </div>
    </MockProvider>
  );
};

export const ForumTopicItemWithLongerText = () => {
  const searchResult = new SearchResult(
    'topic-456',
    'Advanced Discussion: The Future of Decentralized Social Networks and Community Platforms on Web3',
    'This forum topic explores the cutting-edge developments in decentralized social media. We delve into technical challenges, scalability solutions, governance models, user adoption strategies, and the potential impact on digital communication and content ownership. Join the conversation to share your insights and learn from experts in the field.',
    'forum-topic',
    { originalUrl: '/forums/topic-456' }
  );

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        <ForumTopicSearchResultItem searchResult={searchResult} />
      </div>
    </MockProvider>
  );
};

export const ForumTopicItemWithCustomStyling = () => {
  const searchResult = new SearchResult(
    'topic-789',
    'Feedback Request: New Product Hunt Forum UI',
    'We are excited to preview the upcoming changes to our forum interface! This topic is dedicated to gathering your feedback on the new design, navigation, and features. Please share your thoughts and suggestions.',
    'forum-topic',
    { originalUrl: '/forums/topic-789' }
  );

  return (
    <MockProvider>
      <style>{`
        .custom-forum-topic-item {
          border-left: 5px solid var(--colors-secondary-default);
          box-shadow: var(--effects-shadows-large);
        }
        .custom-forum-topic-item:hover {
          border-left-color: var(--colors-primary-hover);
        }
      `}</style>
      <div style={commonWrapperStyle}>
        <ForumTopicSearchResultItem
          searchResult={searchResult}
          className="custom-forum-topic-item"
          style={{ backgroundColor: 'var(--colors-surface-secondary)' }}
        />
      </div>
    </MockProvider>
  );
};

export const MultipleForumTopicItems = () => {
  const results = [
    new SearchResult(
      'ai-innovations-01',
      'Latest AI Innovations in Product Design',
      'Discuss the newest AI tools and techniques revolutionizing how we design and iterate on products. From generative design to AI-powered user testing, what are you excited about?',
      'forum-topic',
      { originalUrl: '/forums/ai-innovations-01' }
    ),
    new SearchResult(
      'marketing-growth-hacks-02',
      'Top Growth Hacking Strategies for Startups',
      'Share and discover effective growth hacking strategies that have yielded significant results for new businesses. Focus on low-cost, high-impact tactics.',
      'forum-topic',
      { originalUrl: '/forums/marketing-growth-hacks-02' }
    ),
    new SearchResult(
      'remote-work-tools-03',
      'Essential Tools for Remote Team Collaboration',
      'What are your go-to tools for keeping your remote team connected, productive, and engaged? Looking for recommendations on project management, communication, and virtual whiteboarding.',
      'forum-topic',
      { originalUrl: '/forums/remote-work-tools-03' }
    ),
  ];

  return (
    <MockProvider>
      <div style={commonWrapperStyle}>
        {results.map((result) => (
          <ForumTopicSearchResultItem key={result.id} searchResult={result} />
        ))}
      </div>
    </MockProvider>
  );
};