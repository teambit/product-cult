import React from 'react';
import { MockProvider as PlatformMockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SearchPage } from './search-page.js';
import { MockedProvider as ApolloMockedProvider, type MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import type { PlainSearchResult } from '@infinity/search.ui.search-results-list';
import type { SearchOptionsInput } from '@infinity/search.hooks.use-search';

// Define the GraphQL query document assumed to be used by the useSearch hook internally
const SEARCH_PAGE_INTERNAL_QUERY_GQL = gql`
  query SearchPageInternalSearchQuery($options: SearchOptionsInput!) {
    search(options: $options) {
      id
      title
      description
      imageUrl # This field is part of PlainSearchResult, may be null/undefined
      type
      data # Assuming this is a JSON scalar or a type that maps to Record<string, any>
    }
  }
`;

// Initial variables that SearchPage will use on mount for its internal useSearch hook
const initialSearchVariables: SearchOptionsInput = {
  query: '',
  limit: 20, // Default limit as defined in SearchPage.tsx
  offset: 0,
  // searchType, sortBy, sortOrder, filters will be undefined initially in SearchPage's state
};

// Mock data for search results, omitting imageUrl as per constraints
const mockPlainResults: PlainSearchResult[] = [
  {
    id: 'prod-001',
    title: 'AI Powered Note Taker "ScribeAI"',
    description: 'Automatically transcribe, summarize, and organize your meetings and lectures with ScribeAI, the intelligent note-taking assistant.',
    type: 'product',
    data: { category: 'Productivity', version: '2.1', upvotes: 1450 },
  },
  {
    id: 'launch-002',
    title: 'Project Nova: Decentralized Storage Network',
    description: 'Announcing the launch of Project Nova, a peer-to-peer storage solution offering enhanced privacy and data sovereignty. Join the revolution!',
    type: 'launch',
    data: { launchDate: '2024-09-01', token: 'NOVA', targetUsers: '1M+' },
  },
  {
    id: 'news-003',
    title: 'The Future of Work: AI Co-pilots and Human Collaboration',
    description: 'Explore how AI co-pilots are transforming workplaces, augmenting human capabilities, and reshaping job roles across industries.',
    type: 'news',
    data: { publication: 'Innovatech Insights', readingTime: '8 min read' },
  },
  {
    id: 'forum-004',
    title: 'Discussion: Best Developer Tools for 2024',
    description: 'What are your go-to developer tools this year? Share your recommendations for IDEs, frameworks, APIs, and productivity enhancers.',
    type: 'forum_topic',
    data: { replies: 78, views: 2300, tags: ['developer', 'tools', 'productivity'] },
  },
];


// 1. Basic Search Page: Initial state, no results returned for the default empty query.
const basicSearchPageMocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: SEARCH_PAGE_INTERNAL_QUERY_GQL,
      variables: { options: initialSearchVariables },
    },
    result: {
      data: {
        search: [], // No results for the initial empty query
      },
    },
  },
];

export const BasicSearchPage = () => (
  <PlatformMockProvider>
    <ApolloMockedProvider mocks={basicSearchPageMocks} addTypename={false}>
      <SearchPage />
    </ApolloMockedProvider>
  </PlatformMockProvider>
);

// 2. Search Page With Results: Initial page load shows a predefined set of results.
const searchPageWithResultsMocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: SEARCH_PAGE_INTERNAL_QUERY_GQL,
      variables: { options: initialSearchVariables }, // SearchPage makes this query on load
    },
    result: {
      data: {
        search: mockPlainResults,
      },
    },
  },
];

export const SearchPageWithResults = () => (
  <PlatformMockProvider>
    <ApolloMockedProvider mocks={searchPageWithResultsMocks} addTypename={false}>
      <SearchPage />
    </ApolloMockedProvider>
  </PlatformMockProvider>
);

// 3. Search Page Loading State: Simulates the loading state of the page.
const searchPageLoadingMocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: SEARCH_PAGE_INTERNAL_QUERY_GQL,
      variables: { options: initialSearchVariables },
    },
    // Result as a promise that never resolves simulates indefinite loading
    // The SearchPage component's internal useSearch hook will have `loading: true`.
    delay: 100000, // Simulate a long delay
  },
];

export const SearchPageLoadingState = () => (
  <PlatformMockProvider>
    <ApolloMockedProvider mocks={searchPageLoadingMocks} addTypename={false}>
      <SearchPage />
    </ApolloMockedProvider>
  </PlatformMockProvider>
);

// 4. Search Page Error State: Simulates an error occurring during data fetching.
const searchPageErrorMocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: SEARCH_PAGE_INTERNAL_QUERY_GQL,
      variables: { options: initialSearchVariables },
    },
    error: new Error('Simulated GraphQL Network Error: Unable to connect to the search service.'),
  },
];

export const SearchPageErrorState = () => (
  <PlatformMockProvider>
    <ApolloMockedProvider mocks={searchPageErrorMocks} addTypename={false}>
      <SearchPage />
    </ApolloMockedProvider>
  </PlatformMockProvider>
);