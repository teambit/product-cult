import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { FeaturedProducts } from './featured-products.js';
import styles from './featured-products.module.scss';

describe('FeaturedProducts Component', () => {
  it('should render title and loading message when loading', () => {
    const { container } = render(
      <MockProvider>
        <FeaturedProducts categoryId="test-category" loadingState={<p>Custom Loading...</p>} />
      </MockProvider>
    );

    expect(container.querySelector(`.${styles.sectionTitle}`)).toBeInTheDocument();
    expect(screen.getByText('Custom Loading...')).toBeInTheDocument();
  });
});
