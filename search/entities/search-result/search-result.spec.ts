import { SearchResult } from './search-result.js';

describe('SearchResult', () => {
  it('should create a SearchResult instance from a plain object', () => {
    const plainSearchResult = {
      id: '123',
      title: 'Test Result',
      description: 'This is a test result.',
      type: 'test',
      data: { url: 'http://example.com' },
      imageUrl: 'http://example.com/image.jpg'
    };

    const searchResult = SearchResult.from(plainSearchResult);

    expect(searchResult.id).toBe('123');
    expect(searchResult.title).toBe('Test Result');
    expect(searchResult.description).toBe('This is a test result.');
    expect(searchResult.type).toBe('test');
    expect(searchResult.data).toEqual({ url: 'http://example.com' });
    expect(searchResult.imageUrl).toBe('http://example.com/image.jpg');
  });

  it('should serialize a SearchResult instance to a plain object', () => {
    const searchResult = new SearchResult(
      '456',
      'Another Result',
      'This is another test result.',
      'another',
      { info: 'more info' },
      'http://example.com/another.jpg'
    );

    const plainObject = searchResult.toObject();

    expect(plainObject.id).toBe('456');
    expect(plainObject.title).toBe('Another Result');
    expect(plainObject.description).toBe('This is another test result.');
    expect(plainObject.type).toBe('another');
    expect(plainObject.data).toEqual({ info: 'more info' });
    expect(plainObject.imageUrl).toBe('http://example.com/another.jpg');
  });

  it('should handle undefined data gracefully when creating a SearchResult', () => {
    const plainSearchResult = {
      id: '789',
      title: 'Result with no data',
      description: 'This result has no additional data.',
      type: 'no-data',
      imageUrl: 'http://example.com/no-data.jpg'
    } as any; // Cast to any to simulate missing 'data' property

    const searchResult = SearchResult.from(plainSearchResult);

    expect(searchResult.data).toEqual({});
  });
});