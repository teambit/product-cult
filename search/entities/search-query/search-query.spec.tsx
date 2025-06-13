import { SearchQuery } from './search-query.js';
import { mockSearchQuery } from './search-query.mock.js';

describe('SearchQuery', () => {
  it('should create a SearchQuery instance with default values', () => {
    const searchQuery = new SearchQuery('test');
    expect(searchQuery.keywords).toBe('test');
    expect(searchQuery.contentTypeFilters).toEqual([]);
    expect(searchQuery.page).toBe(1);
    expect(searchQuery.pageSize).toBe(10);
  });

  it('should create a SearchQuery instance from a plain object', () => {
    const plainSearchQuery = {
      keywords: 'test',
      contentTypeFilters: ['product'],
      page: 2,
      pageSize: 20,
    };
    const searchQuery = SearchQuery.from(plainSearchQuery);
    expect(searchQuery.keywords).toBe('test');
    expect(searchQuery.contentTypeFilters).toEqual(['product']);
    expect(searchQuery.page).toBe(2);
    expect(searchQuery.pageSize).toBe(20);
  });

  it('should create a mock SearchQuery instance', () => {
    const mock = mockSearchQuery({ keywords: 'override' });
    expect(mock.keywords).toBe('override');
  });
});