import { gql, useQuery, QueryResult } from '@apollo/client';
import { Product } from '@infinity/products.entities.product';
import type { ListProductsOptions } from './list-products-options-type.js';

const LIST_PRODUCTS_QUERY = gql`
  query ListProducts($options: ListProductsOptionsInput) {
    listProducts(options: $options) {
      id
      name
      description
      price
      imageUrls
      videoUrls
      categoryId
      variants {
        name
        sku
        price
        imageUrls
      }
    }
  }
`;

/**
 * Represents the result of the useListProducts hook.
 */
export type UseListProductsResult = Omit<QueryResult, 'data'> & {
  /**
   * An array of product entities.
   */
  products?: Product[];
};

/**
 * Options for the useListProducts hook.
 */
export type UseListProductsHookOptions = {
  /**
   * Optional mock data to be used instead of fetching from the server.
   * If provided, the hook will not make a network request.
   */
  mockData?: Product[];
};

/**
 * A React hook to fetch a list of products.
 *
 * @param variables - The variables for the query, including limit, offset, categoryId, and search term.
 * @param options - Optional configuration for the hook, including mockData.
 * @returns An object containing the list of products, loading state, error state, and refetch function.
 */
export function useListProducts(
  variables?: ListProductsOptions,
  options?: UseListProductsHookOptions
): UseListProductsResult {
  const { data, loading, error, refetch, ...rest } = useQuery(
    LIST_PRODUCTS_QUERY,
    {
      variables: { options: variables },
      skip: !!options?.mockData,
      fetchPolicy: options?.mockData ? 'cache-only' : 'cache-first',
    }
  );

  if (options?.mockData) {
    return {
      products: options.mockData,
      loading: false,
      error: undefined,
      refetch: async () => ({ data: { listProducts: options.mockData.map(p => p.toObject()) } } as any), // eslint-disable-line @typescript-eslint/no-explicit-any
      ...rest,
      // Manually add other properties expected from QueryResult if necessary, with mock implementations
      // For example: networkStatus, client, called, etc.
      // This simplified mock might need expansion based on specific test needs for these fields.
    };
  }

  const products = data?.listProducts?.map(Product.from);

  return { products, loading, error, refetch, ...rest };
}