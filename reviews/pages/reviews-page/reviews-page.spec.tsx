import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useListReviews } from '@infinity/reviews.hooks.use-reviews';
import { vi, type MockedFunction } from 'vitest';
import { Review, PlainReview } from '@infinity/reviews.entities.review';
import { ReviewsPage, type ReviewsPageProps } from './reviews-page.js';
import styles from './reviews-page.module.scss';

vi.mock('@infinity/reviews.hooks.use-reviews', async () => {
  const originalModule = await vi.importActual('@infinity/reviews.hooks.use-reviews');
  return {
    ...originalModule,
    useListReviews: vi.fn(),
  };
});

const mockedUseListReviews = useListReviews as MockedFunction<typeof useListReviews>;

describe('ReviewsPage', () => {
  const sampleReviews: PlainReview[] = [
    {
      id: '1',
      productId: 'product1',
      userId: 'user1',
      rating: 5,
      comment: 'Great product!',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      status: 'approved',
    },
    {
      id: '2',
      productId: 'product1',
      userId: 'user2',
      rating: 4,
      comment: 'Good product.',
      createdAt: '2024-01-02T00:00:00.000Z',
      updatedAt: '2024-01-02T00:00:00.000Z',
      status: 'approved',
    },
  ];

  beforeEach(() => {
    mockedUseListReviews.mockReset();
  });

  it('renders loading state when fetching reviews', () => {
    mockedUseListReviews.mockReturnValue({
      reviews: undefined,
      loading: true,
      error: null,
    } as any); // Cast as any to satisfy broader hook return type if it includes more fields like refetch

    render(
      <MockProvider>
        <ReviewsPage />
      </MockProvider>
    );

    expect(screen.getByText('Loading reviews...')).toBeInTheDocument();
    const loadingStateDiv = screen.getByText('Loading reviews...').parentElement;
    expect(loadingStateDiv?.querySelector(`.${styles.spinner}`)).toBeInTheDocument();

    expect(mockedUseListReviews).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          productId: undefined,
          userId: undefined,
          limit: 20, // Default limit
          offset: undefined,
          status: undefined,
        }),
        mockData: undefined,
      })
    );
  });

  it('renders reviews when data is successfully fetched', () => {
    mockedUseListReviews.mockReturnValue({
      reviews: sampleReviews,
      loading: false,
      error: null,
    } as any);

    render(
      <MockProvider>
        <ReviewsPage />
      </MockProvider>
    );

    expect(screen.getByText(sampleReviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(sampleReviews[1].comment)).toBeInTheDocument();
    expect(screen.queryByText('Loading reviews...')).not.toBeInTheDocument();
    expect(screen.queryByText(/Could not load reviews/)).not.toBeInTheDocument();
  });

  it('renders error state when fetching reviews fails', () => {
    const errorMessage = 'Failed to fetch reviews';
    mockedUseListReviews.mockReturnValue({
      reviews: undefined,
      loading: false,
      error: new Error(errorMessage),
    } as any);

    render(
      <MockProvider>
        <ReviewsPage />
      </MockProvider>
    );

    expect(screen.getByText('Could not load reviews.')).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    expect(screen.queryByText('Loading reviews...')).not.toBeInTheDocument();
    expect(screen.queryByText(sampleReviews[0].comment)).not.toBeInTheDocument();
  });

  it('renders empty state when mockReviews prop is an empty array', () => {
    mockedUseListReviews.mockImplementation(({ mockData }: { mockData?: Review[] }) => {
      if (mockData && Array.isArray(mockData) && mockData.length === 0) {
        return { reviews: [], loading: false, error: null } as any;
      }
      return { reviews: undefined, loading: true, error: null } as any;
    });

    const { container } = render(
      <MockProvider>
        <ReviewsPage mockReviews={[]} />
      </MockProvider>
    );

    expect(mockedUseListReviews).toHaveBeenCalledWith(
      expect.objectContaining({
        mockData: [],
      })
    );
    
    const reviewListResults = container.querySelector(`.${styles.reviewListResults}`);
    expect(reviewListResults).toBeInTheDocument();
    expect(screen.queryByText(sampleReviews[0].comment)).not.toBeInTheDocument();
    // If ReviewList has a specific "no reviews" message, test for it here.
    // e.g., expect(screen.getByText('No reviews found.')).toBeInTheDocument();
  });

  it('passes filter props (productId, userId, etc.) to useListReviews', () => {
    mockedUseListReviews.mockReturnValue({ reviews: [], loading: false, error: null } as any);

    const props: ReviewsPageProps = {
      productId: 'test-product-id',
      userId: 'test-user-id',
      limit: 10,
      offset: 5,
      status: 'pending',
    };

    render(
      <MockProvider>
        <ReviewsPage {...props} />
      </MockProvider>
    );

    expect(mockedUseListReviews).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          productId: props.productId,
          userId: props.userId,
          limit: props.limit,
          offset: props.offset,
          status: props.status,
        }),
      })
    );
  });
});
