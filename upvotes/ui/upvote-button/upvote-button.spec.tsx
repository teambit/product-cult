import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { UpvoteButton } from './upvote-button.js';
import styles from './upvote-button.module.scss';
import { useUpvote } from '@infinity/upvotes.hooks.use-upvote';
import { vi, type MockedFunction } from 'vitest';

vi.mock('@infinity/upvotes.hooks.use-upvote');

describe('UpvoteButton', () => {
  const mockUpvote = vi.fn();
  const mockDownvote = vi.fn();
  const mockRefetchCount = vi.fn();
  const mockRefetchStatus = vi.fn();

  const mockedUseUpvote = useUpvote as MockedFunction<typeof useUpvote>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementation for most tests
    mockedUseUpvote.mockReturnValue({
      count: 10,
      hasUpvoted: false,
      upvote: mockUpvote,
      downvote: mockDownvote,
      loadingAction: false,
      loadingCount: false,
      loadingStatus: false,
      refetchCount: mockRefetchCount,
      refetchStatus: mockRefetchStatus,
    });
  });

  it('renders with initial count and correct icon state when not upvoted', () => {
    const { container } = render(
      <MockProvider>
        <UpvoteButton itemId="test-item" itemType="product" initialCount={10} />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.count}`)?.textContent).toBe('10');
    expect(container.querySelector(`.${styles.upvoteButton}`)?.classList.contains(styles.isActive)).toBe(false);
  });

  it('renders in active state when initialHasUpvoted is true', () => {
    mockedUseUpvote.mockReturnValue({
      count: 10,
      hasUpvoted: true,
      upvote: mockUpvote,
      downvote: mockDownvote,
      loadingAction: false,
      loadingCount: false,
      loadingStatus: false,
      refetchCount: mockRefetchCount,
      refetchStatus: mockRefetchStatus,
    });

    const { container } = render(
      <MockProvider>
        <UpvoteButton itemId="test-item" itemType="product" initialCount={10} initialHasUpvoted={true} />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.upvoteButton}`)?.classList.contains(styles.isActive)).toBe(true);
  });

  it('calls upvote when not upvoted and clicked', () => {
    // Uses default mock from beforeEach (hasUpvoted: false)
    const { container } = render(
      <MockProvider>
        <UpvoteButton itemId="test-item" itemType="product" initialCount={10} />
      </MockProvider>
    );

    const button = container.querySelector(`.${styles.upvoteButton}`);
    fireEvent.click(button as Element);
    expect(mockUpvote).toHaveBeenCalledTimes(1);
    expect(mockDownvote).not.toHaveBeenCalled();
  });

  it('calls downvote when upvoted and clicked', () => {
    mockedUseUpvote.mockReturnValue({
      count: 10,
      hasUpvoted: true,
      upvote: mockUpvote,
      downvote: mockDownvote,
      loadingAction: false,
      loadingCount: false,
      loadingStatus: false,
      refetchCount: mockRefetchCount,
      refetchStatus: mockRefetchStatus,
    });

    const { container } = render(
      <MockProvider>
        <UpvoteButton itemId="test-item" itemType="product" initialCount={10} initialHasUpvoted={true}/>
      </MockProvider>
    );
    const button = container.querySelector(`.${styles.upvoteButton}`);
    fireEvent.click(button as Element);

    expect(mockDownvote).toHaveBeenCalledTimes(1);
    expect(mockUpvote).not.toHaveBeenCalled();
  });
});
