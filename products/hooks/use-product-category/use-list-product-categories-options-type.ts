import { ProductCategory } from '@infinity/products.entities.product-category';
import { ListProductCategoriesOptionsInput } from './list-product-categories-options-input-type.js';

/**
 * Options for the useListProductCategories hook.
 */
export type UseListProductCategoriesOptions = ListProductCategoriesOptionsInput & {
  /**
   * Optional mock data to be used instead of fetching from the server.
   * If provided, the hook will not make a network request.
   */
  mockData?: ProductCategory[];
};