import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ProductReviewsPage } from './product-reviews-page.js';
import styles from './product-reviews-page.module.scss';
import type { Review } from './review-type.js';
import { MemoryRouter } from 'react-router-dom';

describe('ProductReviewsPage', () => {
  const mockReviews: Review[] = [
    {
      id: 'rev-001',
      productId: 'prod-123',
      userId: 'user-456',
      rating: 5,
      comment: 'Great product!',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'approved',
      toObject: function() {
        return {
          id: this.id,
          productId: this.productId,
          userId: this.userId,
          rating: this.rating,
          comment: this.comment,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
          status: this.status,
        };
      },
    },
  ];

  it('renders the page header with the product ID', () => {
    const productId = 'prod-123';
    const { container } = render(
        <MockProvider>
          <ProductReviewsPage productId={productId} mockReviews={mockReviews} />
        </MockProvider>
    );
    const headerElement = container.querySelector(`.${styles.pageHeader}`);
    expect(headerElement).toHaveTextContent(`Reviews for Product ${productId}`);
  });

  it('renders the ReviewList component with reviews', () => {
    const productId = 'prod-123';
    const { container } = render(
        <MockProvider>
          <ProductReviewsPage productId={productId} mockReviews={mockReviews} />
        </MockProvider>
    );
    expect(container.querySelector('.reviewListContainer')).toBeInTheDocument();
  });

  it('renders loading message when loading', () => {
    const productId = 'prod-123';
    // For this test, we don't pass mockReviews, so it should try to load
    const { container } = render(
        <MockProvider>
          <ProductReviewsPage productId={productId} />
        </MockProvider>
    );
    const loadingContainer = container.querySelector(`.${styles.loadingContainer}`);
    expect(loadingContainer).toBeInTheDocument();
    const loadingMessageElement = container.querySelector(`.${styles.loadingMessage}`);
    expect(loadingMessageElement).toBeInTheDocument();
    expect(loadingMessageElement).toHaveTextContent('Loading reviews...');
  });
});
