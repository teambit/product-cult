import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { UpvoteCount } from './upvote-count.js';
import styles from './upvote-count.module.scss';
import { gql } from '@apollo/client';

const GET_UPVOTE_COUNT = gql`
  query GetUpvoteCount($options: GetUpvoteCountOptionsInput!) {
    getUpvoteCount(options: $options)
  }
`;

const mocks = [
  {
    request: {
      query: GET_UPVOTE_COUNT,
      variables: { options: { itemId: 'test-item', itemType: 'product' } },
    },
    result: {
      data: { getUpvoteCount: 42 },
    },
  },
];

describe('UpvoteCount', () => {
  it('renders the upvote count', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpvoteCount itemId="test-item" itemType="product" />
      </MockedProvider>
    );

    // Wait for the data to load
    await screen.findByText('42');

    const paragraphElement = container.querySelector(`.${styles.upvoteCount}`);
    expect(paragraphElement).toBeInTheDocument();
  });

  it('renders loading state', () => {
    const loadingMocks = [
      {
        request: {
          query: GET_UPVOTE_COUNT,
          variables: { options: { itemId: 'loading-item', itemType: 'product' } },
        },
        result: (() => new Promise(() => {})) as any, // Promise that never resolves to simulate loading
      },
    ];

    const { container } = render(
      <MockedProvider mocks={loadingMocks} addTypename={false}>
        <UpvoteCount itemId="loading-item" itemType="product" />
      </MockedProvider>
    );
    
    const paragraphElement = container.querySelector(`.${styles.loadingState}`);
    expect(paragraphElement).toBeInTheDocument();
  });

  it('renders error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_UPVOTE_COUNT,
          variables: { options: { itemId: 'error-item', itemType: 'product' } },
        },
        error: new Error('Network error'),
      },
    ];
  
    const { container } = render(
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <UpvoteCount itemId="error-item" itemType="product" />
        </MockedProvider>
      );
  
      // Wait for the component to render something (the error state)
      await screen.findByText('—');
      const paragraphElement = container.querySelector(`.${styles.errorState}`);
      expect(paragraphElement).toBeInTheDocument();
  });
});