import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { SearchResultsList } from './search-results-list.js';
import type { PlainSearchResult } from '@infinity/search.entities.search-result';
import styles from './search-results-list.module.scss';

describe('SearchResultsList', () => {
  const mockResults: PlainSearchResult[] = [
    {
      id: '1',
      title: 'Test Product',
      description: 'A test product description.',
      type: 'product',
      data: { url: '/test-product' },
    },
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <MockProvider>
        <SearchResultsList results={mockResults} />
      </MockProvider>
    );
    expect(container).toBeInTheDocument();
  });

  it('displays a list of search results', () => {
    const { container } = render(
      <MockProvider>
        <SearchResultsList results={mockResults} />
      </MockProvider>
    );
    const listItem = container.querySelector(`.${styles.searchResultItem}`);
    expect(listItem).toBeInTheDocument();
  });

  it('calls onItemLinkClick when a result item is clicked', () => {
    const onItemLinkClick = vi.fn();
    const { container } = render(
      <MockProvider>
        <SearchResultsList results={mockResults} onItemLinkClick={onItemLinkClick} />
      </MockProvider>
    );

    const linkElement = container.querySelector(`.${styles.resultTitleLink}`) as HTMLAnchorElement;
    fireEvent.click(linkElement);
    expect(onItemLinkClick).toHaveBeenCalledTimes(1);
  });

  it('renders the empty state when no results are passed', () => {
    const { container } = render(
      <MockProvider>
        <SearchResultsList results={[]} />
      </MockProvider>
    );
    const emptyStateElement = container.querySelector(`.${styles.emptyState}`);
    expect(emptyStateElement).toBeInTheDocument();
  });
});