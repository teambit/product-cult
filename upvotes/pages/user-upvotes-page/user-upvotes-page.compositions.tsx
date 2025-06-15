import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserUpvotesPage } from './user-upvotes-page.js';
import { mockUpvotes as generatePlatformMockUpvotes, PlainUpvote, Upvote } from '@infinity/upvotes.entities.upvote';

// Helper to generate a specific number of PlainUpvote objects
const getPlainMockUpvotes = (count: number): PlainUpvote[] => {
  return generatePlatformMockUpvotes().slice(0, count).map((upvote: Upvote) => upvote.toObject());
};

/**
 * Displays the UserUpvotesPage with a few items.
 * Data is provided via the `initialUserUpvotes` prop.
 */
export const UserUpvotesPageWithItems = () => {
  const fewUpvotes = getPlainMockUpvotes(3);
  // Manually adjust one item for more variety in presentation if needed
  if (fewUpvotes.length > 0) {
    fewUpvotes[0].itemId = "Product-Alpha-123";
    fewUpvotes[0].itemType = "Product";
  }
  if (fewUpvotes.length > 1) {
    fewUpvotes[1].itemId = "Launch-Beta-456";
    fewUpvotes[1].itemType = "Launch";
    fewUpvotes[1].createdAt = new Date(Date.now() - 86400000 * 5).toISOString(); // 5 days ago
  }


  return (
    <MockProvider>
      <UserUpvotesPage initialUserUpvotes={fewUpvotes} />
    </MockProvider>
  );
};

/**
 * Displays the UserUpvotesPage in its empty state.
 * An empty array is passed to `initialUserUpvotes`.
 */
export const UserUpvotesPageEmpty = () => {
  return (
    <MockProvider>
      <UserUpvotesPage initialUserUpvotes={[]} />
    </MockProvider>
  );
};

/**
 * Displays the UserUpvotesPage relying on its internal default mock data.
 * The `initialUserUpvotes` prop is not provided.
 * The component's internal logic should use `mockUpvotes()` from the entity package.
 */
export const UserUpvotesPageDefaultFallback = () => {
  return (
    <MockProvider>
      <UserUpvotesPage />
    </MockProvider>
  );
};

/**
 * Displays the UserUpvotesPage with a larger number of items to demonstrate layout and scrolling.
 */
export const UserUpvotesPageWithManyItems = () => {
  const manyUpvotes = getPlainMockUpvotes(10); // Generate 10 mock upvotes
  return (
    <MockProvider>
      <UserUpvotesPage initialUserUpvotes={manyUpvotes} />
    </MockProvider>
  );
};