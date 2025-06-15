import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UserUpvotesPage } from './user-upvotes-page.js';
import { mockUpvotes, PlainUpvote } from '@infinity/upvotes.entities.upvote';
import styles from './user-upvotes-page.module.scss';
import { useUpvote, UseUpvoteResult } from '@infinity/upvotes.hooks.use-upvote';
import { vi } from 'vitest';

vi.mock('@infinity/upvotes.hooks.use-upvote');

const mockUseUpvote = vi.mocked(useUpvote);

describe('UserUpvotesPage', () => {
  const mockUpvotesData: PlainUpvote[] = mockUpvotes().map(upvote => upvote.toObject());

  beforeEach(() => {
    // Provide a default mock implementation for useUpvote
    mockUseUpvote.mockReturnValue({
      count: 0,
      hasUpvoted: true,
      upvote: vi.fn().mockResolvedValue(undefined),
      downvote: vi.fn().mockResolvedValue(undefined),
      loadingCount: false,
      loadingStatus: false,
      loadingAction: false,
      errorCount: undefined,
      errorStatus: undefined,
      errorAction: undefined,
      refetchCount: vi.fn().mockResolvedValue({ data: { getUpvoteCount: 0 } } as any),
      refetchStatus: vi.fn().mockResolvedValue({ data: { getUserUpvoteStatus: true } } as any),
    } as UseUpvoteResult);
  });

  it('renders the page title', () => {
    const { container } = render(
      <MockProvider>
        <UserUpvotesPage initialUserUpvotes={mockUpvotesData} />
      </MockProvider>,
    );
    const titleElement = container.querySelector(`.${styles.pageTitle}`);
    expect(titleElement).toBeInTheDocument();
    expect((titleElement as HTMLElement).textContent).toBe('My Upvotes');
  });

  it('renders a list of upvoted items', () => {
    // This specific test can still override the default mock if needed
    mockUseUpvote.mockReturnValue({
      count: 10,
      hasUpvoted: true,
      upvote: vi.fn().mockResolvedValue(undefined),
      downvote: vi.fn().mockResolvedValue(undefined),
      loadingAction: false,
      loadingCount: false,
      loadingStatus: false,
      errorAction: undefined,
      errorCount: undefined,
      errorStatus: undefined,
      refetchCount: vi.fn().mockResolvedValue({ data: { getUpvoteCount: 10 } } as any),
      refetchStatus: vi.fn().mockResolvedValue({ data: { getUserUpvoteStatus: true } } as any),
    } as UseUpvoteResult);

    const { container } = render(
      <MockProvider>
        <UserUpvotesPage initialUserUpvotes={mockUpvotesData} />
      </MockProvider>
    );

    const items = container.querySelectorAll(`.${styles.upvotedItemCard}`);
    expect(items.length).toBe(mockUpvotesData.length);
  });

  it('renders the empty state when no upvotes are present', () => {
    const { container } = render(
      <MockProvider>
        <UserUpvotesPage initialUserUpvotes={[]} />
      </MockProvider>
    );

    const emptyStateMessage = container.querySelector(`.${styles.emptyStateMessage}`);
    expect(emptyStateMessage).toBeInTheDocument();
  });
});