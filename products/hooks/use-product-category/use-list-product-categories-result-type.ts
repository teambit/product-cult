import { ApolloError, ApolloQueryResult } from '@apollo/client';
import { ProductCategory } from '@infinity/products.entities.product-category';
import { ListProductCategoriesOptionsInput } from './list-product-categories-options-input-type.js';

/**
 * Defines the structure of the result returned by the useListProductCategories hook.
 */
export type UseListProductCategoriesResult = {
  /**
   * An array of fetched product categories. Undefined if the query is loading or an error occurred.
   * Empty array if no categories are found.
   */
  productCategories?: ProductCategory[];
  /**
   * True if the query is currently in flight.
   */
  loading: boolean;
  /**
   * An error object if the query failed.
   */
  error?: ApolloError;
  /**
   * A function to refetch the list of product categories.
   * Variables passed to this function will be merged with the initial variables.
   */
  refetch: (
    variables?: Partial<ListProductCategoriesOptionsInput>
  ) => Promise<ApolloQueryResult<{ listProductCategories: ProductCategory[] }>>;
};