import { gql, useQuery, ApolloQueryResult } from '@apollo/client';
import { ProductCategory } from '@infinity/products.entities.product-category';
import { UseProductCategoryOptions } from './use-product-category-options-type.js';
import { UseProductCategoryResult } from './use-product-category-result-type.js';
import { GetProductCategoryOptionsInput } from './get-product-category-options-input-type.js';

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

/**
 * A React hook to fetch a single product category by its ID.
 * It uses GraphQL and Apollo Client for data fetching.
 *
 * @param options Options for fetching the product category, including the ID and optional mock data.
 * @returns An object containing the product category data, loading state, error state, and a refetch function.
 */
export function useProductCategory(
  options: UseProductCategoryOptions
): UseProductCategoryResult {
  const { id, mockData } = options;

  const { data, loading, error, refetch } = useQuery<{ getProductCategory: ProductCategory }, GetProductCategoryOptionsInput>(
    GET_PRODUCT_CATEGORY_QUERY,
    {
      variables: { id },
      skip: !!mockData,
    }
  );

  if (mockData) {
    return {
      productCategory: mockData,
      loading: false,
      error: undefined,
      refetch: (() => Promise.resolve({ data: { getProductCategory: mockData } } as ApolloQueryResult<{ getProductCategory: ProductCategory }>)) as any, // Type assertion for simplified mock refetch
    };
  }

  const productCategory = data?.getProductCategory
    ? ProductCategory.from(data.getProductCategory)
    : undefined;

  return {
    productCategory,
    loading,
    error: error || undefined, // Ensure error is undefined if not present
    refetch,
  };
}