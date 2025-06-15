import React from 'react';
import { gql } from '@apollo/client';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { Paragraph } from '@infinity/design.typography.paragraph';
import { UpvoteCount } from './upvote-count.js';

// Define GraphQL query (mirroring the one in upvote-count.tsx)
const GET_UPVOTE_COUNT = gql`
  query GetUpvoteCount($options: GetUpvoteCountOptionsInput!) {
    getUpvoteCount(options: $options)
  }
`;

// Define types for mock responses and variables
type GetUpvoteCountQueryData = {
  getUpvoteCount: number;
};

type GetUpvoteCountQueryVars = {
  options: {
    itemId: string;
    itemType: string;
  };
};

const commonWrapperStyle: React.CSSProperties = {
  padding: 'var(--spacing-medium)',
  border: '1px solid var(--colors-border-subtle)',
  borderRadius: 'var(--borders-radius-medium)',
  marginBottom: 'var(--spacing-large)',
  backgroundColor: 'var(--colors-surface-primary)',
  color: 'var(--colors-text-primary)',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--typography-sizes-heading-h5)',
  color: 'var(--colors-text-primary)',
  marginBottom: 'var(--spacing-small)',
  fontWeight: 'var(--typography-font-weight-semi-bold)',
};

export const BasicUpvoteDisplay = () => {
  const mocks: ReadonlyArray<MockedResponse<GetUpvoteCountQueryData, GetUpvoteCountQueryVars>> = [
    {
      request: {
        query: GET_UPVOTE_COUNT,
        variables: { options: { itemId: 'product-alpha', itemType: 'product' } },
      },
      result: {
        data: { getUpvoteCount: 1056 },
      },
    },
  ];

  return (
    <MockProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <div style={commonWrapperStyle}>
          <Paragraph style={titleStyle} element="h3">Basic Upvote Count</Paragraph>
          <Paragraph>Displaying the current upvote tally for a popular product (ID: product-alpha):</Paragraph>
          <UpvoteCount itemId="product-alpha" itemType="product" />
        </div>
      </MockedProvider>
    </MockProvider>
  );
};

export const UpvoteCountWithAffixesAndCustomElement = () => {
  const mocks: ReadonlyArray<MockedResponse<GetUpvoteCountQueryData, GetUpvoteCountQueryVars>> = [
    {
      request: {
        query: GET_UPVOTE_COUNT,
        variables: { options: { itemId: 'launch-beta', itemType: 'launch' } },
      },
      result: {
        data: { getUpvoteCount: 87 },
      },
    },
  ];

  return (
    <MockProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <div style={commonWrapperStyle}>
          <Paragraph style={titleStyle} element="h3">Upvote Count with Affixes & Custom Element</Paragraph>
          <Paragraph>Showcasing upvotes for a new launch (ID: launch-beta), with custom text and displayed as a distinct paragraph:</Paragraph>
          <UpvoteCount
            itemId="launch-beta"
            itemType="launch"
            prefix="Total Upvotes: "
            suffix="! Keep 'em coming! 🚀"
            element="p" 
            style={{ 
              marginTop: 'var(--spacing-small)', 
              fontWeight: 'var(--typography-font-weight-bold)',
              color: 'var(--colors-text-accent)' 
            }}
          />
        </div>
      </MockedProvider>
    </MockProvider>
  );
};

export const UpvoteCountLoadingState = () => {
  const loadingMocks: ReadonlyArray<MockedResponse<GetUpvoteCountQueryData, GetUpvoteCountQueryVars>> = [
    {
      request: {
        query: GET_UPVOTE_COUNT,
        variables: { options: { itemId: 'loading-item-gamma', itemType: 'product' } },
      },
      result: (() => new Promise(() => {})) as any, // Promise that never resolves to simulate loading
    },
  ];

  return (
    <MockProvider>
      <MockedProvider mocks={loadingMocks} addTypename={false}>
        <div style={commonWrapperStyle}>
          <Paragraph style={titleStyle} element="h3">Upvote Count - Loading State</Paragraph>
          <Paragraph>Simulating the loading phase while fetching upvote data for item (ID: loading-item-gamma):</Paragraph>
          <UpvoteCount itemId="loading-item-gamma" itemType="product" prefix="Loading votes: " />
        </div>
      </MockedProvider>
    </MockProvider>
  );
};

export const UpvoteCountErrorState = () => {
  const errorMocks: ReadonlyArray<MockedResponse<GetUpvoteCountQueryData, GetUpvoteCountQueryVars>> = [
    {
      request: {
        query: GET_UPVOTE_COUNT,
        variables: { options: { itemId: 'error-item-delta', itemType: 'article' } },
      },
      error: new Error('Network Error: Unable to retrieve upvote count.'),
    },
  ];

  return (
    <MockProvider>
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <div style={commonWrapperStyle}>
          <Paragraph style={titleStyle} element="h3">Upvote Count - Error State</Paragraph>
          <Paragraph>Demonstrating the component's appearance when data fetching encounters an issue for article (ID: error-item-delta):</Paragraph>
          <UpvoteCount itemId="error-item-delta" itemType="article" prefix="Vote count: " />
        </div>
      </MockedProvider>
    </MockProvider>
  );
};