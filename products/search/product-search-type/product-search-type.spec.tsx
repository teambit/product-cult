import React from 'react';
import { render } from '@testing-library/react';
import ProductSearchType, { productSearchTypeEntry } from './product-search-type.js';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import styles from './product-search-type.module.scss';

describe('ProductSearchType', () => {
  it('should render the component with title and description', () => {
    const { container } = render(
      <MockProvider>
        <ProductSearchType />
      </MockProvider>
    );

    const titleElement = container.querySelector(`.${styles.infoTitle}`);
    const descriptionElement = container.querySelector(`.${styles.infoText}`);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should render the preview section with a title', () => {
    const { container } = render(
      <MockProvider>
        <ProductSearchType />
      </MockProvider>
    );

    const previewTitleElement = container.querySelector(`.${styles.previewTitle}`);
    expect(previewTitleElement).toBeInTheDocument();
  });

  it('should have productSearchTypeEntry to be defined', () => {
    expect(productSearchTypeEntry).toBeDefined();
    expect(productSearchTypeEntry.name).toBe('products');
  });
});