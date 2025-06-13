import { gql, useMutation, MutationResult, FetchResult } from '@apollo/client';
import { Product } from '@infinity/products.entities.product';
import type { DeleteProductOptions } from './delete-product-options-type.js';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($options: DeleteProductOptionsInput!) {
    deleteProduct(options: $options) {
      id # Assuming delete returns the ID of the deleted product, or the full object
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
 * Represents the data returned by the deleteProduct mutation.
 */
export type DeleteProductMutationData = {
  /**
   * The deleted product. Some APIs might return just an ID or a success status.
   * Here we assume it returns the deleted product object.
   */
  deleteProduct: Product;
};

/**
 * Represents the result of the useDeleteProduct hook's mutation state.
 */
export type DeleteProductMutationResult = Omit<MutationResult<DeleteProductMutationData>, 'data'> & {
  /**
   * The data returned by the mutation, containing the deleted product.
   */
  data?: { deleteProduct: Product };
};


/**
 * A React hook to delete a product.
 *
 * @returns A tuple containing the mutation function and an object with the mutation state (data, loading, error).
 * The data object, when present, will contain the deleted product entity.
 */
export function useDeleteProduct(): [
  (options: DeleteProductOptions) => Promise<FetchResult<{ deleteProduct: Product }>>,
  DeleteProductMutationResult
] {
  const [mutate, { data, loading, error, ...rest }] = useMutation<
    { deleteProduct: any }, // eslint-disable-line @typescript-eslint/no-explicit-any
    { options: DeleteProductOptions }
  >(DELETE_PRODUCT_MUTATION);

  const deleteProduct = async (options: DeleteProductOptions): Promise<FetchResult<{ deleteProduct: Product }>> => {
    const result = await mutate({ variables: { options } });
    return {
      ...result,
      data: result.data
        ? { deleteProduct: Product.from(result.data.deleteProduct) }
        : undefined,
    };
  };
  
  const typedData = data?.deleteProduct ? { deleteProduct: Product.from(data.deleteProduct) } : undefined;

  return [deleteProduct, { data: typedData, loading, error, ...rest }];
}