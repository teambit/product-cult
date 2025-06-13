import React from 'react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductReviewsTab } from './product-reviews-tab.js';
import { Review, mockReview } from '@infinity/reviews.entities.review'; // Changed import

const mockReviewsForProductAIWriter: Review[] = [
  mockReview({
    id: 'rev-ph-1',
    productId: 'ai-writer-pro',
    userId: 'user-innovator-123',
    rating: 5,
    comment: 'AI Writer Pro has revolutionized my content creation workflow. The suggestions are spot-on and it integrates seamlessly with my existing tools. A must-have for any digital marketer!',
    createdAt: new Date('2024-07-20T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-20T11:30:00Z').toISOString(),
    status: 'approved',
  }),
  mockReview({
    id: 'rev-ph-2',
    productId: 'ai-writer-pro',
    userId: 'user-developer-456',
    rating: 4,
    comment: 'A great writing assistant for technical documentation as well. Helps maintain consistency and clarity. Could use a dark mode for the editor plugin.',
    createdAt: new Date('2024-07-18T14:30:00Z').toISOString(),
    updatedAt: new Date('2024-07-18T14:30:00Z').toISOString(),
    status: 'approved',
  }),
  mockReview({
    id: 'rev-ph-3',
    productId: 'ai-writer-pro',
    userId: 'user-marketer-789',
    rating: 5,
    comment: 'Our team adopted AI Writer Pro last quarter and the productivity gains are already visible. The API is also well-documented, allowing for custom integrations.',
    createdAt: new Date('2024-07-15T09:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-15T09:00:00Z').toISOString(),
    status: 'approved',
  }),
];

const emptyMockReviews: Review[] = [];

const commonCompositionWrapperStyle: React.CSSProperties = {
  padding: 'var(--spacing-large)',
  backgroundColor: 'var(--colors-surface-background)',
  minHeight: '400px', // Ensure enough space to see the component
};

const commonHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--typography-font-family)',
  color: 'var(--colors-text-primary)',
  marginBottom: 'var(--spacing-medium)',
  fontSize: 'var(--typography-sizes-heading-h3)',
};

export const ProductReviewsTabWithData = () => (
  <MockProvider>
    <div style={commonCompositionWrapperStyle}>
      <h2 style={commonHeadingStyle}>
        Reviews for "AI Writer Pro"
      </h2>
      <ProductReviewsTab productId="ai-writer-pro" mockReviewsData={mockReviewsForProductAIWriter} />
    </div>
  </MockProvider>
);

export const ProductReviewsTabEmptyState = () => (
  <MockProvider>
    <div style={commonCompositionWrapperStyle}>
      <h2 style={commonHeadingStyle}>
        Reviews for "New Product X" (No Reviews Yet)
      </h2>
      <ProductReviewsTab productId="new-product-x" mockReviewsData={emptyMockReviews} />
    </div>
  </MockProvider>
);

/**
 * This composition attempts to show the error state by not providing mockReviewsData.
 * The internal useListReviews hook will try to fetch data. Since MockProvider's
 * Apollo MockedProvider doesn't have a specific mock for this query by default,
 * it should result in an error, which the ProductReviewsTab component is designed to handle.
 * A loading state might be briefly visible before the error appears.
 */
export const ProductReviewsTabErrorState = () => (
  <MockProvider>
    <div style={commonCompositionWrapperStyle}>
      <h2 style={commonHeadingStyle}>
        Reviews for "Offline Product Z" (Data Fetch Error)
      </h2>
      <ProductReviewsTab productId="offline-product-z" />
    </div>
  </MockProvider>
);