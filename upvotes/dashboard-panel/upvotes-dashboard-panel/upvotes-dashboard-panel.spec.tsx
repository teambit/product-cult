import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useUpvote } from '@infinity/upvotes.hooks.use-upvote';
import { UpvotesDashboardPanel } from './upvotes-dashboard-panel.js';
import styles from './upvotes-dashboard-panel.module.scss';
import { ApolloError } from '@apollo/client';

vi.mock('@infinity/upvotes.hooks.use-upvote');

const mockedUseUpvote = vi.mocked(useUpvote);

describe('UpvotesDashboardPanel', () => {
  it('should render title and loading indicator when loading', () => {
    mockedUseUpvote.mockReturnValue({
      count: undefined,
      hasUpvoted: undefined,
      upvote: vi.fn(),
      downvote: vi.fn(),
      loadingCount: true,
      loadingStatus: true,
      loadingAction: false,
      errorCount: undefined,
      errorStatus: undefined,
      errorAction: undefined,
      refetchCount: vi.fn(),
      refetchStatus: vi.fn(),
    });

    const { container } = render(
      <MemoryRouter>
        <UpvotesDashboardPanel itemId="test-item" itemType="product" title="Test Title" />
      </MemoryRouter>
    );

    expect(container.querySelector(`.${styles.panelTitle}`)?.textContent).toBe('Test Title');
    expect(container.querySelector(`.${styles.loadingIndicator}`)?.textContent).toBe('Loading Insights...');
  });

  it('should render error message when there is an error', () => {
    mockedUseUpvote.mockReturnValue({
      count: undefined,
      hasUpvoted: undefined,
      upvote: vi.fn(),
      downvote: vi.fn(),
      loadingCount: false,
      loadingStatus: false,
      loadingAction: false,
      errorCount: new ApolloError({ errorMessage: 'Count Error' }),
      errorStatus: new ApolloError({ errorMessage: 'Status Error' }),
      errorAction: undefined,
      refetchCount: vi.fn(),
      refetchStatus: vi.fn(),
    });

    const { container } = render(
      <MemoryRouter>
        <UpvotesDashboardPanel itemId="test-item" itemType="product" title="Test Title" />
      </MemoryRouter>
    );

    expect(container.querySelector(`.${styles.errorIndicator}`)?.textContent).toBe('Could not load upvote data.');
  });

  it('should render upvote count and user status when data is loaded', () => {
    mockedUseUpvote.mockReturnValue({
      count: 123,
      hasUpvoted: true,
      upvote: vi.fn(),
      downvote: vi.fn(),
      loadingCount: false,
      loadingStatus: false,
      loadingAction: false,
      errorCount: undefined,
      errorStatus: undefined,
      errorAction: undefined,
      refetchCount: vi.fn(),
      refetchStatus: vi.fn(),
    });

    const { container } = render(
      <MemoryRouter>
        <UpvotesDashboardPanel itemId="test-item" itemType="product" title="Test Title" />
      </MemoryRouter>
    );

    expect(container.querySelector(`.${styles.countValue}`)?.textContent).toBe('123');
    expect(container.querySelector(`.${styles.countLabel}`)?.textContent).toBe('Total Upvotes');
    expect(container.querySelector(`.${styles.userStatus}`)?.textContent).toBe("You've upvoted this");
  });
});