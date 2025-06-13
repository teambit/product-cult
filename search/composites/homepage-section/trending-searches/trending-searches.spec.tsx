import { render } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { TrendingSearches } from './trending-searches.js';
import styles from './trending-searches.module.scss';

describe('TrendingSearches', () => {
  it('renders the default title if no title prop is provided', () => {
    const { container } = render(
      <MockProvider>
        <TrendingSearches />
      </MockProvider>
    );
    const titleElement = container.querySelector('.title');
    expect(titleElement).toHaveTextContent('Trending Searches');
  });

  it('renders the trending items as links', () => {
    const trendingItems = [{ term: 'Test Item 1' }, { term: 'Test Item 2' }];
    const { container } = render(
      <MockProvider>
        <TrendingSearches items={trendingItems} />
      </MockProvider>
    );
    const linkElements = container.querySelectorAll(`.${styles.trendingItemLink}`);
    expect(linkElements.length).toBe(2);
    expect(linkElements[0]).toHaveTextContent('Test Item 1');
    expect((linkElements[0] as HTMLAnchorElement).href).toContain('/search?query=Test%20Item%201');
  });

  it('renders a message when there are no trending items', () => {
    const { container } = render(
      <MockProvider>
        <TrendingSearches items={[]} />
      </MockProvider>
    );
    const noItemsMessage = container.querySelector(`.${styles.noItemsMessage}`);
    expect(noItemsMessage).toHaveTextContent('No trending searches to display at the moment. Check back soon!');
  });
});