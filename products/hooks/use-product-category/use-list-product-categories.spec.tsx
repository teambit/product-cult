import { renderHook, waitFor } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useListProductCategories } from './use-list-product-categories.js';
import { mockProductCategories, ProductCategory } from '@infinity/products.entities.product-category';
import { gql } from '@apollo/client';
import { MockedProvider as ApolloMockedProvider } from '@apollo/client/testing';

const mockCategoriesArray = mockProductCategories();

// Copied from use-list-product-categories.ts as it's not exported
const LIST_PRODUCT_CATEGORIES_QUERY = gql`
  query ListProductCategories($limit: Int, $offset: Int) {
    listProductCategories(options: { limit: $limit, offset: $offset }) {
      id
      name
      description
      imageUrl
    }
  }
`;

describe('useListProductCategories', () => {
  it('should return product categories data when mockData is provided', () => {
    const { result } = renderHook(() => useListProductCategories({ mockData: mockCategoriesArray }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.productCategories).toEqual(mockCategoriesArray);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should fetch product categories data from the API', async () => {
    const mocks = [
      {
        request: {
          query: LIST_PRODUCT_CATEGORIES_QUERY,
          variables: {}, // Corresponds to calling useListProductCategories() with no options
        },
        result: {
          data: { listProductCategories: mockCategoriesArray.map(c => c.toObject()) },
        },
      },
    ];

    const { result } = renderHook(() => useListProductCategories(), {
      wrapper: ({ children }) => (
        <MockProvider>
          <ApolloMockedProvider mocks={mocks} addTypename={false}>
            {children}
          </ApolloMockedProvider>
        </MockProvider>
      ),
    });
    
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    // The hook transforms plain objects to ProductCategory instances
    expect(result.current.productCategories).toEqual(mockCategoriesArray.map(c => ProductCategory.from(c.toObject())));
    expect(result.current.error).toBeUndefined();
  });

  it('should handle errors when fetching data from the API', async () => {
    const apiError = new Error('API error');
    const mocks = [
      {
        request: {
          query: LIST_PRODUCT_CATEGORIES_QUERY,
          variables: {},
        },
        error: apiError,
      },
    ];

    const { result } = renderHook(() => useListProductCategories(), {
      wrapper: ({ children }) => (
        <MockProvider>
          <ApolloMockedProvider mocks={mocks} addTypename={false}>
            {children}
          </ApolloMockedProvider>
        </MockProvider>
      ),
    });

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('API error');
    expect(result.current.productCategories).toBeUndefined();
  });
});