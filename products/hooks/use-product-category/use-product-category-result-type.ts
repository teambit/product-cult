import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { ProductCategory } from '@infinity/products.entities.product-category';
import { GetProductCategoryOptionsInput } from './get-product-category-options-input-type.js';

/**
 * Defines the structure of the result returned by the useProductCategory hook.
 */
export type UseProductCategoryResult = {
  /**
   * The fetched product category. Undefined if the query is loading or an error occurred.
   */
  productCategory?: ProductCategory;
  /**
   * True if the query is currently in flight.
   */
  loading: boolean;
  /**
   * An error object if the query failed.
   */
  error?: ApolloError;
  /**
   * A function to refetch the product category.
   * Variables passed to this function will be merged with the initial variables.
   */
  refetch: (
    variables?: Partial<GetProductCategoryOptionsInput>
  ) => Promise<ApolloQueryResult<{ getProductCategory: ProductCategory }>>;
};