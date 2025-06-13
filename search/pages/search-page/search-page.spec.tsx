import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import type { SearchOptionsInput } from '@infinity/search.hooks.use-search';
import { gql } from '@apollo/client';
import { SearchPage } from './search-page.js';
import styles from './search-page.module.scss';

const SEARCH_PAGE_INTERNAL_QUERY_GQL = gql`
  query SearchPageInternalSearchQuery($options: SearchOptionsInput!) {
    search(options: $options) {
      id
      title
      description
      imageUrl
      type
      data
    }
  }
`;

const mockPlainResults = [
  {
    id: 'prod-001',
    title: 'AI Powered Note Taker "ScribeAI"',
    description: 'Automatically transcribe, summarize, and organize your meetings and lectures with ScribeAI, the intelligent note-taking assistant.',
    type: 'product',
    data: { category: 'Productivity', version: '2.1', upvotes: 1450 },
  },
];

const initialSearchVariables: SearchOptionsInput = {
  query: '',
  limit: 20,
  offset: 0,
};

const basicSearchPageMocks = [
  {
    request: {
      query: SEARCH_PAGE_INTERNAL_QUERY_GQL,
      variables: { options: initialSearchVariables },
    },
    result: {
      data: {
        search: [],
      },
    },
  },
];

const searchPageWithResultsMocks = [
  {
    request: {
      query: SEARCH_PAGE_INTERNAL_QUERY_GQL,
      variables: { options: initialSearchVariables },
    },
    result: {
      data: {
        search: mockPlainResults,
      },
    },
  },
];

describe('SearchPage', () => {
  it('should render the search page title', () => {
    const { container } = render(
      <MemoryRouter>
        <MockedProvider mocks={basicSearchPageMocks} addTypename={false}>
          <SearchPage />
        </MockedProvider>
      </MemoryRouter>
    );

    const titleElement = container.querySelector(`.${styles.pageTitle}`);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement?.textContent).toBe('Discover Content');
  });

  it('should execute search when the search button is clicked', async () => {
    const { container, findByText } = render(
      <MemoryRouter>
        <MockedProvider mocks={basicSearchPageMocks} addTypename={false}>
          <SearchPage />
        </MockedProvider>
      </MemoryRouter>
    );

    const searchInput = container.querySelector(`.${styles.searchInput}`) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    const searchButton = await findByText('Search');
    fireEvent.click(searchButton);

    expect(searchInput.value).toBe('test query');
  });
});