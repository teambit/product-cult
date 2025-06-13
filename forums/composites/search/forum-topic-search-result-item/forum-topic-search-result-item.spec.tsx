import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ForumTopicSearchResultItem } from './forum-topic-search-result-item.js';
import { SearchResult } from '@infinity/search.entities.search-result';
import styles from './forum-topic-search-result-item.module.scss';

describe('ForumTopicSearchResultItem', () => {
  const searchResult = new SearchResult(
    'topic-123',
    'Getting Started with Infinity Design System',
    'A comprehensive guide for developers and designers on how to integrate and utilize the Infinity Design System in your projects. Covers setup, component usage, and theming.',
    'forum-topic',
    { originalUrl: '/forums/topic-123' }
  );

  it('renders the title and description', () => {
    const { container } = render(
      <MemoryRouter>
        <ForumTopicSearchResultItem searchResult={searchResult} />
      </MemoryRouter>
    );

    const titleElement = container.querySelector(`.${styles.title}`);
    const descriptionElement = container.querySelector(`.${styles.description}`);

    expect(titleElement).toHaveTextContent(searchResult.title);
    expect(descriptionElement).toHaveTextContent(searchResult.description);
  });

  it('applies the correct link', () => {
    const { container } = render(
      <MemoryRouter>
        <ForumTopicSearchResultItem searchResult={searchResult} />
      </MemoryRouter>
    );

    const linkElement = container.querySelector(`.${styles.forumTopicSearchResultItem}`) as HTMLAnchorElement;

    expect(linkElement.getAttribute('href')).toBe('/forums/topic-123');
  });

  it('applies the correct styles', () => {
    const { container } = render(
      <MemoryRouter>
        <ForumTopicSearchResultItem searchResult={searchResult} />
      </MemoryRouter>
    );

    const linkElement = container.querySelector(`.${styles.forumTopicSearchResultItem}`);
    expect(linkElement).toBeInTheDocument();
  });
});