import { gql, useMutation, MutationResult, FetchResult } from '@apollo/client';
import { Product } from '@infinity/products.entities.product';
import type { CreateProductOptions } from './create-product-options-type.js';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($options: CreateProductOptionsInput!) {
    createProduct(options: $options) {
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
 * Represents the data returned by the createProduct mutation.
 */
export type CreateProductMutationData = {
  /**
   * The newly created product.
   */
  createProduct: Product;
};

/**
 * Represents the result of the useCreateProduct hook's mutation state.
 */
export type CreateProductMutationResult = Omit<MutationResult<CreateProductMutationData>, 'data'> & {
  /**
   * The data returned by the mutation, containing the created product.
   */
  data?: { createProduct: Product };
};


/**
 * A React hook to create a new product.
 *
 * @returns A tuple containing the mutation function and an object with the mutation state (data, loading, error).
 * The data object, when present, will contain the newly created product entity.
 */
export function useCreateProduct(): [
  (options: CreateProductOptions) => Promise<FetchResult<{ createProduct: Product }>>,
  CreateProductMutationResult
] {
  const [mutate, { data, loading, error, ...rest }] = useMutation<
    { createProduct: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
    { options: CreateProductOptions }
  >(CREATE_PRODUCT_MUTATION);

  const createProduct = async (options: CreateProductOptions): Promise<FetchResult<{ createProduct: Product }>> => {
    const result = await mutate({ variables: { options } });
    return {
      ...result,
      data: result.data
        ? { createProduct: Product.from(result.data.createProduct) }
        : undefined,
    };
  };
  
  const typedData = data?.createProduct ? { createProduct: Product.from(data.createProduct) } : undefined;

  return [createProduct, { data: typedData, loading, error, ...rest }];
}