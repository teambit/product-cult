import React from 'react';
import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { mockReviews } from '@infinity/reviews.entities.review';
import { ReviewList } from './review-list.js';
import styles from './review-list.module.scss';

describe('ReviewList', () => {
  it('should render an empty state message when no reviews are provided', () => {
    const { container } = render(
      <MockProvider>
        <ReviewList reviews={[]} />
      </MockProvider>
    );

    const emptyStateContainer = container.querySelector(`.${styles.emptyStateContainer}`);
    expect(emptyStateContainer).toBeInTheDocument();
    const emptyStateText = container.querySelector(`.${styles.emptyStateText}`);
    expect(emptyStateText).toBeInTheDocument();
    expect(emptyStateText?.textContent).toBe('No reviews available yet.');
  });

  it('should render a list of ReviewCard components when reviews are provided', () => {
    const reviews = mockReviews();
    const { container } = render(
      <MockProvider>
        <ReviewList reviews={reviews} />
      </MockProvider>
    );

    const reviewListContainer = container.querySelector(`.${styles.reviewListContainer}`);
    expect(reviewListContainer).toBeInTheDocument();

    const reviewCards = container.querySelectorAll(`.${styles.reviewCardElement}`);
    expect(reviewCards.length).toBe(reviews.length);
  });

  it('should apply the grid layout class by default', () => {
    const reviews = mockReviews();
    const { container } = render(
      <MockProvider>
        <ReviewList reviews={reviews} />
      </MockProvider>
    );

    const reviewListContainer = container.querySelector(`.${styles.reviewListContainer}`);
    expect(reviewListContainer).toHaveClass(styles.gridLayout);
  });
});