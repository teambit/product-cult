import { gql, useQuery, ApolloQueryResult } from '@apollo/client';
import { ProductCategory } from '@infinity/products.entities.product-category';
import { UseListProductCategoriesOptions } from './use-list-product-categories-options-type.js';
import { UseListProductCategoriesResult } from './use-list-product-categories-result-type.js';
import { ListProductCategoriesOptionsInput } from './list-product-categories-options-input-type.js';

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

/**
 * A React hook to fetch a list of product categories.
 * It uses GraphQL and Apollo Client for data fetching.
 *
 * @param options Optional parameters for fetching product categories, such as limit, offset, and mock data.
 * @returns An object containing the list of product categories, loading state, error state, and a refetch function.
 */
export function useListProductCategories(
  options?: UseListProductCategoriesOptions
): UseListProductCategoriesResult {
  const { limit, offset, mockData } = options || {};

  const queryOptions: ListProductCategoriesOptionsInput = {};
  if (typeof limit === 'number') {
    queryOptions.limit = limit;
  }
  if (typeof offset === 'number') {
    queryOptions.offset = offset;
  }

  const { data, loading, error, refetch } = useQuery<{ listProductCategories: ProductCategory[] }, ListProductCategoriesOptionsInput>(
    LIST_PRODUCT_CATEGORIES_QUERY,
    {
      variables: queryOptions,
      skip: !!mockData,
    }
  );

  if (mockData) {
    return {
      productCategories: mockData,
      loading: false,
      error: undefined,
      refetch: (() => Promise.resolve({ data: { listProductCategories: mockData } } as ApolloQueryResult<{ listProductCategories: ProductCategory[] }>)) as any, // Type assertion for simplified mock refetch
    };
  }

  const productCategories = data?.listProductCategories
    ? data.listProductCategories.map(ProductCategory.from)
    : undefined;

  return {
    productCategories,
    loading,
    error: error || undefined, // Ensure error is undefined if not present
    refetch,
  };
}