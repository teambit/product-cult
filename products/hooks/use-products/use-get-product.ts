import { gql, useQuery, QueryResult } from '@apollo/client';
import { Product } from '@infinity/products.entities.product';
import type { GetProductOptions } from './get-product-options-type.js';

const GET_PRODUCT_QUERY = gql`
  query GetProduct($options: GetProductOptionsInput!) {
    getProduct(options: $options) {
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
 * Represents the result of the useGetProduct hook.
 */
export type UseGetProductResult = Omit<QueryResult, 'data'> & {
  /**
   * The product entity.
   */
  product?: Product;
};

/**
 * Options for the useGetProduct hook.
 */
export type UseGetProductHookOptions = {
  /**
   * Optional mock data to be used instead of fetching from the server.
   * If provided, the hook will not make a network request.
   */
  mockData?: Product;
};

/**
 * A React hook to fetch a single product by its ID.
 *
 * @param variables - The variables for the query, primarily the product ID.
 * @param options - Optional configuration for the hook, including mockData.
 * @returns An object containing the product data, loading state, error state, and refetch function.
 */
export function useGetProduct(
  variables: GetProductOptions,
  options?: UseGetProductHookOptions
): UseGetProductResult {
  const { data, loading, error, refetch, ...rest } = useQuery(
    GET_PRODUCT_QUERY,
    {
      variables: { options: variables },
      skip: !variables.id || !!options?.mockData, // Skip if no ID or if mockData is provided
      fetchPolicy: options?.mockData ? 'cache-only' : 'cache-first',
    }
  );

  if (options?.mockData) {
    return {
      product: options.mockData,
      loading: false,
      error: undefined,
      refetch: async () => ({ data: { getProduct: options.mockData?.toObject() } } as any), // eslint-disable-line @typescript-eslint/no-explicit-any
      ...rest,
    };
  }

  const product = data?.getProduct ? Product.from(data.getProduct) : undefined;

  return { product, loading, error, refetch, ...rest };
}