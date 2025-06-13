import { renderHook, waitFor } from '@testing-library/react';
import { MockProvider } from '@infinity/product-hunt-platform.testing.mock-provider';
import { useProductCategory } from './use-product-category.js';
import { mockProductCategory, ProductCategory } from '@infinity/products.entities.product-category';
import { gql } from '@apollo/client';
import { MockedProvider as ApolloMockedProvider } from '@apollo/client/testing';

const mockCategoryInstance = mockProductCategory({ id: '1', name: 'Test Category', description: 'Test Description' });

// Copied from use-product-category.ts as it's not exported
const GET_PRODUCT_CATEGORY_QUERY = gql`
  query GetProductCategory($id: String!) {
    getProductCategory(options: { id: $id }) {
      id
      name
      description
      imageUrl
    }
  }
`;

describe('useProductCategory', () => {
  it('should return product category data when mockData is provided', () => {
    const { result } = renderHook(() => useProductCategory({ id: '1', mockData: mockCategoryInstance }), {
      wrapper: ({ children }) => (
        <MockProvider>
          {children}
        </MockProvider>
      ),
    });

    expect(result.current.productCategory).toEqual(mockCategoryInstance);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should fetch product category data from the API', async () => {
    const mocks = [
      {
        request: {
          query: GET_PRODUCT_CATEGORY_QUERY,
          variables: { id: '1' },
        },
        result: {
          data: { getProductCategory: mockCategoryInstance.toObject() },
        },
      },
    ];

    const { result } = renderHook(() => useProductCategory({ id: '1' }), {
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
    // The hook transforms plain object to ProductCategory instance
    expect(result.current.productCategory).toEqual(ProductCategory.from(mockCategoryInstance.toObject()));
    expect(result.current.productCategory?.id).toEqual('1');
    expect(result.current.error).toBeUndefined();
  });

  it('should handle errors when fetching data from the API', async () => {
    const apiError = new Error('API error');
    const mocks = [
      {
        request: {
          query: GET_PRODUCT_CATEGORY_QUERY,
          variables: { id: '1' },
        },
        error: apiError,
      },
    ];
    const { result } = renderHook(() => useProductCategory({ id: '1' }), {
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
    expect(result.current.productCategory).toBeUndefined();
  });
});