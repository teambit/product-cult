import { ProductCategory } from '@infinity/products.entities.product-category';
import { GetProductCategoryOptionsInput } from './get-product-category-options-input-type.js';

/**
 * Options for the useProductCategory hook.
 */
export type UseProductCategoryOptions = GetProductCategoryOptionsInput & {
  /**
   * Optional mock data to be used instead of fetching from the server.
   * If provided, the hook will not make a network request.
   */
  mockData?: ProductCategory;
};