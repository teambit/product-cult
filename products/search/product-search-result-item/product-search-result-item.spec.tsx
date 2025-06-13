import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SearchResult } from '@infinity/search.entities.search-result';
import { ProductSearchResultItem } from './product-search-result-item.js';
import styles from './product-search-result-item.module.scss';

describe('ProductSearchResultItem', () => {
  const searchResult = new SearchResult(
    "prod-app-1",
    "AI Powered Code Assistant Pro",
    "Revolutionize your development workflow with our AI-powered code assistant.",
    "product",
    { id: "ai-code-assist-pro-001", category: "Developer Tools", price: "29.99/month" },
    "https://example.com/image.jpg"
  );

  it('should render the product search result item with image and title', () => {
    const { container } = render(
      <MockProvider>
        <ProductSearchResultItem searchResult={searchResult} />
      </MockProvider>
    );

    const image = container.querySelector(`.${styles.image}`) as HTMLImageElement;
    const title = container.querySelector(`.${styles.title}`);

    expect(image).toBeInTheDocument();
    expect(image.src).toBe("https://example.com/image.jpg");
    expect(title).toHaveTextContent("AI Powered Code Assistant Pro");
  });

  it('should render the product search result item with description', () => {
    const { container } = render(
      <MockProvider>
        <ProductSearchResultItem searchResult={searchResult} />
      </MockProvider>
    );

    const description = container.querySelector(`.${styles.description}`);
    expect(description).toHaveTextContent("Revolutionize your development workflow with our AI-powered code assistant.");
  });
});
