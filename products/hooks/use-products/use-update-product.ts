import { gql, useMutation, MutationResult, FetchResult } from '@apollo/client';
import { Product } from '@infinity/products.entities.product';
import type { UpdateProductOptions } from './update-product-options-type.js';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($options: UpdateProductOptionsInput!) {
    updateProduct(options: $options) {
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
 * Represents the data returned by the updateProduct mutation.
 */
export type UpdateProductMutationData = {
  /**
   * The updated product.
   */
  updateProduct: Product;
};

/**
 * Represents the result of the useUpdateProduct hook's mutation state.
 */
export type UpdateProductMutationResult = Omit<MutationResult<UpdateProductMutationData>, 'data'> & {
  /**
   * The data returned by the mutation, containing the updated product.
   */
  data?: { updateProduct: Product };
};

/**
 * A React hook to update an existing product.
 *
 * @returns A tuple containing the mutation function and an object with the mutation state (data, loading, error).
 * The data object, when present, will contain the updated product entity.
 */
export function useUpdateProduct(): [
  (options: UpdateProductOptions) => Promise<FetchResult<{ updateProduct: Product }>>,
  UpdateProductMutationResult
] {
  const [mutate, { data, loading, error, ...rest }] = useMutation<
    { updateProduct: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
    { options: UpdateProductOptions }
  >(UPDATE_PRODUCT_MUTATION);

  const updateProduct = async (options: UpdateProductOptions): Promise<FetchResult<{ updateProduct: Product }>> => {
    const result = await mutate({ variables: { options } });
    return {
      ...result,
      data: result.data
        ? { updateProduct: Product.from(result.data.updateProduct) }
        : undefined,
    };
  };

  const typedData = data?.updateProduct ? { updateProduct: Product.from(data.updateProduct) } : undefined;

  return [updateProduct, { data: typedData, loading, error, ...rest }];
}