import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { ManageReviewsLink } from './manage-reviews-link.js';
import styles from './manage-reviews-link.module.scss';

describe('ManageReviewsLink', () => {
  it('should render a link with the default text', () => {
    const { container } = render(
      <MemoryRouter>
        <MockProvider noRouter>
          <ManageReviewsLink href="/user/reviews" />
        </MockProvider>
      </MemoryRouter>
    );
    const linkElement = container.querySelector(`.${styles.manageReviewsLink}`);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('Manage Reviews');
  });

  it('should render a link with custom text', () => {
    const { container } = render(
      <MemoryRouter>
        <MockProvider noRouter>
          <ManageReviewsLink href="/user/feedback">
            View and Edit My Product Feedback
          </ManageReviewsLink>
        </MockProvider>
      </MemoryRouter>
    );
    const linkElement = container.querySelector(`.${styles.manageReviewsLink}`);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('View and Edit My Product Feedback');
  });

  it('should apply a custom className to the link', () => {
    const customClassName = 'custom-link';
    const { container } = render(
      <MemoryRouter>
        <MockProvider noRouter>
          <ManageReviewsLink href="/custom" className={customClassName} />
        </MockProvider>
      </MemoryRouter>
    );
    const linkElement = container.querySelector(`.${customClassName}`);
    expect(linkElement).toBeInTheDocument();
    // Also check if the base style is applied
    expect(linkElement).toHaveClass(styles.manageReviewsLink);
  });
});